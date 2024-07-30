import { createClient } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export const getRoutes = async () => {
  const dbRes = await supabase.from("routes").select("*");
  if (dbRes.error) {
    throw new Error(dbRes.error.message);
  }

  if (!dbRes.data) {
    throw new Error("No data found");
  }

  const data = dbRes.data.reduce((acc, curr) => {
    //simplify this
    if (acc[curr.created_by]) {
      acc[curr.created_by].push(curr);
    } else {
      acc[curr.created_by] = [curr];
    }
    return acc;
  }, {} as any);

  return data;
};
