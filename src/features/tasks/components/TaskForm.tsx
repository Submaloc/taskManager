import {
  Alert,
  Button,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { TASK_PRIORITY_OPTIONS, TASK_STATUS_OPTIONS } from '../model/constants'
import { taskFormSchema } from '../model/schema'
import type { TaskFormValues } from '../model/types'

type TaskFormProps = {
  defaultValues: TaskFormValues
  submitLabel: string
  isSubmitting: boolean
  submitError?: string
  onSubmit: (values: TaskFormValues) => Promise<void>
  onCancel: () => void
}

export function TaskForm({
  defaultValues,
  submitLabel,
  isSubmitting,
  submitError,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        {submitError ? (
          <Alert color="red" title="Failed to save task">
            {submitError}
          </Alert>
        ) : null}
        <TextInput
          label="Title"
          placeholder="Task title"
          error={errors.title?.message}
          {...register('title')}
        />
        <Textarea
          label="Description"
          placeholder="Task description"
          minRows={3}
          autosize
          error={errors.description?.message}
          {...register('description')}
        />
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <Controller
            name="status"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label="Status"
                data={TASK_STATUS_OPTIONS}
                allowDeselect={false}
                error={fieldState.error?.message}
                value={field.value}
                onChange={(value) => {
                  if (value) {
                    field.onChange(value)
                  }
                }}
              />
            )}
          />
          <Controller
            name="priority"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                label="Priority"
                data={TASK_PRIORITY_OPTIONS}
                allowDeselect={false}
                error={fieldState.error?.message}
                value={field.value}
                onChange={(value) => {
                  if (value) {
                    field.onChange(value)
                  }
                }}
              />
            )}
          />
        </SimpleGrid>
        <Group justify="flex-end">
          <Button variant="default" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            {submitLabel}
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
