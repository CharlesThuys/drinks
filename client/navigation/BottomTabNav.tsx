import {
  Octicons,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Games, Events } from '@/screens';
import { useTheme, Layout } from '@ui-kitten/components';


const Tab = createBottomTabNavigator();


const BottomTabNav = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: { 
        borderTopColor: '#21222d',
        backgroundColor: '#0d0e19',
        elevation: 0,   // for Android
        shadowOffset: {
          width: 0, height: 0, // for iOS
        },
        
      },
    }}>
        <Tab.Screen
        name='Events'
        component={Events}
        options={{
          headerTitleStyle: { color: 'transparent' },
          headerBackground: () => {
            return (
              <Layout style={{ flex: 1, backgroundColor: '#0d0e19' }} />
            );
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign 
              name='calendar'
              size={24}
              color={focused ? theme['color-primary-500'] : 'white'}
              />
            );
          },
        }}
        />
        <Tab.Screen
        name='Home'
        component={Home}
        options={{
          headerTitleStyle: { color: 'transparent' },
          headerBackground: () => {
            return (
              <Layout style={{ flex: 1, backgroundColor: '#0d0e19' }} />
            );
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
                <Octicons
                name='home'
                size={24}
                color={focused ? theme['color-primary-500'] : 'white'}
                />
            );
          },
        }}
        />
        <Tab.Screen
        name='Games'
        component={Games}
        options={{
          headerTitleStyle: { color: 'transparent' },
          headerBackground: () => {
            return (
              <Layout style={{ flex: 1, backgroundColor: '#0d0e19' }} />
            );
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons 
                name='dice-6-outline'
                size={24}
                color={focused ? theme['color-primary-500'] : 'white'}
              />
            );
          },
        }}
      />
      
    </Tab.Navigator>
  );
};

export default BottomTabNav;