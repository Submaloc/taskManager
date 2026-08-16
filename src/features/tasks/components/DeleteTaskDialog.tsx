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
    <Modal
      opened={opened}
      onClose={onClose}
      title="Delete task"
      centered
      size="md"
    >
      <Text mb="md" style={{ overflowWrap: 'anywhere' }}>
        Are you sure you want to delete
        {taskTitle ? ` “${taskTitle}”` : ' this task'}?
      </Text>
      {errorMessage ? (
        <Alert color="red" mb="md">
          {errorMessage}
        </Alert>
      ) : null}
      <Group justify="flex-end" gap="sm" wrap="wrap">
        <Button
          variant="default"
          onClick={onClose}
          disabled={isDeleting}
          flex="1 1 8rem"
        >
          Cancel
        </Button>
        <Button
          color="red"
          loading={isDeleting}
          onClick={onConfirm}
          flex="1 1 8rem"
        >
          Delete
        </Button>
      </Group>
    </Modal>
  )
}
