import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Community from './Community'

const Communities = () => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <View className='flex-row'>
                <Community communityName='All students' />
                <Community communityName='Congolese community' />
                <Community communityName='Tanzanian community' />
                <Community communityName='Sports and clubs community' />
                <Community communityName='Praise and worship team' />
                <Community communityName='Jobs and leads' />
            </View>
        </ScrollView>
    )
}

export default Communities