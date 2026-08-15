import { Select } from '@mantine/core'

import { isTaskStatus, TASK_STATUS_OPTIONS } from '../model/constants'
import type { TaskStatus } from '../model/types'

type TaskStatusSelectProps = {
  value: TaskStatus
  disabled?: boolean
  onChange: (status: TaskStatus) => void
}

export function TaskStatusSelect({
  value,
  disabled,
  onChange,
}: TaskStatusSelectProps) {
  return (
    <div
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <Select
        size="xs"
        w={150}
        allowDeselect={false}
        data={TASK_STATUS_OPTIONS}
        value={value}
        disabled={disabled}
        onChange={(nextValue) => {
          if (nextValue && nextValue !== value && isTaskStatus(nextValue)) {
            onChange(nextValue)
          }
        }}
      />
    </div>
  )
}
