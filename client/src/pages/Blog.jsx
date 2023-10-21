import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { DateTime } from 'luxon'

export default function Blog() {
  const [post, setPost] = useState(null)
  const postId = useParams()

  useEffect(() => {
    async function getPost() {
      const indPost = await axios.get(
        `http://localhost:3000/api/v1/post/${postId.id}`
      )
      setPost(indPost.data.post)
    }
    getPost()
  }, [postId])
  return (
    <main className="flex flex-col items-center my-10">
      {post && (
        <>
          <h1 className="text-xl">{post.title}</h1>
          <p>{post.text}</p>
          <div className="flex items-start">
            {DateTime.fromISO(post.timestamp).toFormat('dd-MM-yyyy')}
          </div>
        </>
      )}
    </main>
  )
}
