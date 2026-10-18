import { describe, expect, it, vi } from 'vitest'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import { IncompleteFeedbacksAwaitingReviewDocument } from '../../../src/gql-main/graphql'
import { useIncompleteTransactionFeedbacks } from '../../../src/modules/incomplete-transaction-feedbacks/composables/useIncompleteTransactionFeedbacks'

const LISTING = {
  incompleteTransactionFeedbacks: { totalCount: 0, page: 1, limit: 25, items: [] }
}

function apolloClient(query: unknown) {
  return { query } as unknown as ApolloClient<NormalizedCacheObject>
}

describe('useIncompleteTransactionFeedbacks', () => {
  it('lists without awaitingReview for a backend that does not have it', async () => {
    const query = vi.fn().mockResolvedValue({ data: LISTING })

    await useIncompleteTransactionFeedbacks(apolloClient(query), false).fetchList()

    expect(query.mock.calls[0][0].query).not.toBe(IncompleteFeedbacksAwaitingReviewDocument)
  })

  it('lists with awaitingReview for a backend that has it', async () => {
    const query = vi.fn().mockResolvedValue({ data: LISTING })
    const feedbacks = useIncompleteTransactionFeedbacks(apolloClient(query), true)

    await feedbacks.fetchList(undefined, { page: 1, limit: 25 })

    expect(query.mock.calls[0][0].query).toBe(IncompleteFeedbacksAwaitingReviewDocument)
    expect(feedbacks.listResult.value?.totalCount).toBe(0)
  })
})
