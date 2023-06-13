import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

const Layout = () => {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
    </Stack>
  )
};

export default Layout;