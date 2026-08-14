import { Button, Center, Stack, Text, Title } from '@mantine/core'

type ErrorStateProps = {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <Center py="xl">
      <Stack align="center" gap="sm">
        <Title order={3}>{title}</Title>
        <Text c="dimmed" ta="center">
          {message}
        </Text>
        {onRetry ? (
          <Button variant="light" onClick={onRetry}>
            Try again
          </Button>
        ) : null}
      </Stack>
    </Center>
  )
}
