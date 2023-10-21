import { DateTime } from 'luxon'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Post({ title, timestamp, published, id, setUpdated }) {
  const formattedTimestamp = DateTime.fromISO(timestamp).toFormat('dd-MM-yyyy')

  setUpdated(false)

  async function handleClick(boolPublished) {
    try {
      const response = await axios.put('http://localhost:3000/api/v1/post', {
        id: id,
        published: boolPublished,
      })
      console.log(response)
      if (response.status >= 200 && response.status <= 300) {
        toast(response.data.message)
        setUpdated(true)
      }
    } catch (error) {
      console.error('Error Signing Up', error)
      toast(error.response.data.message)
    }
  }

  return (
    <div className="flex flex-col w-1/4 py-10 px-2 border-y-2 border-slate-500">
      <Link to={`/post/${id}`}>
        <h1 className="text-xl mb-3">{title}</h1>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h3>{formattedTimestamp}</h3>
            <h3>{published ? 'Published: True' : 'Published: False'}</h3>
          </div>
          <div onClick={(e) => e.preventDefault()}>
            {published ? (
              <button
                className="bg-slate-300 py-1 px-2 rounded"
                onClick={() => handleClick(false)}
              >
                Unpublish
              </button>
            ) : (
              <button
                className="bg-slate-300 py-1 px-2 rounded"
                onClick={() => handleClick(true)}
              >
                Publish
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
