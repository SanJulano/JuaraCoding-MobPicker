import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import ScreenSignin from "../screens/ScreenSignin";

export const PreventSignin = ({ navigation, route }) => {
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (await AsyncStorage.getItem("token")) {
        navigation.navigate("PickupStackNavigator");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return <ScreenSignin navigation={navigation} route={route} />;
};

export const Guardian = ({ navigation, children, route }) => {
  return <>{children}</>;
};

export const Guard = async () => {
  if (!(await AsyncStorage.getItem("token"))) {
    return false;
  }

  return true;
};
