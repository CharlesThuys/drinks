import EventProvider from '@/context/eventContext';
import GameProvider from '@/context/gameContext';
import HeaderProvider from '@/context/headerContext';
import { Event, Game, AddGame, AddEvent, Profile, LoginScreen } from '@/screens';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as eva from '@eva-design/eva';
import { default as theme } from '@/assets/custom-theme.json';
import { useAuth } from '@/context/authContext';
import BottomTabNav from './navigation/bottomTabNav';
import RegisterScreen from './screens/register';
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

const Index = () => {
  const { user, loading } = useAuth();


  useEffect(() => {
    const load = async () => {
      await SplashScreen.hideAsync();
    };
    if (!loading) load();
  }, [loading]);

  return (
    <GameProvider>
      <EventProvider>
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
          {!loading ? 
            <NavigationContainer>
              <HeaderProvider>
                <Stack.Navigator
                  initialRouteName='Index'
                >
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
                  {user ? (
                    <Stack.Screen
                      name="Index"
                      component={BottomTabNav}
                      options={{
                        headerShown: false,
                      }}
                    />
                  ) : 
                    <>
                      <Stack.Screen
                        name="Index"
                        component={LoginScreen}
                        options={{
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name="Sign Up"
                        component={RegisterScreen}
                        options={{
                          headerShown: false,
                        }}
                      />
                    </>
                  }
                </Stack.Navigator>
              </HeaderProvider>
            </NavigationContainer>
            : 
            <Stack.Screen
              name="Index"
              component={() => <Layout style={{ height: '100%', width: '100%', backgroundColor: '#0d0e19' }}/>}
              options={{
                headerShown: false,
              }}
            />
          }
        </ApplicationProvider>
      </EventProvider>
    </GameProvider>
  );
};

export default Index;