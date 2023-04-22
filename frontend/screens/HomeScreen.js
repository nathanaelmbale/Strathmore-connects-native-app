import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useLayoutEffect } from 'react'
import { SafeAreaView, View, Text, ScrollView } from 'react-native'
import Posts from '../components/Posts';
import { PostsContext } from '../global/PostsContext';
import Navbar from '../components/Navbar';

const HomeScreen = () => {
  const navigation = useNavigation()

  const { posts } = useContext(PostsContext)

  const user =null

  //replacement for useEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Posts",
      headerShown: false
    })
  }, [])

  useEffect(() => {
    if (!user) {
      navigation.navigate('Signup')
    }
  })
  return (
    <SafeAreaView className=''>
      {/* Headers*/}
      <Navbar />

      <ScrollView
        showsVerticalScrollIndicator={true}
        className=' px-4 '>

        {/* Posts*/}
        {posts && posts.map((post) => (
          <Posts
            key={post._id}
            title={post.title}
            description={post.description}
            imagePath={post.imagePath}
            post={post}
          />
        ))}

      </ScrollView>

    </SafeAreaView>

  )
}

export default HomeScreen
