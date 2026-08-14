import { z } from 'zod'

import { httpClient } from '../../../shared/api/httpClient'
import { taskSchema } from '../model/schema'
import type { GetTasksParams, Task, TaskFormValues } from '../model/types'

const tasksSchema = z.array(taskSchema)

function buildTasksQuery(params?: GetTasksParams): string {
  const parts: string[] = []

  if (params?.status && params.status !== 'all') {
    parts.push(`status=${encodeURIComponent(params.status)}`)
  }

  const title = params?.title?.trim()
  if (title) {
    parts.push(`title:contains=${encodeURIComponent(title)}`)
  }

  parts.push('_sort=-createdAt')

  return `?${parts.join('&')}`
}

export async function getTasks(params?: GetTasksParams): Promise<Task[]> {
  const data = await httpClient<unknown>(`/tasks${buildTasksQuery(params)}`)
  return tasksSchema.parse(data)
}

export async function getTaskById(id: string): Promise<Task> {
  const data = await httpClient<unknown>(`/tasks/${id}`)
  return taskSchema.parse(data)
}

export async function createTask(values: TaskFormValues): Promise<Task> {
  const data = await httpClient<unknown>('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      ...values,
      createdAt: new Date().toISOString(),
    }),
  })

  return taskSchema.parse(data)
}

export async function updateTask(
  id: string,
  values: Partial<TaskFormValues>,
): Promise<Task> {
  const data = await httpClient<unknown>(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  })

  return taskSchema.parse(data)
}

export async function deleteTask(id: string): Promise<void> {
  await httpClient<void>(`/tasks/${id}`, {
    method: 'DELETE',
  })
}
