import { default as GorhomBottomSheet } from "@gorhom/bottom-sheet";
import { useRef, useMemo, useState } from "react";
import { Button, Input, Text, ToggleGroup } from "tamagui";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { supabase } from "../utils/supabase";

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
      <Input size="$4" borderWidth={2} placeholder="Full Name" />
      <Input size="$4" borderWidth={2} placeholder="Phone" />
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

export default BottomSheet;
