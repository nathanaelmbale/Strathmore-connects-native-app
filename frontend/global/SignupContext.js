import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupContext = React.createContext();

const SignupContextProvider = ({ children }) => {

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(null)

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    console.log(JSON.stringify({ name, email, password }));

    const response = await fetch('http://192.168.100.200:9000/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
      console.log("Here", json.message);
      return
    }

    if (response.ok) {

      // Update the auth context
      setIsLoading(false);
      // Save the user data to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(json));


    }
  }

  return (
    <SignupContext.Provider value={{ signup, isLoading, error }}>
      {children}
    </SignupContext.Provider>
  )
}

export { SignupContextProvider, SignupContext };
