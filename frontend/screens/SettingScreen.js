import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SettingScreen = () => {
  const navigation = useNavigation()
  const [user, setUser] = useState()

  const handleLogout = () => {
    const logout = async () => {
      try {
        // Set 'user' value to null in AsyncStorage
        await AsyncStorage.removeItem('user');
        console.log('User logged out successfully');
        navigation.navigate('Login')
        // Perform additional logout actions here
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }

    logout();
  }
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user');
        if (jsonValue) {
          const userObj = JSON.parse(jsonValue);
          setUser(userObj);
        }


      } catch (error) {
        // Handle error
        console.error('Error fetching user data from AsyncStorage:', error);
      }

    };

    fetchUserData();
  }, [user]);

  return (
    <View className="m-5 items-center bg-white ">
      <View className="w-80 text-center rounded-lg p-5 ">
        <View className='flex flex-row justify-between'>
          <View>
            <Text className="font-semibold shadow-md text-2xl">Log out of your account</Text>
            <Text className="text-xl mt-4">Name: {user && user.name}</Text>
            <Text className="text-xl">Email: {user && user.email}</Text>
          </View>
          <Image
            source={{
              uri: 'https://links.papareact.com/wru'
            }}
            className="bg-slate-400 w-10 h-10 rounded-full"
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          className="bg-red-500 hover:bg-red-400 w-80 m-5 text-white font-bold py-3.5 px-6 rounded"
          onPress={handleLogout}>
          <Text className="text-center">Logout</Text>
        </TouchableOpacity>
      </View>

    </View>

  )
}

export default SettingScreen