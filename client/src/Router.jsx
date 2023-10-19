import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root'
import Error from './pages/Error'

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <Error />,
    },
  ])

  return <RouterProvider router={router} />
}

export default Router
