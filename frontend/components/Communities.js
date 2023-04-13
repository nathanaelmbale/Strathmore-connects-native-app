import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const Communities = ({
    name
}) => {
    return (
        <View>
            <Text className='bg-gray-200 rounded mx-0.5 p-2'>{name}</Text>
            </View>
    )
}

export default Communities

