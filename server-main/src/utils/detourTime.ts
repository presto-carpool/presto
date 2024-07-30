import { Client, TravelMode } from "@googlemaps/google-maps-services-js";

const UBC_PLACE_ID = "ChIJW5QWwphzhlQRIZvAKHPdu-k";

export const detourTime = async (driverRoute: any, riderRoute: any) => {
  const client = new Client({});

  const toDriver = await client.distancematrix({
    params: {
      mode: TravelMode.driving,
      origins: [`place_id:${UBC_PLACE_ID}`],
      destinations: [`place_id:${driverRoute.destination_place_id}`],
      key: process.env.GOOGLE_MAPS_API_KEY!,
    },
  });

  console.log(
    "TO DRIVER",
    toDriver.data.rows[0].elements[0].duration,
    toDriver.data.rows[0].elements[0].distance
  );

  const toRider = await client.distancematrix({
    params: {
      mode: TravelMode.driving,
      origins: [`place_id:${UBC_PLACE_ID}`],
      destinations: [`place_id:${riderRoute.destination_place_id}`],
      key: process.env.GOOGLE_MAPS_API_KEY!,
    },
  });
  console.log(
    "TO RIDER",
    toRider.data.rows[0].elements[0].duration,
    toRider.data.rows[0].elements[0].distance
  );
  const fromRiderToDriver = await client.distancematrix({
    params: {
      mode: TravelMode.driving,
      origins: [`place_id:${riderRoute.destination_place_id}`],
      destinations: [`place_id:${driverRoute.destination_place_id}`],
      key: process.env.GOOGLE_MAPS_API_KEY!,
    },
  });
  console.log(
    "FROM RIDER TO DRIVER",
    fromRiderToDriver.data.rows[0].elements[0].duration,
    fromRiderToDriver.data.rows[0].elements[0].distance
  );

  const newRouteTimeSeconds =
    toRider.data.rows[0].elements[0].duration.value +
    fromRiderToDriver.data.rows[0].elements[0].duration.value;
  const currentRouteTimeSeconds =
    toDriver.data.rows[0].elements[0].duration.value;

  return newRouteTimeSeconds - currentRouteTimeSeconds;
};
