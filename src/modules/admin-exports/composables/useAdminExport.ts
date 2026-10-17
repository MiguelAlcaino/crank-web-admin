import { ref } from 'vue'

/** A generated admin file and its short-lived download link (crank-payments `AdminExport`). */
export interface AdminExport {
  fileName: string
  url: string
  expiresAt: string
}

/**
 * Starts the download of an export. The link is a signed URL whose response is an attachment, so
 * following it downloads the file and keeps the admin on the page. It is followed from a link
 * click rather than window.open, which popup blockers refuse after an awaited request.
 */
export function downloadAdminExport(adminExport: AdminExport, doc: Document = document) {
  const link = doc.createElement('a')
  link.href = adminExport.url
  link.download = adminExport.fileName
  link.rel = 'noopener'
  doc.body.appendChild(link)
  link.click()
  link.remove()
}

/** Drops the empty values of a filter, so an untouched filter exports everything. */
export function compactFilter<T extends object>(filter: T): Partial<T> | null {
  const entries = Object.entries(filter).filter(
    ([, value]) => value !== undefined && value !== null && value !== ''
  )

  return entries.length > 0 ? (Object.fromEntries(entries) as Partial<T>) : null
}

/**
 * Runs an export mutation (`exportTransactionRecords`, `exportCustomerVod`) and downloads the file.
 * `lastExport` keeps the link for a manual retry until it expires.
 */
export const useAdminExport = (
  runExport: () => Promise<AdminExport | null | undefined>,
  download: (adminExport: AdminExport) => void = downloadAdminExport
) => {
  const isExporting = ref(false)
  const hasError = ref(false)
  const lastExport = ref<AdminExport | null>(null)

  async function exportFile(): Promise<boolean> {
    isExporting.value = true
    hasError.value = false
    try {
      const adminExport = await runExport()
      if (!adminExport) {
        hasError.value = true
        return false
      }
      lastExport.value = adminExport
      download(adminExport)
      return true
    } catch (e) {
      hasError.value = true
      return false
    } finally {
      isExporting.value = false
    }
  }

  return { isExporting, hasError, lastExport, exportFile }
}
