import React, { useEffect, useState } from "react"

const SignupContext = React.createContext();

const SignupContextProvider = ({ children }) => {

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(null)


  const signup = async (name, email, password) => {
    setIsLoading(true)
    setError(null)

    console.log(JSON.stringify({ name, email, password }))

    const response = await fetch('http://192.168.100.200:9000/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })

    const json = await response.json()
    console.log(json)

    if (!response.ok) {
      setIsLoading(false)
      setError(json.message.message)
      console.log(error)
    }

    if (response.ok) {
      //save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      //update the auth context
      dispatch({ type: 'LOGIN', payload: json })

      setIsLoading(false)
    }
  }

  return (
    <SignupContext.Provider value={{ signup, isLoading, error }}>
      {children}
    </SignupContext.Provider>
  )
}

export { SignupContextProvider, SignupContext }
