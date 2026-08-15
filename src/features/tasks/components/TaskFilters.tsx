import { SegmentedControl } from '@mantine/core'

import {
  isTaskStatusFilter,
  TASK_STATUS_FILTER_LABELS,
  TASK_STATUS_FILTERS,
} from '../model/constants'
import type { TaskStatusFilter } from '../model/types'

type TaskFiltersProps = {
  value: TaskStatusFilter
  onChange: (value: TaskStatusFilter) => void
}

export function TaskFilters({ value, onChange }: TaskFiltersProps) {
  return (
    <SegmentedControl
      value={value}
      onChange={(nextValue) => {
        if (isTaskStatusFilter(nextValue)) {
          onChange(nextValue)
        }
      }}
      data={TASK_STATUS_FILTERS.map((status) => ({
        value: status,
        label: TASK_STATUS_FILTER_LABELS[status],
      }))}
    />
  )
}
