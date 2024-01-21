import React, { useEffect, useMemo, useRef, useState } from "react";
import { default as GorhomBottomSheet } from "@gorhom/bottom-sheet";
import MainBody from "./MainBody";
import { ROUTE_ID_STORAGE_KEY } from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PendingBody from "./PendingBody";
import { supabase } from "../../utils/supabase";

const BottomSheet = () => {
  const bottomSheetRef = useRef<GorhomBottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const [route, setRoute] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let routeId = null;
      try {
        const storedData = await AsyncStorage.getItem(ROUTE_ID_STORAGE_KEY);
        if (storedData !== null) {
          routeId = storedData;
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
        return;
      }

      const response = await supabase
        .from("routes")
        .select("*")
        .eq("id", routeId);
      if (response.error) {
        console.error("Error fetching route:", response.error);
        return;
      }

      setRoute(response.data[0]);
    };

    fetchData();
  });

  return (
    <GorhomBottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
      {!route ? <MainBody /> : <PendingBody route={route} />}
    </GorhomBottomSheet>
  );
};

export default BottomSheet;
