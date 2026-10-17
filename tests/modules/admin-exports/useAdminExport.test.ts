import { describe, expect, it, vi } from 'vitest'

import {
  compactFilter,
  downloadAdminExport,
  useAdminExport,
  type AdminExport
} from '../../../src/modules/admin-exports/composables/useAdminExport'

const adminExport: AdminExport = {
  fileName: 'transactions.xlsx',
  url: 'https://storage.example/transactions.xlsx?sig=1',
  expiresAt: '2026-10-17T12:15:00+00:00'
}

describe('compactFilter', () => {
  it('is null for an untouched filter', () => {
    expect(compactFilter({ search: '', site: undefined, startDate: null })).toBeNull()
  })

  it('keeps only the values set', () => {
    expect(compactFilter({ search: 'ann', site: '', startDate: '2026-10-01' })).toEqual({
      search: 'ann',
      startDate: '2026-10-01'
    })
  })
})

describe('downloadAdminExport', () => {
  it('follows the signed link with a link click', () => {
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined)

    downloadAdminExport(adminExport)

    expect(click).toHaveBeenCalledOnce()
    const link = click.mock.instances[0] as unknown as HTMLAnchorElement
    expect(link.href).toBe(adminExport.url)
    expect(link.download).toBe(adminExport.fileName)
    expect(document.body.contains(link)).toBe(false)
    click.mockRestore()
  })
})

describe('useAdminExport', () => {
  it('flags a failed export and downloads nothing', async () => {
    const download = vi.fn()
    const { exportFile, hasError, isExporting } = useAdminExport(
      () => Promise.reject(new Error('boom')),
      download
    )

    expect(await exportFile()).toBe(false)
    expect(hasError.value).toBe(true)
    expect(isExporting.value).toBe(false)
    expect(download).not.toHaveBeenCalled()
  })

  it('flags an empty answer', async () => {
    const download = vi.fn()
    const { exportFile, hasError } = useAdminExport(() => Promise.resolve(null), download)

    expect(await exportFile()).toBe(false)
    expect(hasError.value).toBe(true)
    expect(download).not.toHaveBeenCalled()
  })

  it('downloads the file and keeps the link', async () => {
    const download = vi.fn()
    const { exportFile, hasError, lastExport } = useAdminExport(
      () => Promise.resolve(adminExport),
      download
    )

    expect(await exportFile()).toBe(true)
    expect(hasError.value).toBe(false)
    expect(lastExport.value).toEqual(adminExport)
    expect(download).toHaveBeenCalledWith(adminExport)
  })
})
