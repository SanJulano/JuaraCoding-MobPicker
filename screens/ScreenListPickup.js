import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { IconButton, List, Text } from "react-native-paper";
import { Guard } from "../services/AuthGuardServices";
import ScreenSignout from "./ScreenSignout";
import { useIsFocused } from "@react-navigation/native";

export default function ScreenListPickup({ navigation, route }) {
  const [daftarTerima, setDaftarTerima] = useState([]);
  const isFocused = useIsFocused();

  const getTerima = async () => {
    const server = await AsyncStorage.getItem("server");
    const response = await fetch(`${server}/terima?status=pickup`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-access-token": await AsyncStorage.getItem("token"),
      },
    });

    if (response.ok) {
      setDaftarTerima(await response.json());
    } else {
      const resp = await response.json();
      // setDetail(resp.detail);
    }
  };

  useEffect(() => {
    if (isFocused) {
      const f = async () => {
        if (!(await AsyncStorage.getItem("token"))) {
          navigation.navigate("ScreenSignin");
        }
      };

      f();

      const timer = setTimeout(async () => {
        await getTerima();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isFocused]);

  const toDetailPickup = (terima) => {
    navigation.navigate("ScreenDetailPickup", { ...terima });
  };

  return (
    <>
      <View>
        {daftarTerima.map((terima) => (
          <List.Item
            key={terima._id}
            title={terima.customer.nama}
            description={terima.status}
            left={(props) => <List.Icon {...props} icon="car-pickup" />}
            right={(props) => (
              <IconButton
                onPress={() => toDetailPickup(terima)}
                icon="hand-front-right"
              />
            )}
          />
        ))}
      </View>
    </>
  );
}
