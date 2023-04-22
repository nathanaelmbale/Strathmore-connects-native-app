import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native'

const Community = ({ 
  _id ,
  name ,
  description
 }) => {
  const navigation = useNavigation()
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Community', { _id, name, description})}>
      <Text className='bg-gray-200 rounded mx-0.5 p-2'>{name}</Text>
    </TouchableOpacity>
  )
}

export default Community
