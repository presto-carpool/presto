import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import { Button, Input } from "tamagui";

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
      {/* <MapViewDirections */}
      {/*   origin={gastown} */}
      {/*   destination={englishBay} */}
      {/*   apikey={"AIzaSyDn9nTNd7etbjiCTE3IwYnGoCi9kZwBR7w"} */}
      {/* /> */}
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
