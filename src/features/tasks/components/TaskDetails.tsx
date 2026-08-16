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
      <Group justify="space-between" align="flex-start" wrap="wrap" gap="sm">
        <Title
          order={2}
          fz={{ base: 'h3', sm: 'h2' }}
          style={{ flex: '1 1 12rem', minWidth: 0, overflowWrap: 'anywhere' }}
        >
          {task.title}
        </Title>
        <Group
          gap="xs"
          wrap="nowrap"
          w={{ base: '100%', xs: 'auto' }}
          grow
          preventGrowOverflow={false}
        >
          <Button variant="light" onClick={onEdit}>
            Edit
          </Button>
          <Button color="red" variant="light" onClick={onDelete}>
            Delete
          </Button>
        </Group>
      </Group>
      <Group gap="sm" wrap="wrap">
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
      <Text
        c={task.description.trim() ? undefined : 'dimmed'}
        style={{ overflowWrap: 'anywhere' }}
      >
        {task.description.trim() ? task.description : 'No description'}
      </Text>
    </Stack>
  )
}
