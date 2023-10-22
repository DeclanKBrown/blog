import axios from 'axios'
import Comment from './Comment'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Comments() {
  const [comments, setComments] = useState([])

  const { id } = useParams()

  useEffect(() => {
    async function getComments() {
      const allComments = await axios.get(
        `http://localhost:3000/api/v1/post/${id}/comments`
      )

      setComments(allComments.data.message)
    }

    getComments()
  }, [])
  return (
    <section className="flex flex-col items-center my-5">
      <h1 className="text-lg">Comments</h1>
      <Comment />
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="border-y border-y-slate-400 my-5">
            <h3>{comment.message}</h3>
          </div>
        ))
      ) : (
        <h3>No comments yet!</h3>
      )}
    </section>
  )
}
