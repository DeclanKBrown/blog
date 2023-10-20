import toast from 'react-hot-toast'
import axios from 'axios'

export default function LogOutModal({ setIsLogOutOpen }) {
  function handleCancel(e) {
    e.preventDefault()
    setIsLogOutOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/api/v1/log_out')

      console.log(response)

      if (response.status >= 200 && response.status <= 300) {
        toast(response.data.message)
        setIsLogOutOpen(false)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      } else {
        toast(response.response)
      }
    } catch (error) {
      console.error('Error Logging out', error)
      toast(error.response.data.message)
    }
  }

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-slate-600 bg-opacity-50"
      onClick={() => setIsLogOutOpen(false)}
    >
      <div
        className="bg-slate-300 p-8 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="flex flex-col gap-2">
          <svg
            className="self-end cursor-pointer"
            onClick={() => setIsLogOutOpen(false)}
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
          <h1 className="my-5 mb-8">Are you sure you want to log out?</h1>
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
