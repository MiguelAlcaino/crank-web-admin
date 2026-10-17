import {
  DEFAULT_BACKEND_PROFILE,
  isBackendProfile,
  isFeatureAvailableIn,
  type AdminFeature,
  type BackendProfile
} from './features'

export * from './features'

/**
 * Unset or empty means the default profile. An unknown value also falls back to the default here;
 * the standalone app build (`vite.config.app.ts`) rejects unknown values before getting this far.
 */
export function resolveBackendProfile(value: string | undefined | null): BackendProfile {
  if (isBackendProfile(value)) {
    return value
  }

  if (value) {
    console.error(
      `Unknown VITE_BACKEND_PROFILE "${value}", falling back to "${DEFAULT_BACKEND_PROFILE}".`
    )
  }

  return DEFAULT_BACKEND_PROFILE
}

/** The profile this build was made for (`VITE_BACKEND_PROFILE`). */
export const backendProfile: BackendProfile = resolveBackendProfile(
  import.meta.env.VITE_BACKEND_PROFILE
)

export function isFeatureAvailable(feature: AdminFeature): boolean {
  return isFeatureAvailableIn(feature, backendProfile)
}
