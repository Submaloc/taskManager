import { Modal } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

import type { TaskFormValues } from '../model/types'
import { TaskForm } from './TaskForm'

type TaskFormModalProps = {
  opened: boolean
  title: string
  formKey: string
  defaultValues: TaskFormValues
  submitLabel: string
  isSubmitting: boolean
  submitError?: string
  onClose: () => void
  onSubmit: (values: TaskFormValues) => Promise<void>
}

export function TaskFormModal({
  opened,
  title,
  formKey,
  defaultValues,
  submitLabel,
  isSubmitting,
  submitError,
  onClose,
  onSubmit,
}: TaskFormModalProps) {
  const isMobile = useMediaQuery('(max-width: 48em)')

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
      size="md"
      fullScreen={isMobile}
      radius={isMobile ? 0 : 'md'}
    >
      {opened ? (
        <TaskForm
          key={formKey}
          defaultValues={defaultValues}
          submitLabel={submitLabel}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      ) : null}
    </Modal>
  )
}
