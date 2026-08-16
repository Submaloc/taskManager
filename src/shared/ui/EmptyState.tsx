import { Center, Stack, Text, Title } from '@mantine/core'
import type { ReactNode } from 'react'

type EmptyStateProps = {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Center py="xl" px="sm">
      <Stack align="center" gap="sm" maw={420}>
        <Title order={3}>{title}</Title>
        {description ? (
          <Text c="dimmed" ta="center">
            {description}
          </Text>
        ) : null}
        {action}
      </Stack>
    </Center>
  )
}
