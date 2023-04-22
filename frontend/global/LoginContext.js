import React, { useEffect, useState } from "react"

const LoginContext = React.createContext();

const LoginConextProvider = ({ children }) => {

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    console.log( "Tupo site",email,password)

    const response = await fetch('http://192.168.100.200:9000/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.message)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return (
    <LoginContext.Provider value={{ login, isLoading, error }}>
      {children}
    </LoginContext.Provider>
  )
}

export { LoginConextProvider, LoginContext }
