import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'

import { EmptyState } from '../../../shared/ui/EmptyState'

export function TaskNotFound() {
  return (
    <EmptyState
      title="Task not found"
      description="This task does not exist or was deleted."
      action={
        <Button component={Link} to="/">
          Back to tasks
        </Button>
      }
    />
  )
}
