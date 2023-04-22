import React, { useEffect, useState } from "react"

const PostsContext = React.createContext();

const PostsConextProvider = ({ children }) => {

  const [error, setError] = useState('')
  const [posts, setPosts] = useState([])


  console.log("UseEffect")
  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch('http://192.168.100.200:9000/post')
        console.log('Response status:', response.status)

        if (response.ok) {
          const fetchedPosts = await response.json()
          //console.log("fetchedPosts variable", JSON.stringify(fetchedPosts))
          setPosts(fetchedPosts)
        }
      } catch (error) {
        console.log("Error fetching posts:", error)
        setError("Unable to fetch posts")
      }
    }

    getPost()
  }, [])



  return (
    <PostsContext.Provider value={{ posts, error }}>
      {children}
    </PostsContext.Provider>
  )
}

export { PostsConextProvider, PostsContext }
