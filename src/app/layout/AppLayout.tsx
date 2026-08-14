import { Anchor, AppShell, Container, Group, Title } from '@mantine/core'
import { Link, Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Anchor component={Link} to="/" underline="never" c="inherit">
            <Title order={3}>Task Manager</Title>
          </Anchor>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
