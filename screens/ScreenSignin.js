import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ScreenSignin({ navigation, route }) {
  const imageProfile = require("../assets/truk.png");
  const [user, setUser] = useState({ email: "", password: "" });
  const [server, setServer] = useState("http://192.168.18.6:4000");

  const handleChange = (field, text) => {
    setUser((values) => ({ ...values, [field]: text }));
  };

  const onSignIn = async () => {
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(`${server}/user/signin`, config);

    if (response.ok) {
      const json = await response.json();
      await AsyncStorage.setItem("token", json.token);
      await AsyncStorage.setItem("server", server);
      console.log("masuk paijoo");
      navigation.navigate("PickupStackNavigator");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Image source={imageProfile} style={styles.imageProfile} />
        <TextInput
          label="Email"
          value={user.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          label="Password"
          value={user.password}
          secureTextEntry={true}
          onChangeText={(text) => handleChange("password", text)}
        />
        <TextInput
          label="Server"
          value={server}
          onChangeText={(text) => setServer(text)}
        />
        <Button mode="contained" onPress={onSignIn}>
          Sign In
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    paddingHorizontal: 60,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#309991",
  },
  imageProfile: {
    resizeMode: "center",
    alignSelf: "center",
  },
});
