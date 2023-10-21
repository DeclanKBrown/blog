import { useEffect, useState } from 'react'
import axios from 'axios'
import Post from '../components/Post'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    async function getPosts() {
      const allPosts = await axios.get('http://localhost:3000/api/v1/posts')
      if (allPosts.data.posts.length > 0) {
        setPosts(allPosts.data.posts)
      }
    }

    getPosts()
  }, [])

  return (
    <main className="flex flex-col items-center my-10">
      <h1 className="text-xl">Dashboard</h1>
      <Link to="/create" className="bg-slate-300 py-1 px-2 rounded my-5">
        Create Post
      </Link>
      {posts &&
        posts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            timestamp={post.timestamp}
            published={post.published}
          />
        ))}
    </main>
  )
}
