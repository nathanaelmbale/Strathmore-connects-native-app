import React, { useEffect, useState } from "react"

const LogoutContext = React.createContext();

const LogoutConextProvider = ({ children }) => {

  const [error, setError] = useState('')

  useEffect(() => {


  }, [])

  return (
    <LogoutContext.Provider value={{ error }}>
      {children}
    </LogoutContext.Provider>
  )
}

export { LogoutConextProvider, LogoutContext }
