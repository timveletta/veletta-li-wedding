import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Guest = {
  id: string;
  first_name: string;
  last_name: string;
  email?: string;
  party_size: number;
  is_plus_one: boolean;
};

export type RsvpData = {
  guest_id: string;
  attending: boolean;
  dietary_requirements?: string;
  message?: string;
};
