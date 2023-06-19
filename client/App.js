import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/screens/home';
import BottomTabNav from '@/navigation/BottomTabNav';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '@/assets/custom-theme.json';
import { AddEvent, AddGame, Event, Game, Profile } from '@/screens';
import EventProvider from './context/eventContext';
import GameProvider from './context/gameContext';
import HeaderProvider from './context/headerContext';
import Header from './components/header';
import { View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
      <GameProvider>
        <EventProvider>
          <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
            <NavigationContainer>
            <HeaderProvider>
              <Stack.Navigator
                initialRouteName='BottomTabNavigation'
              >
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    header: () => <Header />,
                  }}
                />
                <Stack.Screen
                  name="Event"
                  component={Event}
                  options={{
                    header: () => <View style={{ height: 60, backgroundColor: '#0d0e19' }}></View>,
                    headerBackVisible: false,
                  }}
                />
                <Stack.Screen
                  name="Game"
                  component={Game}
                  options={{
                    header: () => <View style={{ height: 60, backgroundColor: '#0d0e19' }}></View>,
                    headerBackVisible: false,
                  }}
                />
                <Stack.Screen
                  name="AddGame"
                  component={AddGame}
                  options={{
                    header: () => <View style={{ height: 60, backgroundColor: '#0d0e19' }}></View>,
                    headerBackVisible: false,
                  }}
                />
                <Stack.Screen
                  name="AddEvent"
                  component={AddEvent}
                  options={{
                    header: () => <View style={{ height: 60, backgroundColor: '#0d0e19' }}></View>,
                    headerBackVisible: false,
                  }}
                />
                <Stack.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                    header: () => <View style={{ height: 60, backgroundColor: '#0d0e19' }}></View>,
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
              </HeaderProvider>
            </NavigationContainer>
          </ApplicationProvider>
        </EventProvider>
      </GameProvider>
    
  );
}
