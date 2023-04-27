import { View, Text, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useLayoutEffect, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import { SignupContext } from '../global/SignupContext'
import {
  UserIcon,
  LockClosedIcon
} from 'react-native-heroicons/outline'


const SignupScreen = () => {
  const { signup, error, isLoading } = useContext(SignupContext)

  const navigation = useNavigation()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      navigation.navigate('Home')
      console.log("sign up name :" +user.name)
      console.log("sign up email :" +user.email)
    }
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue) {
          const userObj = JSON.parse(jsonValue);
          setUser(userObj);
        }

        if (user !== null) {
          navigation.navigate('Home')
        }
      } catch (error) {
        // Handle error
        console.error('Error fetching user data from AsyncStorage:', error);
      }

      if (user) navigation.navigate('Home')
    };

    fetchUserData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Sign up",
      headerShown: false
    })
  }, [])


  const SignupUser = async () => {
    await signup(name, email, password)

    await new Promise(resolve => setTimeout(resolve, 300)); // You can adjust the delay time as needed
  
    console.log(user)
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

          {/**Button */}
          <TouchableOpacity
            onPress={SignupUser}
            className="bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold m-2  py-3.5 px-6">
            <Text className=" text-white text-center">Sign up</Text>
          </TouchableOpacity>

          {error ?
            <View className='bg-red-300 rounded p-3 m=2'>
              <Text className='text-red-900'>{error}</Text>
            </View> :
            null}
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