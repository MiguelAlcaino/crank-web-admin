import { describe, expect, it, vi } from 'vitest'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import { CustomerGiftCardStatusEnum } from '../../../src/gql-main/graphql'
import {
  MAX_GIFT_CARD_PDF_BYTES,
  issueGiftCardFormError,
  newestStatusesFirst,
  updateCustomerGiftCardErrorMessage,
  useCustomerGiftCards,
  type CustomerGiftCard
} from '../../../src/modules/customer-gift-cards/composables/useCustomerGiftCards'
import { ERROR_UNKNOWN } from '../../../src/utils/errorMessages'

function pdf(size = 10, type = 'application/pdf'): File {
  const file = new File(['%PDF'], 'card.pdf', { type })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

function apolloClient(client: { query?: unknown; mutate?: unknown }) {
  return client as unknown as ApolloClient<NormalizedCacheObject>
}

describe('issueGiftCardFormError', () => {
  it('needs a code', () => {
    expect(issueGiftCardFormError('  ', pdf())).toMatch(/code/)
  })

  it('needs a file', () => {
    expect(issueGiftCardFormError('ABC', null)).toMatch(/PDF/)
  })

  it('needs a PDF', () => {
    expect(issueGiftCardFormError('ABC', pdf(10, 'image/png'))).toMatch(/PDF/)
  })

  it('needs 2048 KB or less', () => {
    expect(issueGiftCardFormError('ABC', pdf(MAX_GIFT_CARD_PDF_BYTES + 1))).toMatch(/2048/)
  })

  it('accepts a code and a small PDF', () => {
    expect(issueGiftCardFormError('ABC', pdf(MAX_GIFT_CARD_PDF_BYTES))).toBeNull()
  })
})

describe('updateCustomerGiftCardErrorMessage', () => {
  it('has a message for each error member and none on success', () => {
    expect(
      updateCustomerGiftCardErrorMessage({ __typename: 'CustomerGiftCardNotFoundError', code: 'x' })
    ).toMatch(/no longer exists/)
    expect(
      updateCustomerGiftCardErrorMessage({ __typename: 'GiftCardCodeRequiredError', code: 'x' })
    ).toMatch(/code/)
    expect(
      updateCustomerGiftCardErrorMessage({
        __typename: 'InvalidGiftCardPdfError',
        code: 'x',
        message: 'The file is too large.'
      })
    ).toBe('The file is too large.')
    expect(
      updateCustomerGiftCardErrorMessage({
        __typename: 'CustomerGiftCard',
        id: '1',
        status: CustomerGiftCardStatusEnum.GiftCardCodeGranted,
        giftCardCode: 'ABC'
      })
    ).toBeNull()
  })
})

describe('newestStatusesFirst', () => {
  it('reverses the history without touching the original', () => {
    const giftCard = {
      statusHistory: [
        {
          __typename: 'CustomerGiftCardStatusChange',
          status: CustomerGiftCardStatusEnum.Submitted,
          createdAt: '1'
        },
        {
          __typename: 'CustomerGiftCardStatusChange',
          status: CustomerGiftCardStatusEnum.Paid,
          createdAt: '2'
        }
      ]
    } as unknown as CustomerGiftCard

    expect(newestStatusesFirst(giftCard).map((change) => change.status)).toEqual([
      CustomerGiftCardStatusEnum.Paid,
      CustomerGiftCardStatusEnum.Submitted
    ])
    expect(giftCard.statusHistory[0].status).toBe(CustomerGiftCardStatusEnum.Submitted)
  })
})

describe('useCustomerGiftCards', () => {
  it('flags a failed load', async () => {
    const giftCards = useCustomerGiftCards(
      apolloClient({ query: vi.fn().mockRejectedValue(new Error('boom')) })
    )

    await giftCards.fetchGiftCards()

    expect(giftCards.hasLoadError.value).toBe(true)
  })

  it('answers the generic message when the upload fails', async () => {
    const giftCards = useCustomerGiftCards(
      apolloClient({ mutate: vi.fn().mockRejectedValue(new Error('boom')) })
    )

    expect(await giftCards.issueCode('1', 'ABC', pdf())).toBe(ERROR_UNKNOWN)
    expect(giftCards.isIssuing.value).toBe(false)
  })

  it('answers the message of a typed error', async () => {
    const mutate = vi.fn().mockResolvedValue({
      data: { updateCustomerGiftCard: { __typename: 'GiftCardCodeRequiredError', code: 'x' } }
    })
    const giftCards = useCustomerGiftCards(apolloClient({ mutate }))

    expect(await giftCards.issueCode('1', 'ABC', pdf())).toMatch(/code/)
  })

  it('sends the trimmed code with the File for the multipart request and answers null', async () => {
    const mutate = vi.fn().mockResolvedValue({
      data: {
        updateCustomerGiftCard: {
          __typename: 'CustomerGiftCard',
          id: '5',
          status: CustomerGiftCardStatusEnum.GiftCardCodeGranted,
          giftCardCode: 'ABC'
        }
      }
    })
    const giftCards = useCustomerGiftCards(apolloClient({ mutate }))
    const file = pdf()

    expect(await giftCards.issueCode('5', ' ABC ', file)).toBeNull()
    expect(mutate.mock.calls[0][0].variables).toEqual({
      id: '5',
      input: { giftCardCode: 'ABC', pdfGiftCard: file }
    })
  })
})
