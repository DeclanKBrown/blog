import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function LogInModal({ setIsLogInOpen }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleCancel(e) {
    e.preventDefault()
    setIsLogInOpen(false)
    setUsername('')
    setPassword('')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/api/v1/log_in', {
        username: username,
        password: password,
      })

      if (response.status === 200) {
        toast(response.data.message)
        setIsLogInOpen(false)
        const token = response.data.token
        localStorage.setItem('token', token)
      } else {
        toast(response.response)
      }
    } catch (error) {
      console.error('Error Logging in', error)
      toast(error.response.data.message)
    }
  }

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-slate-600 bg-opacity-50"
      onClick={() => setIsLogInOpen(false)}
    >
      <div
        className="bg-slate-300 p-8 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="flex flex-col gap-2">
          <svg
            className="self-end cursor-pointer"
            onClick={() => setIsLogInOpen(false)}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <label htmlFor="username" className="text-l select-none">
            Username
          </label>
          <input
            type="text"
            className="py-1 pl-1 min-w-[20rem] rounded mb-5 focus:outline-none"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
          <label htmlFor="password" className="text-l select-none">
            Password
          </label>
          <input
            type="password"
            className="py-1 pl-1 min-w-[20rem] rounded mb-5 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
          <div className="flex flex-row gap-5 justify-between px-5">
            <button
              type="cancel"
              className="border border-slate-200 rounded px-2 py-1"
              onClick={(e) => handleCancel(e)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-slate-200 border border-slate-200 rounded px-2 py-1"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
