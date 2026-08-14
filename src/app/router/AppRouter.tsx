import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { AppLayout } from '../layout/AppLayout'
import { NotFoundPage } from '../../pages/NotFoundPage'
import { TaskDetailsPage } from '../../pages/TaskDetailsPage'
import { TaskListPage } from '../../pages/TaskListPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <TaskListPage />,
      },
      {
        path: 'tasks/:id',
        element: <TaskDetailsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
