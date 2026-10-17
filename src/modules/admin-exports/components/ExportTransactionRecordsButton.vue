<script setup lang="ts">
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import {
  ExportTransactionRecordsDocument,
  type TransactionRecordFilterInput
} from '@/gql-main/graphql'
import AdminExportButton from './AdminExportButton.vue'
import { compactFilter } from '../composables/useAdminExport'

/** "Export to Excel" of the transactions list: `exportTransactionRecords` for the same filter. */
interface Props {
  apolloClient: ApolloClient<NormalizedCacheObject>
  filter: TransactionRecordFilterInput
}

const props = defineProps<Props>()

async function runExport() {
  const { data } = await props.apolloClient.mutate({
    mutation: ExportTransactionRecordsDocument,
    variables: { filter: compactFilter(props.filter) }
  })

  return data?.exportTransactionRecords
}
</script>

<template>
  <AdminExportButton text="Export to Excel" :run-export="runExport" />
</template>
