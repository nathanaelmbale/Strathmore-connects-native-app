import { View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect ,useContext } from 'react'
import { LoginContext } from '../global/LoginContext'
import { useNavigation } from '@react-navigation/native'
import {
  UserIcon,
  LockClosedIcon
} from 'react-native-heroicons/outline'


const LoginScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login ,error ,isLoading } = useContext(LoginContext)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Log in",
      headerShown: false
    })
  }, [])

  const LoginUser = () => {
    // You can access the captured values in the state variables (name, email, password) here
    login(email ,password)

  }

  return (
    <SafeAreaView className='bg-white p-2'>
      <View className="bg-white flex justify-center items-center h-screen">
        <View className="bg-white p-8 rounded-lg w-full">
          <Text className="text-center text-2xl font-bold mb-4">Log in  form</Text>

          <View className='flex flex-row'>
            <View className='mt-2 mx-1'>
              <UserIcon size={25} color='#000' fill="#000" />
            </View>
            <TextInput
              className="flex-1 bg-gray-100 mb-3 p-2 rounded-md"
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className='flex flex-row'>
            <View className='mt-2 mx-1'>
              <LockClosedIcon size={25} color="#000" />
            </View>

            <TextInput
              className="bg-gray-100 mb-3 p-2 rounded-md flex-1"
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          {/**Button */}
          <TouchableOpacity
            onPress={LoginUser}
            className="bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold m-2  py-3.5 px-6">
            <Text className=" text-white text-center">Log in</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-center mt-0">
            <Text className="text-base">Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                // Navigate to the login screen
                navigation.navigate('Signup')
                console.log('Navigate to Sign up screen');
              }}
              className="ml-1 text-blue-500 underline">
              <Text className="text-blue-500 underline">Sign up</Text>
            </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen