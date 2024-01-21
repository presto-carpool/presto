import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./supabase";
import { ROUTE_ID_STORAGE_KEY } from "./constants";

type InsertRouteProps = {
  destinationPlaceId: string;
  createdBy: "driver" | "rider";
  fullName: string;
  phoneNumber: string;
};

export const insertRoute = async (props: InsertRouteProps) => {
  const res = await supabase
    .from("routes")
    .insert({
      destination_place_id: props.destinationPlaceId,
      created_by: props.createdBy,
      full_name: props.fullName,
      phone_number: props.phoneNumber,
    })
    .select();

  if (!res.data || res.status !== 201) {
    console.error(res.error);
    throw new Error("Failed to insert route");
  }

  await AsyncStorage.setItem(ROUTE_ID_STORAGE_KEY, res.data[0].id.toString());
};

export const cancelUserRoute = async () => {
  const routeId = await AsyncStorage.getItem(ROUTE_ID_STORAGE_KEY);
  if (!routeId) {
    throw new Error("No route id found");
  }

  const res = await supabase.from("routes").delete().match({ id: routeId });
  if (res.status !== 204) {
    console.log(res);
    console.error(res.error);
    throw new Error("Failed to cancel route");
  }

  await AsyncStorage.removeItem(ROUTE_ID_STORAGE_KEY);
};
