import { Badge, Card, Group, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

import { formatDate } from '../../../shared/lib/formatDate'
import {
  TASK_PRIORITY_COLORS,
  TASK_PRIORITY_LABELS,
  TASK_STATUS_COLORS,
  TASK_STATUS_LABELS,
} from '../model/constants'
import type { Task } from '../model/types'

type TaskCardProps = {
  task: Task
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card
      component={Link}
      to={`/tasks/${task.id}`}
      withBorder
      padding="md"
      radius="md"
      style={{ textDecoration: 'none' }}
    >
      <Group justify="space-between" mb="xs" wrap="nowrap" gap="sm">
        <Text fw={600} lineClamp={1}>
          {task.title}
        </Text>
        <Badge color={TASK_PRIORITY_COLORS[task.priority]}>
          {TASK_PRIORITY_LABELS[task.priority]}
        </Badge>
      </Group>
      <Group gap="xs">
        <Badge variant="light" color={TASK_STATUS_COLORS[task.status]}>
          {TASK_STATUS_LABELS[task.status]}
        </Badge>
        <Text size="sm" c="dimmed">
          {formatDate(task.createdAt)}
        </Text>
      </Group>
    </Card>
  )
}
