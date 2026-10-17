<script setup lang="ts">
import dayjs from 'dayjs'

import { useAdminExport, type AdminExport } from '../composables/useAdminExport'

interface Props {
  text: string
  /** Runs the export mutation and answers its AdminExport. */
  runExport: () => Promise<AdminExport | null | undefined>
}

const props = defineProps<Props>()

const { isExporting, hasError, lastExport, exportFile } = useAdminExport(() => props.runExport())
</script>

<template>
  <span class="d-inline-flex align-items-center gap-2">
    <button
      type="button"
      class="btn btn-outline-success btn-sm"
      :disabled="isExporting"
      @click="exportFile"
    >
      <i class="bi bi-file-earmark-excel"></i>
      {{ text }}
      <span v-if="isExporting" class="spinner-border spinner-border-sm"></span>
    </button>
    <span v-if="hasError" class="small text-danger">The export failed.</span>
    <a
      v-else-if="lastExport"
      class="small"
      :href="lastExport.url"
      :download="lastExport.fileName"
      rel="noopener"
      :title="`Link valid until ${dayjs(lastExport.expiresAt).format('HH:mm')}`"
    >
      Download {{ lastExport.fileName }} again
    </a>
  </span>
</template>
