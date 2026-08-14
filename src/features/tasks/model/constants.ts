import type { TaskPriority, TaskStatus, TaskStatusFilter } from './types'

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'К выполнению',
  in_progress: 'В работе',
  done: 'Выполнено',
}

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
}

export const TASK_STATUS_FILTER_LABELS: Record<TaskStatusFilter, string> = {
  all: 'Все',
  ...TASK_STATUS_LABELS,
}
