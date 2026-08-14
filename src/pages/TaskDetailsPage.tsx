import { Text, Title } from '@mantine/core'
import { useParams } from 'react-router-dom'

export function TaskDetailsPage() {
  const { id } = useParams()

  return (
    <>
      <Title order={2}>Task</Title>
      <Text c="dimmed" mt="sm">
        Details for task {id} will appear here
      </Text>
    </>
  )
}
