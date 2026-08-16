import { Anchor, AppShell, Container, Group, Title } from '@mantine/core'
import { Link, Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <AppShell
      header={{ height: { base: 56, sm: 60 } }}
      padding={{ base: 'sm', sm: 'md' }}
    >
      <AppShell.Header>
        <Group h="100%" px={{ base: 'sm', sm: 'md' }} wrap="nowrap">
          <Anchor component={Link} to="/" underline="never" c="inherit">
            <Title order={3} fz={{ base: 'h4', sm: 'h3' }}>
              Task Manager
            </Title>
          </Anchor>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg" px={0}>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
