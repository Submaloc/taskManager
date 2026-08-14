import { Alert, Button, Group, Modal, Text } from '@mantine/core'

type DeleteTaskDialogProps = {
  opened: boolean
  taskTitle?: string
  isDeleting: boolean
  errorMessage?: string
  onClose: () => void
  onConfirm: () => void
}

export function DeleteTaskDialog({
  opened,
  taskTitle,
  isDeleting,
  errorMessage,
  onClose,
  onConfirm,
}: DeleteTaskDialogProps) {
  return (
    <Modal opened={opened} onClose={onClose} title="Delete task" centered>
      <Text mb="md">
        Are you sure you want to delete
        {taskTitle ? ` “${taskTitle}”` : ' this task'}?
      </Text>
      {errorMessage ? (
        <Alert color="red" mb="md">
          {errorMessage}
        </Alert>
      ) : null}
      <Group justify="flex-end">
        <Button variant="default" onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button color="red" loading={isDeleting} onClick={onConfirm}>
          Delete
        </Button>
      </Group>
    </Modal>
  )
}
