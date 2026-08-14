import type { TaskPriority, TaskStatus, TaskStatusFilter } from './types'

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
}

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

export const TASK_STATUS_FILTER_LABELS: Record<TaskStatusFilter, string> = {
  all: 'All',
  ...TASK_STATUS_LABELS,
}
