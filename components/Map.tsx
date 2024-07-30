import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { Button, Input } from "tamagui";
import React from "react";

const Map = () => {
  return (
    <MapView
      style={styles.map}
      region={{
        latitude: 49.2827,
        longitude: -123.1207,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >

    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
