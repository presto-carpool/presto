import React from "react";
import { Text, View, TouchableOpacity, Linking, StyleSheet } from "react-native";

interface MatchedBodyProps {
  myRoute: any;
  foundRoute: any;
}

const MatchedBody: React.FC<MatchedBodyProps> = (props) => {
  const { foundRoute } = props;

  const handleContactPress = () => {
    const phoneNumber = foundRoute.phone_number;
    if (phoneNumber) {
      const telLink = `tel:${phoneNumber}`;
      Linking.openURL(telLink);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Found a {foundRoute.created_by}!</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Full Name:</Text>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>{foundRoute.full_name}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Phone Number:</Text>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoText}>{foundRoute.phone_number}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.contactButton} onPress={handleContactPress}>
        <Text style={styles.contactButtonText}>Call {foundRoute.created_by}</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: "2%",
    marginTop: "-25%", // Adjusted marginTop for proper spacing
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: "5%",
    marginTop: "5%",
    justifyContent: "space-between",
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: "2%",
    // marginRight: "5%",
    flex: 1, // Allocate less space to the label
  },
  infoTextContainer: {
    flex: 3, // Allocate more space to the text
    justifyContent: 'flex-end', // Aligns the child (infoText) to the end of the container
    // marginRight: 10, // Add right margin
    // marginLeft: 10, // Add left margin
  },
  infoText: {
    fontSize: 18,
    color: "#666",
    textAlign: 'right', // Aligns the text to the right
  },
  contactButton: {
    backgroundColor: "#6B4FDE",
    paddingVertical: "5%", // Increased vertical padding for a larger button
    paddingHorizontal: "4%",
    borderRadius: 5,
    marginTop: "10%", // Increased top margin to move it further down
  },
  contactButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default MatchedBody;
