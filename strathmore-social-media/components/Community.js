import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Community = ({ communityName }) => {
  return (
    <TouchableOpacity>
      <Text className='bg-gray-200 rounded mx-0.5 p-2'>{communityName}</Text>
    </TouchableOpacity>
  )
}

export default Community