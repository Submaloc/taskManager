import { Badge, Button, Card, Group, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

import { formatDate } from '../../../shared/lib/formatDate'
import { TASK_PRIORITY_COLORS, TASK_PRIORITY_LABELS } from '../model/constants'
import type { Task, TaskStatus } from '../model/types'
import { TaskStatusSelect } from './TaskStatusSelect'

type TaskCardProps = {
  task: Task
  isUpdatingStatus?: boolean
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onStatusChange: (task: Task, status: TaskStatus) => void
}

export function TaskCard({
  task,
  isUpdatingStatus,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      withBorder
      padding="md"
      radius="md"
      style={{ cursor: 'pointer' }}
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
      <Group justify="space-between" mb="xs" wrap="nowrap" gap="sm">
        <Text fw={600} lineClamp={1}>
          {task.title}
        </Text>
        <Group gap="xs" wrap="nowrap">
          <Badge color={TASK_PRIORITY_COLORS[task.priority]}>
            {TASK_PRIORITY_LABELS[task.priority]}
          </Badge>
          <Button
            size="compact-xs"
            variant="light"
            onClick={(event) => {
              event.stopPropagation()
              onEdit(task)
            }}
          >
            Edit
          </Button>
          <Button
            size="compact-xs"
            variant="light"
            color="red"
            onClick={(event) => {
              event.stopPropagation()
              onDelete(task)
            }}
          >
            Delete
          </Button>
        </Group>
      </Group>
      <Group gap="xs">
        <TaskStatusSelect
          value={task.status}
          disabled={isUpdatingStatus}
          onChange={(status) => onStatusChange(task, status)}
        />
        <Text size="sm" c="dimmed">
          {formatDate(task.createdAt)}
        </Text>
      </Group>
    </Card>
  )
}
