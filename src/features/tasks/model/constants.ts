import type {
  TaskFormValues,
  TaskPriority,
  TaskStatus,
  TaskStatusFilter,
} from './types'

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

export const TASK_FORM_DEFAULTS: TaskFormValues = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
}

export const TASK_STATUS_OPTIONS = (
  Object.entries(TASK_STATUS_LABELS) as [TaskStatus, string][]
).map(([value, label]) => ({ value, label }))

export const TASK_PRIORITY_OPTIONS = (
  Object.entries(TASK_PRIORITY_LABELS) as [TaskPriority, string][]
).map(([value, label]) => ({ value, label }))
