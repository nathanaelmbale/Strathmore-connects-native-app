import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Communities from '../components/Communities';
import { BellIcon, Cog8ToothIcon, TrashIcon } from 'react-native-heroicons/outline'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navbar = () => {
  const navigation = useNavigation()
  const [notifications, setNotifications] = useState(0)
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState(false)

  //replacement for useEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Posts",
      headerShown: false
    })
  }, [])


  useEffect(() => {
    //console.log("Actual user", user)
    const getNotifications = async () => {
      const user = await AsyncStorage.getItem('user')
      const UserObj = JSON.parse(user)

        const response = await fetch('http://192.168.100.200:9000/user/notification', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${UserObj.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: UserObj.email })
        })

        const json = await response.json()
        console.log(json)
        setNotifications(json.notifications)

    }


    getNotifications()

}, [])

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  const deleteNotification = async (notification) => {
    setError('')
    const user = await AsyncStorage.getItem('user')
    const UserObj = JSON.parse(user)
    
console.log("here")
    try {
      const response = fetch('http://192.168.100.200:9000/user/notification/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${UserObj.token}`
        },
        body: JSON.stringify({
          email: UserObj.email,
          notificationId: notification._id
        })
      })
console.log("here")
      
      const json = await response.json()
      

      if (response.ok) {
        setNotifications(json.notifications)
      }
      if(!response.ok) setError('Failed')
    } catch (error) {
      console.log(error)
      setError('Failed')
    }


  }

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
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Cog8ToothIcon size={30} color="#000" />
        </TouchableOpacity>
        <BellIcon size={30} color="#000" />
        {notifications && notifications ?
          <TouchableOpacity
            onPress={toggleVisibility}
            className='rounded-full bg-red-500 text-black text-xs px-2 py-1 absolute top-5 right-1 '>
            <Text>{notifications && notifications.length}</Text>
          </TouchableOpacity>
          : null}
      </View>

      {visible === true ?
        <View className='bg-white p-2  mb-4 flex flex-col shadow-lg border-b-0.5'>
          {notifications && notifications.map((notification) => (
            <View key={notification._id} className='rounded  m-1'>
              <View className='flex-row  items-center space-x-2'>
                <Text className='text-xl flex-1 font-bold '>{notification.title}</Text>
                {error?<Text className='text-sm  text-red-600 mx-2'>{error}</Text>:null}
                <TouchableOpacity onPress={() => deleteNotification(notification)}>
                  <View className='bg-red-300 p-1.5 rounded-full'>
                    <TrashIcon size={20} color="#000" />
                  </View>
                </TouchableOpacity>
              </View>
              <Text className='text '>{notification.description}</Text>

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