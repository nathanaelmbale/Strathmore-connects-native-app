import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'

const Posts = ({
  imagePath,
  title,
  description,
  post
}) => {
  const navigation = useNavigation()

  return (
<View className='my-4 max-h-96'>
{imagePath ?
        <View className="img">
          <Image source={{
            uri: imagePath
          }}
            className="bg-slate-400 h-52 rounded-t-lg list-image-none"
          />
        </View>
        : null}



      <View className='bg-white p-3 rounded-b-lg'>
        <Text className='font-semibold text-3xl'>{title}</Text>
        <Text className='text-gray-700 text-base mb-5'>
          {description}
        </Text>
        <TouchableOpacity className="button bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-2 rounded">
          <Text
            className=" text-white text-center"
            onPress={() => navigation.navigate('Post', { post })}
          >
            View Post</Text>
        </TouchableOpacity>
      </View>
</View>

  )
}

export default Posts

{/**
    <View className='card  my-4'>
      {imagePath ?
        <View className="img">
          <Image source={{
            uri: imagePath
          }}
            className="bg-slate-400 rounded-t-lg list-image-none"
          />
        </View>
        : null}



      <View className='bg-white p-3 rounded-b-lg'>
        <Text className='font-semibold text-3xl'>{title}</Text>
        <Text className='text-gray-700 text-base mb-5'>
          {description}
        </Text>
        <TouchableOpacity className="button bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-2 rounded">
          <Text
            className=" text-white text-center"
            onPress={() => navigation.navigate('Post', { post })}
          >
            View Post</Text>
        </TouchableOpacity>
      </View>
    </View>
*/}