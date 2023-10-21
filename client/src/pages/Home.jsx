import { useEffect, useState } from 'react'
import axios from 'axios'
import Post from '../components/Post'

export default function Home() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    async function getPosts() {
      const allPosts = await axios.get('http://localhost:3000/api/v1/posts')
      if (allPosts.data.posts.length > 0) {
        setPosts(allPosts.data.posts.filter((post) => post.published))
      }
    }

    getPosts()
  }, [])
  return (
    <main className="flex flex-col items-center py-11">
      <h1 className="text-2xl font-semibold mb-8">Blog Posts</h1>
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Post
            key={post._id}
            title={post.title}
            timestamp={post.timestamp}
            id={post._id}
          />
        ))
      ) : (
        <p>No Blog Posts Yet!</p>
      )}
    </main>
  )
}
