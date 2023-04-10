import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Posts = ({
  imagePath,
  title,
  description
}) => {
  return (
    <View className='card  my-4'>
      {imagePath?
      <View className="image">
      <Image source={{
        uri: imagePath
      }}
        className="bg-slate-400 w-100 h-52 rounded-t-lg"
      />
    </View> 
    :null }
      

      <View className='card-body bg-white p-3 rounded-b-lg'>
        <Text className='font-semibold text-3xl'>{title}</Text>
        <Text className='text-gray-700 text-base mb-5'>
          {description}
        </Text>
        <TouchableOpacity className="button bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-2 rounded">
          <Text 
          className=" text-white text-center"
           >
            View Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Posts