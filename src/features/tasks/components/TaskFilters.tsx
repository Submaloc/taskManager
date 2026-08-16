import { SegmentedControl, Select } from '@mantine/core'

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
  const data = TASK_STATUS_FILTERS.map((status) => ({
    value: status,
    label: TASK_STATUS_FILTER_LABELS[status],
  }))

  function handleChange(nextValue: string | null) {
    if (nextValue && isTaskStatusFilter(nextValue)) {
      onChange(nextValue)
    }
  }

  return (
    <>
      <Select
        hiddenFrom="sm"
        aria-label="Filter by status"
        allowDeselect={false}
        data={data}
        value={value}
        size="md"
        w="100%"
        onChange={handleChange}
      />
      <SegmentedControl
        visibleFrom="sm"
        fullWidth
        value={value}
        data={data}
        onChange={handleChange}
      />
    </>
  )
}
