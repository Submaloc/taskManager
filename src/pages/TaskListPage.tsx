import { Button, Group, Title } from '@mantine/core'
import { useState } from 'react'

import { TaskFilters } from '../features/tasks/components/TaskFilters'
import { TaskFormModal } from '../features/tasks/components/TaskFormModal'
import { DeleteTaskDialog } from '../features/tasks/components/DeleteTaskDialog'
import { TaskList } from '../features/tasks/components/TaskList'
import { TaskSearch } from '../features/tasks/components/TaskSearch'
import { TASK_FORM_DEFAULTS } from '../features/tasks/model/constants'
import type {
  Task,
  TaskFormValues,
  TaskStatus,
  TaskStatusFilter,
} from '../features/tasks/model/types'
import { useCreateTask } from '../features/tasks/queries/useCreateTask'
import { useDeleteTask } from '../features/tasks/queries/useDeleteTask'
import { useTasks } from '../features/tasks/queries/useTasks'
import { useUpdateTask } from '../features/tasks/queries/useUpdateTask'
import { useDebounce } from '../shared/hooks/useDebounce'
import { EmptyState } from '../shared/ui/EmptyState'
import { ErrorState } from '../shared/ui/ErrorState'
import { LoadingState } from '../shared/ui/LoadingState'

type TaskFormState = { mode: 'create' } | { mode: 'edit'; task: Task }

function getFormValues(task: Task): TaskFormValues {
  return {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
  }
}

export function TaskListPage() {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<TaskStatusFilter>('all')
  const [formState, setFormState] = useState<TaskFormState | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
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

  const createTask = useCreateTask()
  const updateTask = useUpdateTask()
  const updateStatus = useUpdateTask()
  const deleteTask = useDeleteTask()

  const hasActiveFilters = status !== 'all' || debouncedTitle.trim().length > 0
  const isSubmitting = createTask.isPending || updateTask.isPending
  const submitError =
    createTask.error?.message ?? updateTask.error?.message ?? undefined

  function closeForm() {
    setFormState(null)
    createTask.reset()
    updateTask.reset()
  }

  async function handleSubmit(values: TaskFormValues) {
    if (formState?.mode === 'edit') {
      await updateTask.mutateAsync({
        id: formState.task.id,
        values,
      })
    } else {
      await createTask.mutateAsync(values)
    }

    closeForm()
  }

  function openCreateForm() {
    createTask.reset()
    updateTask.reset()
    setFormState({ mode: 'create' })
  }

  function openEditForm(task: Task) {
    createTask.reset()
    updateTask.reset()
    setFormState({ mode: 'edit', task })
  }

  function handleStatusChange(task: Task, nextStatus: TaskStatus) {
    void updateStatus.mutate({
      id: task.id,
      values: { status: nextStatus },
    })
  }

  function closeDeleteDialog() {
    setTaskToDelete(null)
    deleteTask.reset()
  }

  async function confirmDelete() {
    if (!taskToDelete) {
      return
    }

    await deleteTask.mutateAsync(taskToDelete.id)
    closeDeleteDialog()
  }

  return (
    <>
      <Group justify="space-between" mb="md">
        <Title order={2}>Tasks</Title>
        <Button onClick={openCreateForm}>New task</Button>
      </Group>
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
          action={
            hasActiveFilters ? undefined : (
              <Button onClick={openCreateForm}>New task</Button>
            )
          }
        />
      ) : (
        <TaskList
          tasks={tasks}
          updatingTaskId={
            updateStatus.isPending ? updateStatus.variables?.id : undefined
          }
          onEdit={openEditForm}
          onDelete={setTaskToDelete}
          onStatusChange={handleStatusChange}
        />
      )}
      <TaskFormModal
        opened={formState !== null}
        formKey={formState?.mode === 'edit' ? formState.task.id : 'create'}
        title={formState?.mode === 'edit' ? 'Edit task' : 'New task'}
        defaultValues={
          formState?.mode === 'edit'
            ? getFormValues(formState.task)
            : TASK_FORM_DEFAULTS
        }
        submitLabel={
          formState?.mode === 'edit' ? 'Save changes' : 'Create task'
        }
        isSubmitting={isSubmitting}
        submitError={submitError}
        onClose={closeForm}
        onSubmit={handleSubmit}
      />
      <DeleteTaskDialog
        opened={taskToDelete !== null}
        taskTitle={taskToDelete?.title}
        isDeleting={deleteTask.isPending}
        errorMessage={deleteTask.error?.message}
        onClose={closeDeleteDialog}
        onConfirm={() => {
          void confirmDelete()
        }}
      />
    </>
  )
}
