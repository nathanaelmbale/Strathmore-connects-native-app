import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import { PostsContext } from '../global/PostsContext';
import Posts from '../components/Posts';


const CommunityScreen = (props) => {
  const { _id, name, description, communities, accounts } = props.route.params
  const { posts } = useContext(PostsContext)

  const [isUserInCOmmunity, setIsUserInCommunity] = useState()
  const [communityPosts, setCommunityPosts] = useState()

  const user = {
    _id: '64313964a90e871b2c198',
    email: 'nathanael@mbale.com'
  }

  const communityId = _id

  useEffect(() => {
    const isPartOfCommunity = accounts && accounts.includes(user._id)

    if (isPartOfCommunity === true) {
      setIsUserInCommunity(true)
    }

    const manageState = () => {
      //Sets the posts where the communityId matches the url
      const available = posts && posts.filter(post => post.community?.includes(communityId))
      setCommunityPosts(available)
    }

    manageState()
  }, [posts, communityId])

  console.log("Route description", communityPosts && communityPosts.length)
  return (
    <SafeAreaView>
      {/*Navbar */}
      <Navbar />
      <ScrollView
          showsVerticalScrollIndicator={false}
        >

      <View className='p-3'>
        <View key={_id} className='card-body bg-white rounded-lg p-3'>
          <Text className='text-4xl text-blue-900 font-semibold'>{name}</Text>
          <Text className=' '>{description}</Text>
        </View>

          {communityPosts && communityPosts.map((post) => (
            <>
              <Posts
                key={post._id}
                imagePath={post.imagePath}
                title={post.title}
                description={post.description}
                post={post}
              />
            </>
          ))}
        
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CommunityScreen