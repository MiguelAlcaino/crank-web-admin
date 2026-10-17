/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CRANK_REST_SERVER_URL: string
  readonly VITE_CRANK_GRAPHQL_SERVER_URL: string
  /** `main` or `kan231` (default), see src/config/backendProfile.ts */
  readonly VITE_BACKEND_PROFILE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
