import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteTask } from '../api/tasksApi'
import { taskKeys } from './taskKeys'

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: async (_result, id) => {
      await queryClient.invalidateQueries({ queryKey: taskKeys.lists() })
      queryClient.removeQueries({ queryKey: taskKeys.detail(id) })
    },
  })
}
