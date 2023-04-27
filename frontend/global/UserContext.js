import React, { useState } from "react"
import { AsyncStorage } from 'react-native'


const UserContext = React.createContext();

const UserConextProvider = ({ children }) => {

  const [error, setError] = useState('')
  const [user, setUser] = useState(null)


  const logout = async () => {
    try {
      // Set 'user' value to null in AsyncStorage
      await AsyncStorage.removeItem('user');
      console.log('User logged out successfully');
      // Perform additional logout actions here
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <UserContext.Provider value={{ 
      error,
      logout 
      }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserConextProvider, UserContext }
