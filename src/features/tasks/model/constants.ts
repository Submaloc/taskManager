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

export const TASK_STATUS_COLORS: Record<TaskStatus, string> = {
  todo: 'blue',
  in_progress: 'orange',
  done: 'green',
}

export const TASK_PRIORITY_COLORS: Record<TaskPriority, string> = {
  low: 'gray',
  medium: 'yellow',
  high: 'red',
}
