import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);


    return (
        <View className='max-w-md  bg-white mt-4 rounded-lg'>
            <Text className='text-2xl font-bold my-4 text-center'>Post form</Text>
            <View className='mx-4'>
                <Text className='text-sm my-2'>Image(optional)</Text>
                <TextInput
                    className=' bg-gray-200 p-1.5  rounded'
                    placeholder='Input Your image'
                />
            </View>

            <View className='mx-4'>
                <Text className='text-sm my-2'>Title:</Text>
                <TextInput
                    className=' bg-gray-200 p-1.5  rounded'
                    placeholder='Input The title of your post'
                />
            </View>

            <View className='mx-4'>
                <Text className='text-sm my-2'>Description:</Text>
                <TextInput
                    className=' bg-gray-200 p-1.5  rounded'
                    placeholder='Input description about your post'
                />
            </View>


            <View className='m-4 ' >
                <Button title="Submit" />
            </View>
        </View>
    );
};

export default PostForm;
