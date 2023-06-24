import {
  Octicons,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Games, Events } from '@/screens';
import { useTheme } from '@ui-kitten/components';
import Header from '@/components/header';

const Tab = createBottomTabNavigator();


const BottomTabNav = () => {
  const theme = useTheme();


  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
        borderTopColor: '#21222d',
        backgroundColor: '#0d0e19',
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
    </Tab.Navigator>
  );
};

export default BottomTabNav;