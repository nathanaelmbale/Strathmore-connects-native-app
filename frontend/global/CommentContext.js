import React, { useEffect, useState } from "react"

const CommentsContext = React.createContext();

const CommentsConextProvider = ({ children }) => {

  const [error, setError] = useState('')

  useEffect(() => {


  }, [])

  return (
    <CommentsContext.Provider value={{ error }}>
      {children}
    </CommentsContext.Provider>
  )
}

export { CommentsConextProvider, CommentsContext }
