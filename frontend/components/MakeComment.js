import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


const MakeComment = () => {
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
                    user: UserObj.email
                })
            })
            const json = await response.json();
            console.log("comment created", json)
            setComment("")
            const newComments = JSON.stringify(json)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View className='bg-white'>
            {/*Change this*/}
            <View className='bg-slate-100 mx-5 my-2 py-2.5 rounded-lg'>
                <TextInput
                    className='text-lg mx-5 '
                    placeholder='comment here'
                    onChangeText={setComment}
                    value={comment}                />
            </View>

            <TouchableOpacity className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-1 mx-5 my-2 rounded'>
                <Text className=" text-white text-center" onPress={() => makeAComment()}>Comments</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MakeComment