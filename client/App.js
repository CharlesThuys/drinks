import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/screens/home';
import BottomTabNav from '@/navigation/BottomTabNav';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { default as theme } from '@/assets/custom-theme.json';
import { Event } from '@/screens';
import EventProvider from './context/eventContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <EventProvider>
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='BottomTabNavigation'
          >
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Event"
              component={Event}
              options={{
                headerShown: true,
                headerTitleStyle: { color: 'transparent' },
                headerBackground: () => {
                  return (
                    <Layout style={{ flex: 1, backgroundColor: '#0d0e19' }} />
                  );
                },  
                headerBackVisible: false,
              }}
            />
            <Stack.Screen
              name="BottomTabNavigation"
              component={BottomTabNav}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </EventProvider>
  );
}
