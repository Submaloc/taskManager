import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateTask } from '../api/tasksApi'
import type { TaskFormValues } from '../model/types'
import { taskKeys } from './taskKeys'

type UpdateTaskVariables = {
  id: string
  values: Partial<TaskFormValues>
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, values }: UpdateTaskVariables) => updateTask(id, values),
    onSuccess: async (task) => {
      await queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
      await queryClient.invalidateQueries({
        queryKey: taskKeys.detail(task.id),
      })
    },
  })
}
