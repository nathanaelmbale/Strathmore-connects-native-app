import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useLayoutEffect } from 'react'
import { SafeAreaView, View, Text, ScrollView } from 'react-native'
import Posts from '../components/Posts';
import { PostsContext } from '../global/PostsContext';
import Navbar from '../components/Navbar';

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

  useEffect(() => {
    const fetchUserData = async () => {
      console.log("this");
      try {
        const jsonValue = await AsyncStorage.getItem('user');

        if (!jsonValue) {
          navigation.navigate('Login');
        } 
      } catch (error) {
        // Handle error
        console.error('Error fetching user data from AsyncStorage:', error);
      }
    };

    fetchUserData()
  }, []);


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
            _id= {post._id}
            post={post}
          />
        ))}

      </ScrollView>

    </SafeAreaView>

  )
}

export default HomeScreen
