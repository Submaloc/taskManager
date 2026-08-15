import { Anchor } from '@mantine/core'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { DeleteTaskDialog } from '../features/tasks/components/DeleteTaskDialog'
import { TaskDetails } from '../features/tasks/components/TaskDetails'
import { TaskFormModal } from '../features/tasks/components/TaskFormModal'
import { TaskNotFound } from '../features/tasks/components/TaskNotFound'
import { getTaskFormValues } from '../features/tasks/model/formValues'
import type { TaskFormValues, TaskStatus } from '../features/tasks/model/types'
import { useDeleteTask } from '../features/tasks/queries/useDeleteTask'
import { useTask } from '../features/tasks/queries/useTask'
import { useUpdateTask } from '../features/tasks/queries/useUpdateTask'
import { getErrorMessage, isNotFoundError } from '../shared/api/httpClient'
import { ErrorState } from '../shared/ui/ErrorState'
import { LoadingState } from '../shared/ui/LoadingState'
import { MutationErrorAlert } from '../shared/ui/MutationErrorAlert'

export function TaskDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { data: task, isPending, isError, error, refetch } = useTask(id)
  const updateTask = useUpdateTask()
  const updateStatus = useUpdateTask()
  const deleteTask = useDeleteTask()

  function closeEditForm() {
    setIsEditOpen(false)
    updateTask.reset()
  }

  async function handleSubmit(values: TaskFormValues) {
    if (!task) {
      return
    }

    await updateTask.mutateAsync({
      id: task.id,
      values,
    })
    closeEditForm()
  }

  function handleStatusChange(status: TaskStatus) {
    if (!task) {
      return
    }

    void updateStatus.mutate({
      id: task.id,
      values: { status },
    })
  }

  function closeDeleteDialog() {
    setIsDeleteOpen(false)
    deleteTask.reset()
  }

  async function confirmDelete() {
    if (!task) {
      return
    }

    await deleteTask.mutateAsync(task.id)
    closeDeleteDialog()
    void navigate('/')
  }

  const showNotFound =
    !id || isNotFoundError(error) || (!isPending && !isError && !task)

  return (
    <>
      <Anchor component={Link} to="/" mb="md" display="inline-block">
        Back to tasks
      </Anchor>
      {isPending ? (
        <LoadingState />
      ) : showNotFound ? (
        <TaskNotFound />
      ) : isError ? (
        <ErrorState
          title="Failed to load task"
          message={getErrorMessage(
            error,
            'Make sure the API server is running and try again.',
          )}
          onRetry={() => {
            void refetch()
          }}
        />
      ) : task ? (
        <>
          <MutationErrorAlert
            error={updateStatus.error}
            title="Failed to update status"
            onClose={() => updateStatus.reset()}
          />
          <TaskDetails
            task={task}
            isUpdatingStatus={updateStatus.isPending}
            onEdit={() => {
              updateTask.reset()
              setIsEditOpen(true)
            }}
            onDelete={() => {
              deleteTask.reset()
              setIsDeleteOpen(true)
            }}
            onStatusChange={handleStatusChange}
          />
          <TaskFormModal
            opened={isEditOpen}
            formKey={task.id}
            title="Edit task"
            defaultValues={getTaskFormValues(task)}
            submitLabel="Save changes"
            isSubmitting={updateTask.isPending}
            submitError={
              updateTask.error ? getErrorMessage(updateTask.error) : undefined
            }
            onClose={closeEditForm}
            onSubmit={handleSubmit}
          />
          <DeleteTaskDialog
            opened={isDeleteOpen}
            taskTitle={task.title}
            isDeleting={deleteTask.isPending}
            errorMessage={
              deleteTask.error ? getErrorMessage(deleteTask.error) : undefined
            }
            onClose={closeDeleteDialog}
            onConfirm={() => {
              void confirmDelete()
            }}
          />
        </>
      ) : (
        <TaskNotFound />
      )}
    </>
  )
}
