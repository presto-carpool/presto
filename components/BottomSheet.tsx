import { default as GorhomBottomSheet } from "@gorhom/bottom-sheet";
import { useRef, useMemo, useState, useEffect } from "react";
import { Button, Input, Text, ToggleGroup } from "tamagui";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { supabase } from "../utils/supabase";
import React from "react";

const insertRoute = async (destinationPlaceId: any) => {
  const res = await supabase
    .from("routes")
    .insert({ created_by: "rider", destination_place_id: destinationPlaceId });
  console.log(res);
};

const BottomSheet = () => {
  const bottomSheetRef = useRef<GorhomBottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const [destinationPlaceId, setDestinationPlaceId] = useState<string | null>(
    null
  );
  const [name, setName] = useState<string>(""); // Add state for name
  const [phoneNumber, setPhoneNumber] = useState<string>(""); // Add state for phone number


  useEffect(() => {
    // Use the useEffect hook to perform actions when the component mounts or state changes
    console.log("Component mounted or state changed!");
  }, [destinationPlaceId, name, phoneNumber]); // Dependency array - specify the dependencies for the effect

  return (
    <GorhomBottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
      <ToggleGroup type="single">
        <ToggleGroup.Item value="ride">
          <Text>Ride</Text>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="drive">
          <Text>Drive</Text>
        </ToggleGroup.Item>
      </ToggleGroup>
      <Input size="$4" borderWidth={2} placeholder="Full Name" 
      value={name}
      onChangeText={(text) => setName(text)} // Set the name state when the input changes
      />
      <Input size="$4" borderWidth={2} placeholder="Phone" value={phoneNumber}
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
          InputComp: Input,
        }}
      />
      <Button onPress={() => insertRoute(destinationPlaceId)}>Go!</Button>
    </GorhomBottomSheet>
  );
};

const formatPhoneNumber = (input: string) => {
  // Format the phone number as +1, xxx-xxx-xxxx
  const cleaned = input.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);

  if (match) {
    return `+1, ${match[1]}${match[2] ? `-${match[2]}` : ""}${match[3] ? `-${match[3]}` : ""}`;
  }

  return input;
};

export default BottomSheet;
