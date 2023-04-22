import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import { PostsConextProvider } from './global/PostsContext';
import { CommunityContextProvider } from './global/CommunityContext';
import CommunityScreen from './screens/CommunityScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { LogoutConextProvider } from './global/LogoutContext';
import { LoginConextProvider } from './global/LoginContext';
import { SignupContextProvider } from './global/SignupContext';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <PostsConextProvider>
      <CommunityContextProvider>
        <LogoutConextProvider>
          <LoginConextProvider>
            <SignupContextProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Post" component={PostScreen} />
                <Stack.Screen name="Community" component={CommunityScreen} />
              </Stack.Navigator>
            </NavigationContainer>
            </SignupContextProvider>
          </LoginConextProvider>
        </LogoutConextProvider>
      </CommunityContextProvider>
    </PostsConextProvider>
  );
}

