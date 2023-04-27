import { View, Text } from 'react-native'
import React, { useState } from 'react'

const ChangePassword = () => {
    const [currentPassowrd, setCurrentPassowrd] = useState("")
    const [newPassowrd, setNewPassowrd] = useState("")
    const [isAproved, setIsApproved] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    const changeUserPassoword = async () => {
        const user = await AsyncStorage.getItem('user')
        const UserObj = JSON.parse(user)
        setError('')

        const response = await fetch('http://192.168.100.200:9000/user/password', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: UserObj.email, password: newPassowrd })
        })
        const json = await response.json()

        setSuccess(JSON.stringify(json.message))
        if (json) {
            setCurrentPassowrd("")
            setNewPassowrd("")
        }
    }

    const confirmPassword = async () => {
        setIsLoading(true)
        setError('')

        const user = await AsyncStorage.getItem('user')
        const UserObj = JSON.parse(user)

        const response = await fetch('http://192.168.100.200:9000/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: UserObj.email, password: currentPassowrd })
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            setIsLoading(false)
            setIsApproved(true)
        }
        console.log(error)
    }

    return (
        <View>
            <Text>ChangePassword</Text>
            <View className='m-2'>
                <TextInput
                    className="bg-gray-100 mb-3 p-2 rounded-md flex-1"
                    placeholder="Password"
                    secureTextEntry
                    value={currentPassowrd}
                    onChangeText={setCurrentPassowrd}
                />

                <View className='bg-blue-700 py-3.5 px-2.5'>
                    <Text onPress={() => confirmPassword()}>Confirm password</Text>
                </View>
            </View>
            {isAproved && isAproved(
                <View>
                    <Text className='bg-green-400 text-green-900 py-3.5 px-1.5 m-2'>{success}</Text>
                    <TextInput
                        className="bg-gray-100 mb-3 p-2 rounded-md flex-1"
                        placeholder="New password"
                        secureTextEntry
                        value={newPassowrd}
                        onChangeText={setNewPassowrd}
                    />
                    <View className='bg-blue-700 py-3.5 px-2.5'>
                        <Text onPress={() => changeUserPassoword()}>Change password</Text>
                    </View>
                </View>
            )}
            {error && error ?
                <Text>{error}</Text>
                : null}
        </View>
    )
}

export default ChangePassword