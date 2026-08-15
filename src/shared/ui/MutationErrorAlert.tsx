import { Alert } from '@mantine/core'

import { getErrorMessage } from '../api/httpClient'

type MutationErrorAlertProps = {
  error: unknown
  title?: string
  onClose: () => void
}

export function MutationErrorAlert({
  error,
  title = 'Update failed',
  onClose,
}: MutationErrorAlertProps) {
  if (!error) {
    return null
  }

  return (
    <Alert color="red" title={title} withCloseButton onClose={onClose} mb="md">
      {getErrorMessage(error)}
    </Alert>
  )
}
