import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home';
import BottomTabNav from './navigation/BottomTabNav';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='BottomTabNavigation'
        >
          <Stack.Screen
            name="EditProfile"
            component={Home}
            options={{
              headerShown: false,
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
  );
}
