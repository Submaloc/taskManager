import { TextInput } from '@mantine/core'

type TaskSearchProps = {
  value: string
  onChange: (value: string) => void
}

export function TaskSearch({ value, onChange }: TaskSearchProps) {
  return (
    <TextInput
      placeholder="Search by title"
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      size="md"
      w="100%"
    />
  )
}
