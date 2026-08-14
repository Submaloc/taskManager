import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createTask } from '../api/tasksApi'
import { taskKeys } from './taskKeys'

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
    },
  })
}
