import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const PostScreen = (props) => {
  const { post } = props.route.params

  const imagePath = post.imagePath
  const title = post.title
  const description = post.description
  const comments = post.comments

  console.log(comments.length)

  // const makeAComment = async (e) => {
  //   e.preventDefault()

  //   const obj = {
  //     _id: post._id,
  //     comment: comment,
  //     user: user.email
  //   }
  //   try {
  //     const response = await fetch('/post/comment', {
  //       method: "POST",
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${user.token}`
  //       },
  //       body: JSON.stringify(obj)
  //     })
  //     const json = await response.json();
  //     console.log("comment created", {})
  //     setComment("")

  //     //console.log("commentsss", json)//--the creators notification
  //     dispatchComments({ type: 'SET_COMMENTS', payload: json })

  //     if (json && user.email !== post.email) {
  //       notifyUser()
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  // const deleteComment = async (commentId) => {
  //   const obj = {
  //     postId: post._id,
  //     commentId: commentId
  //   }
  //   try {
  //     const response = await fetch('/post/uncomment', {
  //       method: "DELETE",
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${user.token}`
  //       },
  //       body: JSON.stringify(obj)
  //     })
  //     const json = await response.json()
  //     console.log(json)
  //     dispatchComments({ type: 'SET_COMMENTS', payload: json.comment })

  //     //delete the comment from the user notification
  //     if (json.message === "Comment deleted successfully") {
  //       console.log("email", post)
  //       try {
  //         const request = {
  //           email: post.email,
  //           notificationId: postId
  //         }

  //         const response = await fetch('/user/notification/delete', {
  //           method: "DELETE",
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${user.token}`
  //           },
  //           body: JSON.stringify(request)
  //         })
  //         await response.json()
  //         //("deleted notification", json)
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
        {comments.length > 0 ? <Text className='ml-3 font-bold text-lg'>Comments</Text> : null}
        {comments && comments.map((comment) => (
          <View className='flex-row items-center px-3 py-2'>
            <View className='flex-1 flex-col'>
              <Text className='text-lg' key={comment._id}> {comment.comment}</Text>
              <Text className='text-xs text-gray-400 ml-1'>comment by {comment.user}</Text>
            </View>
            <TouchableOpacity className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-1 rounded">
              <Text
                className=" text-white text-center"
                onPress={() => navigation.navigate('Post', { post })}
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