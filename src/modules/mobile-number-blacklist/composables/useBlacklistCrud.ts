import { readonly, ref } from 'vue'
import { gql } from 'graphql-tag'
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

export interface BlacklistEntry {
  id: string
  mobilePhoneNumber: string
  fullPhoneNumber: string
  countryId: string
  countryName: string
  countryPhoneCode: string
}

export interface CountryWithPhoneCode {
  id: string
  name: string
  phoneCode: string
  formattedPhoneCode: string
}

const BLACKLIST_QUERY = gql`
  query MobileNumberBlacklist {
    mobileNumberBlacklist {
      id
      mobilePhoneNumber
      fullPhoneNumber
      countryId
      countryName
      countryPhoneCode
    }
  }
`

const COUNTRIES_QUERY = gql`
  query CountriesWithPhoneCodes {
    countriesWithPhoneCodes {
      id
      name
      phoneCode
      formattedPhoneCode
    }
  }
`

const CREATE_MUTATION = gql`
  mutation CreateMobileNumberBlacklistEntry($input: CreateMobileNumberBlacklistInput!) {
    createMobileNumberBlacklistEntry(input: $input) {
      id
      mobilePhoneNumber
      fullPhoneNumber
      countryId
      countryName
      countryPhoneCode
    }
  }
`

const UPDATE_MUTATION = gql`
  mutation UpdateMobileNumberBlacklistEntry($id: ID!, $input: UpdateMobileNumberBlacklistInput!) {
    updateMobileNumberBlacklistEntry(id: $id, input: $input) {
      id
      mobilePhoneNumber
      fullPhoneNumber
      countryId
      countryName
      countryPhoneCode
    }
  }
`

const DELETE_MUTATION = gql`
  mutation DeleteMobileNumberBlacklistEntry($id: ID!) {
    deleteMobileNumberBlacklistEntry(id: $id)
  }
`

export const useBlacklistCrud = (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  const entries = ref<BlacklistEntry[]>([])
  const countries = ref<CountryWithPhoneCode[]>([])
  const isLoading = ref(false)
  const isSaving = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')

  async function fetchEntries() {
    isLoading.value = true
    hasError.value = false
    try {
      const { data } = await apolloClient.query({
        query: BLACKLIST_QUERY,
        fetchPolicy: 'network-only'
      })
      entries.value = data.mobileNumberBlacklist
    } catch (e) {
      hasError.value = true
      errorMessage.value = 'Failed to load blacklist entries'
    } finally {
      isLoading.value = false
    }
  }

  async function fetchCountries() {
    try {
      const { data } = await apolloClient.query({
        query: COUNTRIES_QUERY,
        fetchPolicy: 'network-only'
      })
      countries.value = data.countriesWithPhoneCodes
    } catch (e) {
      console.error('Failed to load countries', e)
    }
  }

  async function createEntry(countryId: string, mobilePhoneNumber: string): Promise<boolean> {
    isSaving.value = true
    hasError.value = false
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_MUTATION,
        variables: { input: { countryId, mobilePhoneNumber } }
      })
      if (data?.createMobileNumberBlacklistEntry) {
        entries.value = [...entries.value, data.createMobileNumberBlacklistEntry]
      }
      return true
    } catch (e) {
      hasError.value = true
      errorMessage.value = 'Failed to create entry'
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function updateEntry(
    id: string,
    countryId: string,
    mobilePhoneNumber: string
  ): Promise<boolean> {
    isSaving.value = true
    hasError.value = false
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_MUTATION,
        variables: { id, input: { countryId, mobilePhoneNumber } }
      })
      if (data?.updateMobileNumberBlacklistEntry) {
        const idx = entries.value.findIndex((e) => e.id === id)
        if (idx !== -1) {
          const newArr = entries.value.slice()
          newArr[idx] = data.updateMobileNumberBlacklistEntry
          entries.value = newArr
        }
      }
      return true
    } catch (e) {
      hasError.value = true
      errorMessage.value = 'Failed to update entry'
      return false
    } finally {
      isSaving.value = false
    }
  }

  async function deleteEntry(id: string): Promise<boolean> {
    isSaving.value = true
    hasError.value = false
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_MUTATION,
        variables: { id }
      })
      if (data?.deleteMobileNumberBlacklistEntry) {
        entries.value = entries.value.filter((e) => e.id !== id)
      }
      return true
    } catch (e) {
      hasError.value = true
      errorMessage.value = 'Failed to delete entry'
      return false
    } finally {
      isSaving.value = false
    }
  }

  return {
    entries: readonly(entries),
    countries: readonly(countries),
    isLoading: readonly(isLoading),
    isSaving: readonly(isSaving),
    hasError: readonly(hasError),
    errorMessage: readonly(errorMessage),
    fetchEntries,
    fetchCountries,
    createEntry,
    updateEntry,
    deleteEntry
  }
}
