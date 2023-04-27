import React, { useEffect, useLayoutEffect } from 'react'
import { Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Communities from '../components/Communities';
import { BellIcon } from 'react-native-heroicons/outline'

const Navbar = () => {
    const navigation = useNavigation()
    const [notifications, setNotifications] = useState(0)
    const [visible, setVisble] = useState(false)

    //replacement for useEffect
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "Posts",
            headerShown: false
        })
    }, [])

    useEffect(() => {
        //import Async storage
        const getUser = async () => {
            const user = await AsyncStorage.getItem('user')
            const UserObj = JSON.parse(user)
            setNotifications(UserObj.notification)

        }
    })

    return (
        <View className=' bg-white drop-shadow-sm'>
            <View className='flex-row pb-3 items-center mt-9 px-4 space-x-2'>
                <Image source={{
                    uri: 'https://links.papareact.com/wru'
                }}
                    className="bg-slate-400 w-10 h-10  rounded-full"
                />
                <View className="flex-1">
                    <Text className='font-bold text-3xl'>Strath connects</Text>
                    <Text className='font-bold text-gray-400 text-xs'>Nathanael</Text>

                </View>
                <BellIcon size={30} color="#000" />

                <TouchableOpacity className='rounded-full bg-red-500 text-black text-xs px-2 py-1 absolute top-5 right-1 '>
                    {notifications}
                </TouchableOpacity>

            </View>

            {visible === false ?
                <View className='bg-white p-2 m-2 flex flex-col'>
                    {notifications && notifications.map((notification) => (
                        <View className='rounded shadow-md m-1'>
                            <Text className='text-lg m-2'>{notification.title}</Text>
                            <Text className='text-sm m-1.5'>{notification.description}</Text>
                        </View>
                    ))}
                </View>
                : null}
            {/*Seach bar */}
            <View className='bg-white flex-row items-center pb-3 px-4'>
                <View className='flex-row flex-1 space-x-2 bg-gray-200 p-2'>
                    <TextInput
                        placeholder='Search for community'
                        keyboardType='default'
                        className='text-xl'
                    />

                </View>
                {/**Button */}
                <View
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold  py-3.5 px-6 
       ">
                    <Text className=" text-white text-center">Search</Text>
                </View>


            </View>

            {/**Communities */}
            <View className='pl-3.5 pb-3.5'>
                <Communities />
            </View>

        </View>
    )
}

export default Navbar