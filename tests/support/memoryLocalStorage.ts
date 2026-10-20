import { vi } from 'vitest'

/**
 * A fresh in-memory localStorage for the auth store. Recent Node versions define their own
 * `localStorage` global, which shadows jsdom's and is unusable without `--localstorage-file`.
 */
export function useMemoryLocalStorage(): void {
  const items = new Map<string, string>()

  vi.stubGlobal('localStorage', {
    getItem: (key: string) => items.get(key) ?? null,
    setItem: (key: string, value: string) => void items.set(key, String(value)),
    removeItem: (key: string) => void items.delete(key),
    clear: () => items.clear(),
    key: (index: number) => [...items.keys()][index] ?? null,
    get length() {
      return items.size
    }
  })
}
