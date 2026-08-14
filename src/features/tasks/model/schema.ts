import { z } from 'zod'

export const taskStatusSchema = z.enum(['todo', 'in_progress', 'done'])

export const taskPrioritySchema = z.enum(['low', 'medium', 'high'])

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  createdAt: z.string(),
})

export const taskFormSchema = z.object({
  title: z.string().trim().min(1, 'Enter a title'),
  description: z.string().trim(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
})
