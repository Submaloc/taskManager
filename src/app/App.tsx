import { MantineProvider } from '@mantine/core'

import { QueryProvider } from './providers/QueryProvider'
import { AppRouter } from './router/AppRouter'

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light">
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </MantineProvider>
  )
}
