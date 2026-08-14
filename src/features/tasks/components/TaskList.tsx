import { Stack } from '@mantine/core'

import type { Task, TaskStatus } from '../model/types'
import { TaskCard } from './TaskCard'

type TaskListProps = {
  tasks: Task[]
  updatingTaskId?: string
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onStatusChange: (task: Task, status: TaskStatus) => void
}

export function TaskList({
  tasks,
  updatingTaskId,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskListProps) {
  return (
    <Stack gap="sm">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isUpdatingStatus={updatingTaskId === task.id}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </Stack>
  )
}
