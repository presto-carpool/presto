import "@tamagui/core/reset.css";
import { TamaguiProvider, createTamagui } from "tamagui";
import { config } from "@tamagui/config/v2";

import { View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Sheet from "./components/BottomSheet/Sheet";
import Map from "./components/Map";
import React from "react";

const tamaguiConfig = createTamagui(config);

// this makes typescript properly type everything based on ithe config
type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <TamaguiProvider config={tamaguiConfig}>
          <View style={{ flex: 1 }}>
            <Map />
            <Sheet />
          </View>
        </TamaguiProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
