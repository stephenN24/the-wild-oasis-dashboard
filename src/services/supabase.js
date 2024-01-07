import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://pvsautyigtytppqkatiq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2c2F1dHlpZ3R5dHBwcWthdGlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI0ODEyMTEsImV4cCI6MjAxODA1NzIxMX0.4m2Yx08axCqezp4h5T0g9nl4F2aPiFcFMFnQBtKANAg";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
