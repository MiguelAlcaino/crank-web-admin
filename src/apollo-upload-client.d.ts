declare module 'apollo-upload-client' {
  import type { ApolloLink } from '@apollo/client'

  interface CreateUploadLinkOptions {
    uri: string
    isExtractableFile?: (value: unknown) => boolean
    FormData?: new () => FormData
    fetchOptions?: Record<string, unknown>
    credentials?: RequestCredentials
    headers?: Record<string, unknown>
    includeExtensions?: boolean
  }

  export function createUploadLink(options: CreateUploadLinkOptions): ApolloLink
}
