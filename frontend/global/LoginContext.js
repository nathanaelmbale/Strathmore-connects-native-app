import React, { useEffect, useState } from "react"

const LoginContext = React.createContext();

const LoginConextProvider = ({ children }) => {

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [approved, setApproved] = useState(false)


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
    }else {
      setError(null)
      setApproved(true)
    }
  }


  return (
    <LoginContext.Provider value={{ login, approved,isLoading, error }}>
      {children}
    </LoginContext.Provider>
  )
}

export { LoginConextProvider, LoginContext }
