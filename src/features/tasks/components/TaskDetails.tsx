import { Badge, Button, Group, Stack, Text, Title } from '@mantine/core'

import { formatDate } from '../../../shared/lib/formatDate'
import { TASK_PRIORITY_COLORS, TASK_PRIORITY_LABELS } from '../model/constants'
import type { Task, TaskStatus } from '../model/types'
import { TaskStatusSelect } from './TaskStatusSelect'

type TaskDetailsProps = {
  task: Task
  isUpdatingStatus?: boolean
  onEdit: () => void
  onDelete: () => void
  onStatusChange: (status: TaskStatus) => void
}

export function TaskDetails({
  task,
  isUpdatingStatus,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskDetailsProps) {
  return (
    <Stack gap="md">
      <Group justify="space-between" align="flex-start" wrap="wrap">
        <Title order={2}>{task.title}</Title>
        <Group gap="xs">
          <Button variant="light" onClick={onEdit}>
            Edit
          </Button>
          <Button color="red" variant="light" onClick={onDelete}>
            Delete
          </Button>
        </Group>
      </Group>
      <Group gap="sm">
        <Badge color={TASK_PRIORITY_COLORS[task.priority]}>
          {TASK_PRIORITY_LABELS[task.priority]}
        </Badge>
        <TaskStatusSelect
          value={task.status}
          disabled={isUpdatingStatus}
          onChange={onStatusChange}
        />
        <Text size="sm" c="dimmed">
          Created {formatDate(task.createdAt)}
        </Text>
      </Group>
      <Text>
        {task.description.trim() ? task.description : 'No description'}
      </Text>
    </Stack>
  )
}
