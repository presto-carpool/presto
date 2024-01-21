import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { cancelUserRoute } from "../../utils/routes";

type PendingBodyProps = {
  myRoute: any;
  onCancel: () => void;
};

const PendingBody = (props: PendingBodyProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { marginTop: -70 }]}>
        Looking for a
        {props.myRoute.created_by === "driver" ? " passenger" : " driver"}
      </Text>
      <LottieView
        source={require("./lottie-animations/loadingAnimation.json")} // Provide the correct path
        autoPlay
        loop
        style={styles.animation}
      />
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => {
          cancelUserRoute();
          props.onCancel();
        }}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20, // Add some spacing between the text and the button
  },
  cancelButton: {
    backgroundColor: "#6B4FDE", // Button background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#fff", // Button text color,
    fontWeight: "bold",
  },
  animation: {
    width: 150, // Adjust the width and height as needed
    height: 150,
  },
});

export default PendingBody;
