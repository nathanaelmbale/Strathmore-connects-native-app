import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';


const HomeScreen = () => {
  const navigation = useNavigation()
  //replacement for useEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Posts",
      headerShown: true
    })
  }, [])
  return (
    <SafeAreaView>
      <View className='mx-4'>
        <View className='card  my-3'>
          <View className="">
            <Image source={{
              uri: 'https://plus.unsplash.com/premium_photo-1679436987388-52ece05745df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
            }}
              className="bg-slate-400 w-100 h-52 rounded-t-lg"
            />
          </View>

          <View className='card-body bg-white p-3 rounded-b-lg'>
            <Text className='font-semibold text-3xl'>Lets us meet somewhere today</Text>
            <Text className='text-gray-700 text-base mb-5'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </Text>
            <View className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-2 rounded">
              <Text className=" text-white text-center">View Post</Text>
            </View>
          </View>
        </View>



      </View>
    </SafeAreaView>
  )
}

export default HomeScreen