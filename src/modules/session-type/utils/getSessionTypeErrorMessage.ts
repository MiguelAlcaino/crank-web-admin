import { ERROR_UNKNOWN } from '@/utils/errorMessages'
import { DomainError } from '@/utils/errors/domainError'

export function getSessionTypeErrorMessage(error: unknown): string {
  if (error instanceof DomainError) {
    switch (error.code) {
      case 'uploaded_file_is_not_an_image':
      case 'UploadedFileIsNotAnImage':
        return 'The uploaded file must be an image.'
      case 'session_type_not_found':
      case 'SessionTypeNotFoundError':
        return 'Session type not found.'
      default:
        return ERROR_UNKNOWN
    }
  }

  return ERROR_UNKNOWN
}
