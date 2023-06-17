import {
  Octicons,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Games, Events, Profile } from '@/screens';
import { Avatar, useTheme } from '@ui-kitten/components';
import Header from '@/components/header';


const Tab = createBottomTabNavigator();

const DEFAULT_BACKGROUND = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.aiysxhOBd9_RKdfjJ9wQYAHaEK%26pid%3DApi&f=1&ipt=c95fc3b5ad0164124cfc48ec7d41aaedc70baf99afe36900f9847781f3db11f7&ipo=images';


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
        name='Home'
        component={Home}
        options={{
          header: () => <Header />,
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
        name='Events'
        component={Events}
        options={{
          header: () => <Header />,
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
        name='Games'
        component={Games}
        options={{
          header: () => <Header />,
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
        <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          header: () => <Header />,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Avatar size='small' source={{ uri: DEFAULT_BACKGROUND }} style={{ borderColor: 'white', borderWidth: focused ? 0.5 : 0 }}/>
            );
          },
        }}
        />
    </Tab.Navigator>
  );
};

export default BottomTabNav;