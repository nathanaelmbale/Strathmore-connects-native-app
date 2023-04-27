import { Text, TextInput, View } from 'react-native'
import React, { Component, useState } from 'react'
import AsyncStorage from ''//change this

const makeComment = () => {
    const [comment, setComment] = useState('')

    const makeAComment = async () => {
        const user = await AsyncStorage.getItem('user')
        const UserObj = JSON.parse(user)

        try {
            const response = await fetch('http://192.168.100.200:9000/post/comment', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${UserObj.token}`
                },
                body: JSON.stringify({
                    _id: post._id,
                    comment: comment,
                    user: UserObj.email})
            })
            const json = await response.json();
            console.log("comment created",json)
            setComment("")
            const newComments =JSON.stringify(json)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            {/*Change this*/}
            <TextInput placeholder='comment here'  onChange={(e) => setComment(e.target.value)}></TextInput>
            <View className='bg-blue-700 py-3.5 px-2.5'>
                <Text onPress={() => makeAComment()}>Comments</Text>
            </View>
        </View>
    )
}

export default makeComment