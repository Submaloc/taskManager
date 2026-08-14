import { Stack } from '@mantine/core'

import type { Task } from '../model/types'
import { TaskCard } from './TaskCard'

type TaskListProps = {
  tasks: Task[]
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <Stack gap="sm">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Stack>
  )
}
