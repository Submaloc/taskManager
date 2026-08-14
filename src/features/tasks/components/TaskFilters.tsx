import { SegmentedControl } from '@mantine/core'

import { TASK_STATUS_FILTER_LABELS } from '../model/constants'
import type { TaskStatusFilter } from '../model/types'

const STATUS_FILTERS: TaskStatusFilter[] = [
  'all',
  'todo',
  'in_progress',
  'done',
]

type TaskFiltersProps = {
  value: TaskStatusFilter
  onChange: (value: TaskStatusFilter) => void
}

export function TaskFilters({ value, onChange }: TaskFiltersProps) {
  return (
    <SegmentedControl
      value={value}
      onChange={(nextValue) => onChange(nextValue as TaskStatusFilter)}
      data={STATUS_FILTERS.map((status) => ({
        value: status,
        label: TASK_STATUS_FILTER_LABELS[status],
      }))}
    />
  )
}
