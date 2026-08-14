import type { z } from 'zod'

import type {
  taskFormSchema,
  taskPrioritySchema,
  taskSchema,
  taskStatusSchema,
} from './schema'

export type Task = z.infer<typeof taskSchema>
export type TaskStatus = z.infer<typeof taskStatusSchema>
export type TaskPriority = z.infer<typeof taskPrioritySchema>
export type TaskFormValues = z.infer<typeof taskFormSchema>
export type TaskStatusFilter = TaskStatus | 'all'

export type GetTasksParams = {
  status?: TaskStatusFilter
  title?: string
}
