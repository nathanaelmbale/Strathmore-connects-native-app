import { useNavigation } from '@react-navigation/native';
import React, { useContext, useLayoutEffect } from 'react'
import { Text, View, SafeAreaView, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import Communities from '../components/Communities';
import Posts from '../components/Posts';
import { PostsContext } from '../global/PostsContext';

const HomeScreen = () => {
  const navigation = useNavigation()

  const { posts } = useContext(PostsContext)

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
        className='main-body px-4 h-100'>

        {/* Posts*/}
        {posts && posts.map((post) => (
          <Posts
            key={post._id}
            title={post.title}
            description={post.description}
            imagePath={post.imagePath}
          />
        ))}


      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen