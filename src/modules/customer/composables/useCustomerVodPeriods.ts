import dayjs from 'dayjs'
import { ref } from 'vue'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import {
  CreateCustomerVodPeriodDocument,
  CustomerVodPeriodsDocument,
  DeleteCustomerVodPeriodDocument,
  type CustomerVodPeriodsQuery
} from '@/gql-main/graphql'
import { messageForGraphqlError } from '@/utils/errors/graphqlErrorCode'
import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { VOD_PERIOD_ERRORS } from './customerAdminErrors'

export type CustomerVodPeriod = CustomerVodPeriodsQuery['customerVodPeriods'][number]

/** A period grants VOD now when it is not deleted and now falls between its start and its end. */
export function isVodPeriodActive(period: CustomerVodPeriod, now: Date = new Date()): boolean {
  return (
    !period.isDeleted &&
    dayjs(period.start).valueOf() < now.getTime() &&
    dayjs(period.end).valueOf() > now.getTime()
  )
}

/** "admin Jane" for a period an admin granted, otherwise the source alone, as the Twig page did. */
export function vodPeriodAddedBy(period: CustomerVodPeriod): string {
  return period.addedBy === 'admin' && period.addedByAdmin
    ? `${period.addedBy} ${period.addedByAdmin}`
    : period.addedBy
}

/**
 * A `datetime-local` input value (local time, no zone) as the ATOM date the backend's DateTime
 * scalar parses, e.g. `2026-10-17T09:30:00+04:00`; null when it is empty or invalid.
 */
export function localInputToDateTime(value: string): string | null {
  if (value === '') {
    return null
  }
  const parsed = dayjs(value)

  return parsed.isValid() ? parsed.format('YYYY-MM-DDTHH:mm:ssZ') : null
}

/** Client-side check of the add form; null when valid. The backend checks the same. */
export function vodPeriodFormError(start: string | null, end: string | null): string | null {
  if (start === null || end === null) {
    return 'Choose when the VOD period starts and ends.'
  }
  if (!dayjs(end).isAfter(dayjs(start))) {
    return 'The VOD period has to end after it starts.'
  }

  return null
}

/** The VOD periods of a customer on crank-payments main, with add and (soft) delete. */
export const useCustomerVodPeriods = (
  apolloClient: ApolloClient<NormalizedCacheObject>,
  customerId: string
) => {
  const periods = ref<CustomerVodPeriod[]>([])
  const isLoading = ref(false)
  const hasLoadError = ref(false)
  const isSaving = ref(false)
  const deletingId = ref<string | null>(null)

  async function fetchPeriods() {
    isLoading.value = true
    hasLoadError.value = false
    try {
      const { data } = await apolloClient.query({
        query: CustomerVodPeriodsDocument,
        variables: { customerId },
        fetchPolicy: 'network-only'
      })
      periods.value = data.customerVodPeriods
    } catch (e) {
      hasLoadError.value = true
    } finally {
      isLoading.value = false
    }
  }

  /** Answers null on success, or the message to show. */
  async function createPeriod(startInput: string, endInput: string): Promise<string | null> {
    const start = localInputToDateTime(startInput)
    const end = localInputToDateTime(endInput)
    const formError = vodPeriodFormError(start, end)
    if (formError !== null) {
      return formError
    }

    isSaving.value = true
    try {
      await apolloClient.mutate({
        mutation: CreateCustomerVodPeriodDocument,
        variables: { customerId, input: { start, end } }
      })
      await fetchPeriods()
      return null
    } catch (e) {
      return messageForGraphqlError(e, VOD_PERIOD_ERRORS, ERROR_UNKNOWN)
    } finally {
      isSaving.value = false
    }
  }

  /** Answers null on success, or the message to show. */
  async function deletePeriod(id: string): Promise<string | null> {
    deletingId.value = id
    try {
      await apolloClient.mutate({ mutation: DeleteCustomerVodPeriodDocument, variables: { id } })
      await fetchPeriods()
      return null
    } catch (e) {
      return messageForGraphqlError(e, VOD_PERIOD_ERRORS, ERROR_UNKNOWN)
    } finally {
      deletingId.value = null
    }
  }

  return {
    periods,
    isLoading,
    hasLoadError,
    isSaving,
    deletingId,
    fetchPeriods,
    createPeriod,
    deletePeriod
  }
}
