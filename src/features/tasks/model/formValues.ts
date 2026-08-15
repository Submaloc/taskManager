import type { Task, TaskFormValues } from './types'

export function getTaskFormValues(task: Task): TaskFormValues {
  return {
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
  }
}
