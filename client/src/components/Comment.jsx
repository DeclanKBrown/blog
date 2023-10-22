import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default function Comment() {
  const [text, setText] = useState('')

  const { id } = useParams()

  async function handleClick() {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/post/${id}/comment`,
        {
          message: text,
        }
      )

      if (response.status >= 200 && response.status <= 300) {
        toast(response.data.message)
        setText('')
      } else {
        toast(response.response)
      }
    } catch (error) {
      console.error('Error posting comment', error)
      toast(error.response.data.message)
    }
  }

  return (
    <div className="w-1/4 flex flex-col items-center gap-2">
      <textarea
        className="w-full rounded p-1"
        rows={3}
        onChange={(e) => setText(e.target.value)}
        value={text}
      ></textarea>
      <div className="flex flex-row items-end w-full justify-end">
        <button
          className="bg-slate-300 py-1 px-2 rounded"
          onClick={handleClick}
        >
          Post
        </button>
      </div>
    </div>
  )
}
