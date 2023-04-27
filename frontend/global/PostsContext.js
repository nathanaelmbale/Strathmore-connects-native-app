import React, { useEffect, useState } from "react"

const PostsContext = React.createContext();

const PostsConextProvider = ({ children }) => {

  const [error, setError] = useState('')
  const [posts, setPosts] = useState([])
  const [currentPost, setcurrentPost] = useState([])
  const [comments, setComments] = useState([]);

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

   const getComments = (postId) => {

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

    const post = posts.find(post => post._id === postId);
    setcurrentPost(post)
   //console.log("current post",post)
    // If post is found, set the comments state to the comments of that post
    if (post) {
      setComments(post.comments.reverse());
      console.log(comments)
    } else {
      // If post is not found, set comments state to empty array
      setComments([]);
    }
   }

   const updateComments = (comments) => {
    console.log("tumefika")
    setComments(comments)
    console.log("tumefika",comments)
   }


  return (
    <PostsContext.Provider value={{ posts, comments, getComments ,currentPost,setComments ,updateComments,error }}>
      {children}
    </PostsContext.Provider>
  )
}

export { PostsConextProvider, PostsContext }
