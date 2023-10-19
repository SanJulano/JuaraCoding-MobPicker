import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { Banner, Text } from "react-native-paper";

export default function ScreenSignout({ navigation, route }) {
  const [visible, setVisible] = useState(true);

  const signOut = () => {
    const timer = setTimeout(async () => {
      await AsyncStorage.clear();
      navigation.navigate("ScreenSignin");
      clearTimeout(timer);
    }, 1000);
    // return () =>
  };

  return (
    <>
      <Banner
        visible={visible}
        actions={[
          {
            label: "Sign Out",
            onPress: () => signOut(),
          },
        ]}
        icon={({ size }) => (
          <Image
            source={{
              uri: "https://avatars3.githubusercontent.com/u/17571969?s=400&v=4",
            }}
            style={{
              width: size,
              height: size,
            }}
          />
        )}>
        There was a problem processing a transaction on your credit card.
      </Banner>
    </>
  );
}
