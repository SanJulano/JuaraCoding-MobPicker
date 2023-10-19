import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenSignin from "./screens/ScreenSignin";
import ScreenListPickup from "./screens/ScreenListPickup";
import ScreenDetailPickup from "./screens/ScreenDetailPickup";
import WidgetSidebar from "./widgets/WidgetSidebar";
import { PreventSignin } from "./services/AuthGuardServices";
import ScreenSignout from "./screens/ScreenSignout";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const PickupStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ScreenListPickup"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScreenListPickup" component={ScreenListPickup} />
      <Stack.Screen name="ScreenDetailPickup" component={ScreenDetailPickup} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <WidgetSidebar {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#309991",
            width: 300,
          },
          headerStyle: {
            backgroundColor: "#309991",
          },
          headerTintColor: "#fff",
          drawerActiveTintColor: "#fff",
          drawerInactiveTintColor: "#923934",
          drawerTintColor: "red",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#FFF",
          },
        }}>
   <Drawer.Screen
          name="ScreenSignin"
          options={{
            drawerLabel: "Sign In",
            title: "Sign In",
          }}
          component={PreventSignin}
        />
        <Drawer.Screen
          name="PickupStackNavigator"
          options={{
            drawerLabel: "Pickup",
            title: "Pickup",
          }}
          component={PickupStackNavigator}
        />
        <Drawer.Screen
          name="ScreenSignout"
          options={{
            drawerLabel: "Sign Out",
            title: "Sign Out",
          }}
          component={ScreenSignout}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

