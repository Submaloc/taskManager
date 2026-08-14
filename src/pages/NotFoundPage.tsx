import { Button, Text, Title } from '@mantine/core'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <>
      <Title order={2}>Page not found</Title>
      <Text c="dimmed" mt="sm" mb="md">
        This page does not exist
      </Text>
      <Button component={Link} to="/">
        Back to tasks
      </Button>
    </>
  )
}
