import { Badge, Button, Card, Group, Stack, Text } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'

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
      className="task-card"
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
      <Stack gap="sm">
        <Group justify="space-between" align="flex-start" wrap="nowrap" gap="sm">
          <Text
            fw={600}
            lineClamp={2}
            component={Link}
            to={`/tasks/${task.id}`}
            c="inherit"
            td="none"
            style={{ flex: 1, minWidth: 0, overflowWrap: 'anywhere' }}
          >
            {task.title}
          </Text>
          <Badge color={TASK_PRIORITY_COLORS[task.priority]} flex="0 0 auto">
            {TASK_PRIORITY_LABELS[task.priority]}
          </Badge>
        </Group>
        <Group justify="space-between" align="center" wrap="wrap" gap="sm">
          <Group gap="xs" wrap="wrap" miw={0}>
            <TaskStatusSelect
              value={task.status}
              disabled={isUpdatingStatus}
              onChange={(status) => onStatusChange(task, status)}
            />
            <Text size="sm" c="dimmed">
              {formatDate(task.createdAt)}
            </Text>
          </Group>
          <Group
            gap="xs"
            wrap="nowrap"
            w={{ base: '100%', xs: 'auto' }}
            grow
            preventGrowOverflow={false}
          >
            <Button
              size="xs"
              variant="light"
              onClick={(event) => {
                event.stopPropagation()
                onEdit(task)
              }}
            >
              Edit
            </Button>
            <Button
              size="xs"
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
      </Stack>
    </Card>
  )
}
