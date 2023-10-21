import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Post from './components/AdminPost'
import Dashboard from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import ProtectedRoutes from './Utils/ProtectedRoutes'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreatePost />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
      </Route>
    </Routes>
  )
}
