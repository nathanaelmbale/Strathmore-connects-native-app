import React, { useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginContext = React.createContext();

const LoginConextProvider = ({ children }) => {

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [user ,setUser] = useState('')

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    await AsyncStorage.removeItem('user');
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
      try {
      
        await AsyncStorage.setItem('user', JSON.stringify(json));
        setUser(json);
      } catch (error) {
        console.error('Error setting user to AsyncStorage:', error);
      }
      
      // update loading state
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser !== null) {
          // 'user' value found, you can parse it from JSON if needed
          const parsedUser = JSON.parse(storedUser);
          console.log('User:', parsedUser);
          setUser(parsedUser);
        } else {
          console.log('User not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error getting user from AsyncStorage:', error);
      }
    }
    getUserFromStorage();
  }, [])

  return (
    <LoginContext.Provider value={{ login, isLoading, error, user }}>
      {children}
    </LoginContext.Provider>
  )
}

export { LoginConextProvider, LoginContext }
