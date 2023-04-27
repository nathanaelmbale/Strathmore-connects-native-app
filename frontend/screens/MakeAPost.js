import { View, Text ,TextInput } from 'react-native'
import React from 'react'

const MakeAPost = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const makeAPost = async () => {
        const user = await AsyncStorage.getItem('user')
        const UserObj = JSON.parse(user)

        try {
            const response = await fetch('http://192.168.100.200:9000/post', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${UserObj.token}`
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    category: "comment",
                    email: UserObj.email,
                    user_id: UserObj._id ,
                    community: _id
                })
            })
            const json = await response.json();
            console.log("Post made",json.post)
            const newPost  =JSON.stringify(json.post)
            //add to the array  of posts
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <View>
    {/*Change this*/}
    <TextInput placeholder='title'  onChange={(e) => setTitle(e.target.value)}></TextInput>
    <TextInput placeholder='description'  onChange={(e) => setDescription(e.target.value)}></TextInput>
    <View className='bg-blue-700 py-3.5 px-2.5'>
        <Text onPress={() => makeAPost()}>Post to community</Text>
    </View>
</View>
  )
}

export default MakeAPost