import { useQuery } from '@tanstack/react-query'

import { getTaskById } from '../api/tasksApi'
import { taskKeys } from './taskKeys'

export function useTask(id: string | undefined) {
  return useQuery({
    queryKey: taskKeys.detail(id ?? ''),
    queryFn: () => {
      if (!id) {
        throw new Error('Task id is required')
      }

      return getTaskById(id)
    },
    enabled: Boolean(id),
  })
}
