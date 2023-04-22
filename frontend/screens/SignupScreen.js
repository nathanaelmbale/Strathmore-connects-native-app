import { View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect ,useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SignupContext } from '../global/SignupContext'
import {
  UserIcon,
  LockClosedIcon
} from 'react-native-heroicons/outline'


const SignupScreen = () => {
  const { signup ,error } = useContext(SignupContext)

  const navigation = useNavigation()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Log in",
      headerShown: false
    })
  }, [])



  const SignupUser = () => {
    // You can access the captured values in the state variables (name, email, password) here
    signup(name ,email ,password)

  }

  return (
    <SafeAreaView className='bg-white p-2'>
      <View className="bg-white flex justify-center items-center h-screen">
        <View className="bg-white p-8 rounded-lg w-full">
          <Text className="text-center text-2xl font-bold mb-4">Sign up form</Text>
          <View className='flex flex-row'>
          <View className='mt-2 mx-1'>
              <UserIcon size={25} color='#000' fill="#000" />
            </View>
          <TextInput
            className="flex-1 bg-gray-100 mb-3 p-2 rounded-md"
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          </View>

          <View className='flex flex-row'>
            <View className='mt-2 mx-1'>
              <UserIcon size={25} color='#000' />
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
          {error (
          <View>
            <Text>{err}</Text>
          </View>)}
          {/**Button */}
          <TouchableOpacity
            onPress={SignupUser}
            className="bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold m-2  py-3.5 px-6">
            <Text className=" text-white text-center">Sign up</Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-center mt-0">
            <Text className="text-base">Already have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                // Navigate to the login screen
                navigation.navigate('Login')
                console.log('Navigate to login screen');
              }}
              className="ml-1 text-blue-500 underline">
              <Text className="text-blue-500 underline">Log in</Text>
            </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen