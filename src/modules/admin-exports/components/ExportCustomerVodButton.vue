<script setup lang="ts">
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client/core'

import { ExportCustomerVodDocument, type AdminCustomersParams } from '@/gql-main/graphql'
import AdminExportButton from './AdminExportButton.vue'
import { compactFilter } from '../composables/useAdminExport'

/** "Export VOD list" of the customers list: `exportCustomerVod` for the same params. */
interface Props {
  apolloClient: ApolloClient<NormalizedCacheObject>
  params: AdminCustomersParams
}

const props = defineProps<Props>()

async function runExport() {
  const { data } = await props.apolloClient.mutate({
    mutation: ExportCustomerVodDocument,
    variables: { params: compactFilter(props.params) }
  })

  return data?.exportCustomerVod
}
</script>

<template>
  <AdminExportButton text="Export VOD list" :run-export="runExport" />
</template>
