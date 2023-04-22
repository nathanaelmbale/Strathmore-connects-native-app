import { View, Text, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import Community from './Community'
import { CommunitiesContext } from '../global/CommunityContext'

const Communities = () => {
    const { communities } = useContext(CommunitiesContext)
    //console.log("Community context", communities)
    console.log()
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <View className='flex-row'>
                {communities && communities.map((community) => (
                    <Community
                        key={community._id}
                        _id={community._id}
                        name={community.name}
                        description={community.description}
                        communities = {communities}
                        accounts ={community.accounts} />
                ))}
            </View>

        </ScrollView>
    )
}

export default Communities