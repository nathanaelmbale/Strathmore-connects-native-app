import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../global/LoginContext';

const SettingScreen = () => {
  const navigation = useNavigation()
  const [user, setUser] = useState()
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [success, setSuccess] = useState('')
  const [visible, setVisible] = useState(false)
  const [fail, setFail] = useState(false)

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = () => {
    const logout = async () => {
      try {
        // Set 'user' value to null in AsyncStorage
        await AsyncStorage.removeItem('user');
        console.log('User logged out successfully');
        navigation.navigate('Login')
        // Perform additional logout actions here
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }

    logout();
  }


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
      setVisible(true)

    }
  }

  const changeUserPassoword = async () => {
    const user = await AsyncStorage.getItem('user')
    const UserObj = JSON.parse(user)

    try {
      const response = await fetch('http://192.168.100.200:9000/user/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: UserObj.email, password: newPassword })
      })
      const json = await response.json()
  
      
  
      if (response.ok) {
        setNewPassword("")
        setPassword("")
        setSuccess("Updated succesfully")
      }
    } catch (error) {
      setFail(error)
    }

  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue) {
          const userObj = JSON.parse(jsonValue);
          setUser(userObj);
        }


      } catch (error) {
        // Handle error
        console.error('Error fetching user data from AsyncStorage:', error);
      }

    };

    fetchUserData();
  }, [user]);

  const confirmPassword = async () => {
    console.log("Hi")
    const user = await AsyncStorage.getItem('user')
    const UserObj = JSON.parse(user)
    const email = UserObj.email
    await login(email, password)
    console.log(error)

  }
  return (
    <View>
      <View className="m-5 items-center bg-white ">
        <View className="w-80 text-center rounded-lg p-5 ">
          <View className='flex flex-row justify-between'>
            <View>
              <Text className="font-semibold shadow-md text-2xl">Log out of your account</Text>
              <Text className="text-xl mt-4">Name: {user && user.name}</Text>
              <Text className="text-xl">Email: {user && user.email}</Text>
            </View>
            <Image
              source={{
                uri: 'https://links.papareact.com/wru'
              }}
              className="bg-slate-400 w-10 h-10 rounded-full"
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            className="bg-red-500 hover:bg-red-400 w-80 m-5 text-white font-bold py-3.5 px-6 rounded"
            onPress={handleLogout}>
            <Text className="text-center">Logout</Text>
          </TouchableOpacity>
        </View>

      </View>

      <View className="m-5 items-center bg-white ">
        <View className="w-80 rounded-lg ">
        <Text className="font-semibold shadow-md text-2xl text-center">Change password</Text>
         
          <View className=''>

            <TextInput
              className="bg-gray-100 my-3 p-2 rounded-md "
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

        </View>
        <View>
          <TouchableOpacity
            className="bg-blue-500 hover:bg-blue-400 w-80 m-3 text-white font-bold py-3 px-6 rounded"
            onPress={confirmPassword}>
            <Text className="text-center text-white">Confirm password</Text>
          </TouchableOpacity>
        </View>

        {error ?
          <View className='bg-red-300 rounded p-3 m-2'>
            <Text className='text-red-900 w-80'>{error}</Text>
          </View> :
          null}
        {visible ?
          <View>
            <Text className='text-2xl text-center'>New passowrd</Text>
            <TextInput
              className="bg-gray-100 my-3 p-2 mx-2 rounded-md w-80 "
              placeholder="Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />

            <TouchableOpacity
              className="bg-red-500 hover:bg-red-400 w-80 m-3 text-white font-bold py-3 px-6 rounded"
              onPress={changeUserPassoword}
              placeholder="new password">
              <Text className="text-center text-white">Change password</Text>
            </TouchableOpacity>

            {fail ?
          <View className='bg-green-300 rounded p-3 m-2'>
            <Text className='text-green-900 w-80'>{fail}</Text>
          </View> :
          null}
          
            {success ?
          <View className='bg-green-300 rounded p-3 m-2'>
            <Text className='text-green-900 w-80'>{success}</Text>
          </View> :
          null}
          </View>
        :null}

    </View>
    </View >
  )
}

export default SettingScreen