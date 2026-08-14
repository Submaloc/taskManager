import { Title } from '@mantine/core'

import { TaskList } from '../features/tasks/components/TaskList'
import { useTasks } from '../features/tasks/queries/useTasks'
import { EmptyState } from '../shared/ui/EmptyState'
import { ErrorState } from '../shared/ui/ErrorState'
import { LoadingState } from '../shared/ui/LoadingState'

export function TaskListPage() {
  const { data: tasks, isPending, isError, refetch } = useTasks()

  return (
    <>
      <Title order={2} mb="md">
        Tasks
      </Title>
      {isPending ? (
        <LoadingState />
      ) : isError ? (
        <ErrorState
          title="Failed to load tasks"
          message="Make sure the API server is running and try again."
          onRetry={() => {
            void refetch()
          }}
        />
      ) : !tasks || tasks.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          description="There are no tasks to display."
        />
      ) : (
        <TaskList tasks={tasks} />
      )}
    </>
  )
}
