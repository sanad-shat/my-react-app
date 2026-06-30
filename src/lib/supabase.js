import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bgzeyjzdjkgfigzmyazb.supabase.co";

const supabaseAnonKey =
  "sb_publishable_G9nCpUpC16WcBnoGDzKIGg_-JHDr_ea";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);