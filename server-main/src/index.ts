import express, { Express, Request, Response } from "express";
import { getRoutes } from "./utils/getRoutes";
import { detourTime } from "./utils/detourTime";
import { supabase } from "./utils/supabase";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  const allRoutes = await getRoutes();

  if (!allRoutes?.driver) {
    res.send("No driver routes available.");
    return;
  }
  if (!allRoutes?.rider) {
    res.send("No rider routes available.");
    return;
  }

  const driverToRiderMatches = [];

  for (const driverRoute of allRoutes.driver) {
    const riderRoutesCalculations = [];

    for (const riderRoute of allRoutes.rider) {
      const detourTimeSeconds = await detourTime(driverRoute, riderRoute);
      riderRoutesCalculations.push([detourTimeSeconds, riderRoute]);
    }

    riderRoutesCalculations.sort((a, b) => a[0] - b[0]);
    driverToRiderMatches.push([driverRoute, riderRoutesCalculations[0][1]]);

    await supabase.from("matches").insert({
      driver_route_id: driverRoute.id,
      rider_route_id: riderRoutesCalculations[0][1].id,
    });
  }

  console.log(driverToRiderMatches);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
