import { Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  if (user && user.status === 'admin') {
    return true
  }
}

export default function ProtectedRoutes() {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Navigate to="/" replace={true} />
}
