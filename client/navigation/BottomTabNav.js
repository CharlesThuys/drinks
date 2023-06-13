import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Games, Events } from "../screens";


const Tab = createBottomTabNavigator();

const onSelect = (index: number): void => {
    const selectedTabRoute: string = props.state.routeNames[index];
    props.navigation.navigate(selectedTabRoute);
};

const BottomTabNav = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen
        name="Events"
        component={Events}
        options={{
            tabBarIcon: ({ focused }) => {
            return (
                <SimpleLineIcons
                name="home"
                size={24}
                />
            );
            },
        }}
        />
        <Tab.Screen
        name="Home"
        component={Home}
        options={{
            tabBarIcon: ({ focused }) => {
            return (
                <SimpleLineIcons
                name="home"
                size={24}
                />
            );
            },
        }}
        />
        <Tab.Screen
        name="Games"
        component={Games}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <SimpleLineIcons
                name="home"
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