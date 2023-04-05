import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import Communities from '../components/Communities';
import Posts from '../components/Posts';
import PostForm from '../components/PostForm';

const HomeScreen = () => {
  const navigation = useNavigation()
  //replacement for useEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Posts",
      headerShown: false
    })
  }, [])
  return (
    <SafeAreaView>
      {/* Headers*/}
      <View className=' bg-white drop-shadow-sm'>
        <View className='flex-row pb-3 items-center mt-9 px-4 space-x-2'>
          <Image source={{
            uri: 'https://links.papareact.com/wru'
          }}
            className="bg-slate-400 w-10 h-10  rounded-full"
          />
          <View className="flex-1">
            <Text className='font-bold text-3xl'>Strah connects</Text>
            <Text className='font-bold text-gray-400 text-xs'>Nathanael</Text>
          </View>


        </View>

        {/*Seach bar */}
        <View className='bg-white flex-row items-center pb-3 px-4'>
          <View className='flex-row flex-1 space-x-2 bg-gray-200 p-2'>
            <TextInput
              placeholder='Search for community'
              keyboardType='default'
              className='text-xl'
            />

          </View>
          {/**Button */}
          <View
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold  py-3.5 px-6 
           ">
            <Text className=" text-white text-center">Search</Text>
          </View>


        </View>
        {/**Communities */}
        <View className='pl-3.5 pb-3.5'>
          <Communities />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className='main-body px-4 '>
        <PostForm />

        {/* Posts*/}
        <Posts
          imagePath='https://plus.unsplash.com/premium_photo-1679436987388-52ece05745df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
          title='Lets us meet somewhere today'
          description='This is a post amde to invite all students to a meeting happening in the hall at 12.30pm on Friday'
        />
        <Posts
          imagePath='https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
          title='Lets us meet somewhere today'
          description='This is a post amde to invite all students to a meeting 
                      happening in the hall at 12.30pm on Friday'
        />
        <Posts
          imagePath='https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
          title='Lets us meet somewhere today'
          description='This is a post amde to invite all students to a meeting 
                      happening in the hall at 12.30pm on Friday'
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen