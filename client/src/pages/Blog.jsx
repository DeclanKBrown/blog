import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Blog() {
  const [post, setPost] = useState(null)
  const { postId } = useParams()

  useEffect(() => {
    async function getPost() {
      const indPost = await axios.get(
        `http://localhost:3000/api/v1/post/${postId}`
      )
      setPost(indPost)
    }
    getPost()
  }, [])
  return <>Blog Post</>
}
