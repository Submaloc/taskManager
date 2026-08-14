import { Modal } from '@mantine/core'

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
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
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
