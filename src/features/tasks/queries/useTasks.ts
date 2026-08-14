import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getTasks } from '../api/tasksApi'
import type { GetTasksParams } from '../model/types'
import { taskKeys } from './taskKeys'

export function useTasks(params?: GetTasksParams) {
  return useQuery({
    queryKey: taskKeys.list(params),
    queryFn: () => getTasks(params),
    placeholderData: keepPreviousData,
  })
}
