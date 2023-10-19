import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, List, Switch, Text } from "react-native-paper";

export default function ScreenDetailPickup({ navigation, route }) {
  const [terima, setTerima] = useState(null);
  const focused = useIsFocused();

  useEffect(() => {
    setTerima(route.params);
  }, [focused]);

  const onPickup = () => {
    const pick = async () => {
      const config = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-access-token": await AsyncStorage.getItem("token"),
        },
      };
      const server = await AsyncStorage.getItem("server");
      const response = await fetch(
        `${server}/terima/${terima._id}/dicuci/`,
        config
      );

      if (response.ok) {
        navigation.goBack();
      }

      // console.log(response, terima._id);
    };

    pick();
  };

  return (
    <>
      <View>
        <List.Section>
          <List.Subheader>Customer Detail</List.Subheader>
          <List.Item
            title={`${terima?.customer?.nama} / ${terima?.customer?.hp}`}
            description={terima?.customer?.alamat}
            left={(props) => (
              <List.Icon {...props} icon="account-circle-outline" />
            )}
          />
        </List.Section>
        <List.Subheader>Informasi Cucian</List.Subheader>
        <List.Section
          style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <List.Item
            title={"Berat"}
            description={`${terima?.berat} Kg`}
            left={(props) => <List.Icon {...props} icon="file-chart-outline" />}
          />
          <List.Item
            title={"Status"}
            description={`${terima?.status}`}
            left={(props) => <List.Icon {...props} icon="file-chart-outline" />}
          />
          <List.Item
            title={"Total Cucian"}
            description={`${terima?.details?.length} cucian`}
            left={(props) => <List.Icon {...props} icon="file-chart-outline" />}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Detail Cucian</List.Subheader>
          {terima?.details?.map((cucian, index) => (
            <List.Item
              key={index}
              title={cucian.nama}
              left={(props) => (
                <List.Icon {...props} icon="tshirt-crew-outline" />
              )}
            />
          ))}
        </List.Section>

        <Button
          style={{ marginHorizontal: 24, marginTop: 16 }}
          icon={"cube-send"}
          mode="contained"
          onPress={onPickup}>
          Ambil Cucian
        </Button>
      </View>
    </>
  );
}
