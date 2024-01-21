import React, { useEffect, useMemo, useRef, useState } from "react";
import { default as GorhomBottomSheet } from "@gorhom/bottom-sheet";
import MainBody from "./MainBody";
import { ROUTE_ID_STORAGE_KEY } from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PendingBody from "./PendingBody";
import { supabase } from "../../utils/supabase";
import MatchedBody from "./MatchedBody";

const BottomSheet = () => {
  const bottomSheetRef = useRef<GorhomBottomSheet>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const [myRoute, setMyRoute] = useState<any | null>(null);
  const [foundRoute, setFoundRoute] = useState<any | null>(null);
  const [activePage, setActivePage] = useState<
    "main" | "pending" | "matched" | null
  >(null);

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

      const routeQueryResponse = await supabase
        .from("routes")
        .select("*")
        .eq("id", routeId);
      if (routeQueryResponse.error) {
        console.error("Error fetching route:", routeQueryResponse.error);
        return;
      }
      setMyRoute(routeQueryResponse.data[0]);

      const res = await supabase
        .from("matches")
        .select("*")
        .or(`driver_route_id.eq.${routeId},rider_route_id.eq.${routeId}`);
      if (res.error) {
        console.error("Error fetching matches:", res.error);
        return;
      }
      if (res.status === 200 && res?.data && res.data.length > 0) {
        const match = res.data[0];
        const foundRouteQuery = await supabase
          .from("routes")
          .select("*")
          .eq("id", match.driver_route_id);
        if (foundRouteQuery.error) {
          console.error("Error fetching found route:", foundRouteQuery.error);
          return;
        }
        if (foundRouteQuery.status === 200 && foundRouteQuery?.data) {
          setFoundRoute(foundRouteQuery.data[0]);
        }
      }

      if (!myRoute) {
        setActivePage("main");
      } else if (myRoute && !foundRoute) {
        setActivePage("pending");
      } else if (myRoute && foundRoute) {
        setActivePage("matched");
      }
    };

    fetchData();
  }, []);

  return (
    <GorhomBottomSheet ref={bottomSheetRef} index={1} snapPoints={snapPoints}>
      {activePage === "main" && (
        <MainBody onRouteCreated={() => setActivePage("pending")} />
      )}
      {activePage === "pending" && (
        <PendingBody onCancel={() => setActivePage("main")} myRoute={myRoute} />
      )}
      {activePage === "matched" && (
        <MatchedBody myRoute={myRoute} foundRoute={foundRoute} />
      )}
    </GorhomBottomSheet>
  );
};

export default BottomSheet;
