import {
    DrawerContentScrollView,
    DrawerItemList,
  } from "@react-navigation/drawer";
  import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
  import { Divider, MD2Colors } from "react-native-paper";
  
  const WidgetSidebar = (props) => {
    const imageProfile = require("../assets/truk.png");
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Image source={imageProfile} style={styles.imageProfile} />
        <Text style={styles.title}>Mobile Picker</Text>
        <Divider />
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
        <Divider />
        <Text
          style={{
            fontSize: 10,
            textAlign: "center",
            color: "grey",
            paddingVertical: 16,
          }}>
          Turu © {new Date().getFullYear()}
        </Text>
      </SafeAreaView>
    );
  };
  
  export default WidgetSidebar;
  
  const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      marginTop: 0,
    },
    imageProfile: {
      resizeMode: "center",
      alignSelf: "center",
    },
    title: {
      textAlign: "center",
      marginVertical: 10,
      fontSize: 24,
      color: "#fff",
    },
  });
  