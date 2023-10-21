import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/api/v1/post', {
        title: title,
        text: text,
      })

      if (response.status >= 200 && response.status <= 300) {
        navigate('/dashboard', { replace: true })
        toast('Success')
      }
    } catch (err) {
      console.error('Error creating post', err)
      toast(err.response.data.message)
    }
  }
  return (
    <main className="flex flex-col items-center my-10">
      <h1 className="text-xl">Create Post</h1>
      <form className="flex flex-col gap-5 w-1/3">
        <label htmlFor="title">Title</label>
        <input
          className="px-2 py-2 rounded bg-slate-100"
          id="title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
        <label htmlFor="text">Body</label>
        <textarea
          className="px-2 py-2 rounded bg-slate-100"
          id="text"
          rows={20}
          onChange={(e) => setText(e.target.value)}
          value={text}
        ></textarea>
        <div className="flex flex-row justify-end">
          <button
            className="bg-slate-300 py-1 px-2 rounded my-5"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  )
}
