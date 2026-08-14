import { Center, Loader, Stack, Text } from '@mantine/core'

type LoadingStateProps = {
  label?: string
}

export function LoadingState({ label = 'Loading...' }: LoadingStateProps) {
  return (
    <Center py="xl">
      <Stack align="center" gap="sm">
        <Loader />
        <Text c="dimmed">{label}</Text>
      </Stack>
    </Center>
  )
}
