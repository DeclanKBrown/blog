import { Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return true
  }
}

export default function ProtectedRoutes() {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <Navigate to="/" replace={true} />
}
