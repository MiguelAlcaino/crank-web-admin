import type { CodegenConfig } from '@graphql-codegen/cli'

import { AdminFeature, isFeatureAvailableIn } from './src/config/features'

/*
 * Codegen against crank-payments `main` (backend profile `main`).
 *
 * Schema: graphql.schema.main.graphql (`npm run schema:main` refreshes it). Output: src/gql-main/.
 * The KAN-231 codegen (codegen.ts, src/gql/, graphql.schema.json) is unaffected.
 *
 * Documents: every document in src/ except the ones of features that `main` does not support yet,
 * so the run fails if a document used on `main` selects something main's schema lacks. Enabling a
 * feature on `main` in src/config/features.ts brings its documents in here automatically.
 */
const FEATURE_DOCUMENTS: Partial<Record<AdminFeature, string[]>> = {
  [AdminFeature.BulkVod]: ['src/modules/bulk-vod-activator/**'],
  [AdminFeature.CustomersList]: ['src/modules/customer-list/**'],
  [AdminFeature.IncompleteFeedbacks]: ['src/modules/incomplete-transaction-feedbacks/**'],
  [AdminFeature.InstructorProfiles]: ['src/modules/instructor-profile/**'],
  [AdminFeature.MindbodyClients]: ['src/modules/mindbody-clients/**'],
  [AdminFeature.MindbodyStaff]: ['src/modules/mindbody-staff/**'],
  [AdminFeature.Blacklist]: ['src/modules/mobile-number-blacklist/**'],
  [AdminFeature.ClassPackages]: ['src/modules/products/**'],
  [AdminFeature.SessionTypes]: ['src/modules/session-type/**'],
  [AdminFeature.Subscriptions]: ['src/modules/subscription/**'],
  [AdminFeature.SystemSettings]: ['src/modules/system-settings/**'],
  [AdminFeature.Transactions]: ['src/modules/transaction-records/**'],
  [AdminFeature.WebhookEvents]: ['src/modules/webhook-events/**']
}

const excludedDocuments = Object.entries(FEATURE_DOCUMENTS)
  .filter(([feature]) => !isFeatureAvailableIn(feature as AdminFeature, 'main'))
  .flatMap(([, globs]) => globs ?? [])

const config: CodegenConfig = {
  overwrite: true,
  schema: 'graphql.schema.main.graphql',
  documents: [
    'src/**/*.ts',
    'src/**/*.graphql',
    '!src/gql/**',
    '!src/gql-main/**',
    // KAN-231-only operations shared by modules that exist on both profiles.
    '!src/services/documents/kan231.ts',
    ...excludedDocuments.map((glob) => `!${glob}`)
  ],
  generates: {
    './src/gql-main/': {
      preset: 'client',
      plugins: [],
      config: { nonOptionalTypename: true, useTypeImports: true }
    }
  }
}

export default config
