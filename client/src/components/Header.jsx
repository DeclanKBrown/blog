import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Headers({
  setIsLogInOpen,
  setIsSignUpOpen,
  setIsLogOutOpen,
}) {
  const [user, setUser] = useState(localStorage.getItem('user'))

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData = localStorage.getItem('user')
      if (newData !== user) {
        setUser(newData)
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [user])

  return (
    <header className="flex flex-row px-60 py-4 items-center justify-between border-b-2 border-slate-400">
      <Link to="/">
        <h1 className="text-xl">Blog</h1>
      </Link>
      <div className="flex flex-row gap-4 items-center">
        {user ? (
          <>
            {console.log(user)}
            <span>Welcome Back {JSON.parse(user).username}</span>
            <button
              className="bg-slate-300 py-1 px-2 rounded"
              onClick={() => setIsLogOutOpen(true)}
            >
              Log Out
            </button>
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
