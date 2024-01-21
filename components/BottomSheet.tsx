import React, { useEffect, useMemo, useRef, useState } from "react";
import { Keyboard, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { BottomSheetTextInput, default as GorhomBottomSheet, useBottomSheet } from "@gorhom/bottom-sheet";
import { Button, Input, Text, ToggleGroup } from "tamagui";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { supabase } from "../utils/supabase";
import Icon from 'react-native-vector-icons/FontAwesome'; 

const BottomSheet = () => {
  const bottomSheetRef = useRef<GorhomBottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const [destinationPlaceId, setDestinationPlaceId] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [rideType, setRideType] = useState<string>("ride"); // Default to "ride"


  const useKeyboardStatus = () => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
      const showSubscription = Keyboard.addListener(
        Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
        () => {
          setKeyboardVisible(true);
        }
      );
      const hideSubscription = Keyboard.addListener(
        Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
        () => {
          setKeyboardVisible(false);
        }
      );

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);

    return keyboardVisible;
  };

  const keyboardVisible = useKeyboardStatus();
  const snapPointsDynamic = useMemo(() => {
    return keyboardVisible ? ["25%", "50%"] : ["25%", "50%", "80%"];
  }, [keyboardVisible]);

  const insertRoute = async () => {
    const res = await supabase
      .from("routes")
      .insert({ created_by: "rider", destination_place_id: destinationPlaceId,
      ride_type: rideType,  });

    console.log(res);
  };

  useEffect(() => {
    console.log("Component mounted or state changed!");
  }, [destinationPlaceId, name, phoneNumber, rideType]);

  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, "");

    if (cleaned === "") {
      return "";
    }

    if (/^\d{10}$/.test(cleaned)) {
      return `+1 ${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (input.startsWith("+1 ")) {
      return input;
    } else {
      return `+1 ${input}`;
    }
  };

  return (
    <GorhomBottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
      <View style={styles.container}>
        <View style={styles.toggleGroupContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, rideType === 'ride' ? styles.activeToggleItem : styles.inactiveToggleItem]}
            onPress={() => setRideType('ride')}
          >
            <Icon name="car" size={20} color={rideType === 'ride' ? '#FFF' : '#333'} />
            <Text style={rideType === 'ride' ? styles.activeToggleText : styles.inactiveToggleText}>Set Ride</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, rideType === 'drive' ? styles.activeToggleItem : styles.inactiveToggleItem]}
            onPress={() => setRideType('drive')}
          >
            <Icon name="car" size={20} color={rideType === 'drive' ? '#FFF' : '#333'} />
            <Text style={rideType === 'drive' ? styles.activeToggleText : styles.inactiveToggleText}>Set Drive</Text>
          </TouchableOpacity>
        </View>

        <BottomSheetTextInput
          style={styles.input}
          // size="$4"
          // borderWidth={2}
          placeholder="Full Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <BottomSheetTextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
        />

        <GooglePlacesAutocomplete
        
          placeholder="Enter your destination"
          onPress={(data) => {
            setDestinationPlaceId(data.place_id);
          }}
          query={{
            key: "AIzaSyDn9nTNd7etbjiCTE3IwYnGoCi9kZwBR7w",
            language: "en",
          }}
          textInputProps={{
            InputComp: BottomSheetTextInput,
          }}
        />

        <Button style={styles.goButton} onPress={insertRoute}>
          <Text style={styles.goButtonText}>Go!</Text>
        </Button>
      </View>
    </GorhomBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 20, // Add top padding for space from the top edge
  },
  toggleGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1, // Make the toggle button take equal space
    marginRight: 10, // Add margin between toggle buttons
    alignItems: 'center', // Center the text horizontally
    paddingVertical: 10, // Add vertical padding for better touch area
    borderRadius: 5, // Apply border radius
  },
  input: {
    width: "100%",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  activeToggleItem: {
    backgroundColor: '#007BFF',
  },
  inactiveToggleItem: {
    backgroundColor: '#E0E0E0',
  },
  activeToggleText: {
    color: '#FFF',
  },
  inactiveToggleText: {
    color: '#333',
  },
  goButton: {
    backgroundColor: "#ccc", // Background color
    marginBottom: 30, // Add margin from the previous input field
    borderRadius: 5, // Rounded corners
    // paddingVertical: 15, // Vertical padding around the button text
    // paddingHorizontal: 20, // Horizontal padding around the button text
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    minWidth: 100, // Set a minimum width for the button
  },
  goButtonText: {
    color: "#000",
    fontSize: 14, // Adjust the font size as needed
    // fontWeight: "bold", // Font weight
  }    
});


export default BottomSheet;
