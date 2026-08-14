import { Group, Title } from '@mantine/core'
import { useState } from 'react'

import { TaskFilters } from '../features/tasks/components/TaskFilters'
import { TaskList } from '../features/tasks/components/TaskList'
import { TaskSearch } from '../features/tasks/components/TaskSearch'
import type { TaskStatusFilter } from '../features/tasks/model/types'
import { useTasks } from '../features/tasks/queries/useTasks'
import { useDebounce } from '../shared/hooks/useDebounce'
import { EmptyState } from '../shared/ui/EmptyState'
import { ErrorState } from '../shared/ui/ErrorState'
import { LoadingState } from '../shared/ui/LoadingState'

export function TaskListPage() {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<TaskStatusFilter>('all')
  const debouncedTitle = useDebounce(title)

  const {
    data: tasks,
    isPending,
    isError,
    refetch,
  } = useTasks({
    title: debouncedTitle,
    status,
  })

  const hasActiveFilters = status !== 'all' || debouncedTitle.trim().length > 0

  return (
    <>
      <Title order={2} mb="md">
        Tasks
      </Title>
      <Group justify="space-between" align="flex-end" mb="md" wrap="wrap">
        <TaskSearch value={title} onChange={setTitle} />
        <TaskFilters value={status} onChange={setStatus} />
      </Group>
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
          title={hasActiveFilters ? 'No tasks found' : 'No tasks yet'}
          description={
            hasActiveFilters
              ? 'Try a different search or status filter.'
              : 'There are no tasks to display.'
          }
        />
      ) : (
        <TaskList tasks={tasks} />
      )}
    </>
  )
}
