import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://edqemjkmpvooeicongsy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkcWVtamttcHZvb2VpY29uZ3N5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3OTc0NjAsImV4cCI6MjAyMTM3MzQ2MH0.ZP9tGTPkwcuFDzfavjyIF1uZ1as8yn9JmjcGj8UtmHY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
