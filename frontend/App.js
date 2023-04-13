import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import { PostsConextProvider } from './global/PostsContext';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <CommunitiesConextProvider>
    <PostsConextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Post" component={PostScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PostsConextProvider>
    </CommunitiesConextProvider>
  );
}

