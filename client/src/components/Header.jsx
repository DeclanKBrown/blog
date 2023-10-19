import { Link } from 'react-router-dom'

export default function Headers({ setIsLogInOpen, setIsSignUpOpen }) {
  return (
    <header className="flex flex-row px-60 py-4 items-center justify-between border-b-2 border-slate-400">
      <Link to="/">
        <h1 className="text-xl">Blog</h1>
      </Link>
      <div className="flex flex-row gap-4">
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
      </div>
    </header>
  )
}
