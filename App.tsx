import MapView from "react-native-maps";
import { StyleSheet, View } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { Sheet, Text } from "tamagui";

// some helpful reset styles for web:
import "@tamagui/core/reset.css";

import { TamaguiProvider, createTamagui } from "tamagui";

// some nice defaults:
import { config } from "@tamagui/config/v2";

// you usually export this from a tamagui.config.ts file:
// this can be as simple as an empty object
const tamaguiConfig = createTamagui(config);

// this makes typescript properly type everything based on the config
type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export default function App() {
  const gastown = { latitude: 49.283, longitude: -123.109 };
  const englishBay = { latitude: 49.289, longitude: -123.14 };

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude: 49.2827,
            longitude: -123.1207,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapViewDirections
            origin={gastown}
            destination={englishBay}
            apikey={"AIzaSyDn9nTNd7etbjiCTE3IwYnGoCi9kZwBR7w"}
          />
        </MapView>
      </View>
      <Sheet open={true} snapPoints={[85, 25]}>
        <Sheet.Overlay />
        <Sheet.Frame>
          <Text>Hii!</Text>
        </Sheet.Frame>
      </Sheet>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
