import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Community = ({ communityName }) => {
  return (
    <TouchableOpacity>
      <View key={key}>
        <Text className='bg-gray-200 rounded mx-0.5 p-2'>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Community