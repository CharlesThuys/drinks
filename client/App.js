import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '@/screens/home';
import BottomTabNav from '@/navigation/BottomTabNav';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as theme } from '@/assets/custom-theme.json';
import { AddEvent, AddGame, Event, Game } from '@/screens';
import EventProvider from './context/eventContext';
import GameProvider from './context/gameContext';
import Header from './components/header';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GameProvider>
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
                  header: () => <Header />,
                }}
              />
              <Stack.Screen
                name="Event"
                component={Event}
                options={{
                  header: () => <Header />,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="Game"
                component={Game}
                options={{
                  header: () => <Header />,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="AddGame"
                component={AddGame}
                options={{
                  header: () => <Header />,
                  headerBackVisible: false,
                }}
              />
              <Stack.Screen
                name="AddEvent"
                component={AddEvent}
                options={{
                  header: () => <Header />,
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
    </GameProvider>
  );
}
