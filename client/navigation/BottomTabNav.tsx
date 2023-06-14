import {
  SimpleLineIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Games, Events } from '../screens';


const Tab = createBottomTabNavigator();


const BottomTabNav = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen
        name='Events'
        component={Events}
        options={{
          tabBarIcon: () => {
            return (
              <SimpleLineIcons
              name='home'
              size={24}
              />
            );
          },
        }}
        />
        <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: () => {
            return (
                <SimpleLineIcons
                name='home'
                size={24}
                />
            );
          },
        }}
        />
        <Tab.Screen
        name='Games'
        component={Games}
        options={{
          tabBarIcon: () => {
            return (
              <SimpleLineIcons
                name='home'
                size={24}
              />
            );
          },
        }}
      />
      
    </Tab.Navigator>
  );
};

export default BottomTabNav;