import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Guest = {
  id: string;
  first_name: string;
  last_name: string;
  first_name_2?: string;
  last_name_2?: string;
  email?: string;
  party_size: number;
};

export type RsvpData = {
  guest_id: string;
  attending: boolean;
  email?: string;
  dietary_requirements?: string;
  message?: string;
};

export function getGuestDisplayName(guest: Guest): string {
  if (guest.party_size > 1 && guest.first_name_2 && guest.last_name_2) {
    // Different surnames: "John Smith & Jane Doe"
    return `${guest.first_name} ${guest.last_name} & ${guest.first_name_2} ${guest.last_name_2}`;
  } else if (guest.party_size > 1 && guest.first_name_2) {
    // Same surname: "John & Jane Smith"
    return `${guest.first_name} & ${guest.first_name_2} ${guest.last_name}`;
  } else {
    // Individual: "John Smith"
    return `${guest.first_name} ${guest.last_name}`;
  }
}
