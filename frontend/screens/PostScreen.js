import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { PostsContext } from '../global/PostsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const PostScreen = (props) => {
  const { post } = props.route.params
  const { comments, getComments, updateComments } = useContext(PostsContext)
  const [comment, setComment] = useState('')
  const navigation = useNavigation()

  const imagePath = post.imagePath
  const title = post.title
  const description = post.description
  const post_id = post._id
  let user = null

  useEffect(() => {
    getComments(post_id)
    //console.log("Comments",comments)

    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        //console.log("json",jsonValue)
        if (jsonValue) {
          const userObj = JSON.parse(jsonValue);
          user = userObj;
        }
        else {
          navigation.navigate('Login');
        }
      } catch (error) {
        // Handle error
        console.error('Error fetching user data from AsyncStorage:', error);
      }
    };

    fetchUserData()
    console.log("current user", user)
  }, [user]);

  const makeAComment = async () => {
    e.preventDefault()


    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const userObj = JSON.parse(jsonValue)

      const response = await fetch('/post/comment', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userObj.token}`
        },
        body: JSON.stringify({
          id: post._id,
          comment: comment,
          user: userObj.email
        })
      })
      const json = await response.json();
      setComment("")

      //console.log("commentsss", json)//--the creators notification
      dispatchComments({ type: 'SET_COMMENTS', payload: json })

      if (json && user.email !== post.email) {
        notifyUser()
      }

    } catch (error) {
      console.log(error);
    }
  }


  const deleteComment = async (commentId) => {
    console.log("Comment", commentId)

    try {
      const jsonValue = await AsyncStorage.getItem('user');
      const userObj = JSON.parse(jsonValue)

      const response = await fetch('http://192.168.100.200:9000/post/uncomment', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userObj.token}`
        },
        body: JSON.stringify({ postId: post._id, commentId })
      })
      const json = await response.json()





      //delete the comment from the user notification
      if (json.message === "Comment deleted successfully") {

        try {
          const request = {
            email: post.email,
            notificationId: post._id
          }

          const response = await fetch('/user/notification/delete', {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(request)
          })
          await response.json()
          //("deleted notification", json)
        } catch (error) {
          console.log(error);
        }
      }

      if (response.ok) {
        await updateComments(json.comments);
        console.log("updated meessage   ", json.message)
        console.log("updated comments", json.comments)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className='card p-4'>
      {imagePath ?
        <View className="image">
          <Image source={{
            uri: imagePath
          }}
            className="bg-slate-400 w-100 h-52 rounded-t-lg"
          />
        </View>
        : null}


      <View className='card-body bg-white  rounded-b-lg '>
        <View className=' px-3 py-2'>
          <Text className='font-semibold text-3xl'>{title}</Text>
          <Text className='text-gray-700 text-base mb-5'>
            {description}
          </Text>
        </View>
        {comments && comments.length > 0 ? <Text className='ml-3 font-bold text-lg'>Comments</Text> : null}
        {comments && comments.map((comment) => (
          <View key={comment._id} className='flex-row items-center px-3 py-2'>
            <View className='flex-1 flex-col'>
              <Text className='text-lg' > {comment.comment}</Text>
              <Text className='text-xs text-gray-400 ml-1'>comment by {comment.user}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteComment(comment._id)} className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-1 rounded">
              <Text
                className=" text-white text-center"
              >
                Delete comment</Text>
            </TouchableOpacity >
          </View>


        ))}

      </View>
    </View>
  )
}

export default PostScreen