import { useState } from 'react'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
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
