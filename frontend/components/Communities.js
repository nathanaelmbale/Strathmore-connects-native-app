import { View, Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import Community from './Community'
import { CommunitiesContext } from '../global/CommunityContext'

const Communities = () => {
    const { communities } = useContext(CommunitiesContext)
    console.log("Community context" ,communities)
    console.log()
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <View className='flex-row'>
                {communities && communities.map((community)=> (
                <Community communityName={community.name} key={community._id} />
            ))}
            </View>

        </ScrollView>
    )
}

export default Communities