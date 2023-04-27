import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import { PostsConextProvider } from './global/PostsContext';
import { CommunityContextProvider } from './global/CommunityContext';
import CommunityScreen from './screens/CommunityScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { LoginConextProvider } from './global/LoginContext';
import { SignupContextProvider } from './global/SignupContext';
import SettingScreen from './screens/SettingScreen';
import { UserConextProvider } from './global/UserContext';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <PostsConextProvider>
      <CommunityContextProvider>
          <LoginConextProvider>
            <SignupContextProvider>
              <UserConextProvider>
                <NavigationContainer>
                  <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Settings" component={SettingScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Post" component={PostScreen} />
                    <Stack.Screen name="Community" component={CommunityScreen} />
                  </Stack.Navigator>
                </NavigationContainer>
              </UserConextProvider>
            </SignupContextProvider>
          </LoginConextProvider>
      </CommunityContextProvider>
    </PostsConextProvider>
  );
}

