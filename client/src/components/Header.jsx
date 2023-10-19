import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Headers({ setIsLogInOpen, setIsSignUpOpen }) {
  const [user, setUser] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== null) {
      setUser(token.user)
    }
  }, [])
  return (
    <header className="flex flex-row px-60 py-4 items-center justify-between border-b-2 border-slate-400">
      <Link to="/">
        <h1 className="text-xl">Blog</h1>
      </Link>
      <div className="flex flex-row gap-4">
        {user ? (
          <>
            <span>Welcome Back {user.name}</span>
            <button className="bg-slate-300 py-1 px-2 rounded">Log Out</button>
          </>
        ) : (
          <>
            <button
              className="bg-slate-300 py-1 px-2 rounded"
              onClick={() => setIsLogInOpen(true)}
            >
              Log In
            </button>
            <button
              className="border border-slate-300 py-1 px-2 rounded"
              onClick={() => setIsSignUpOpen(true)}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  )
}
