"use client";

import { type Guest, getGuestDisplayName } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface GuestSelectionFormProps {
  guests: Guest[];
  onGuestSelect: (guest: Guest) => void;
  onBack: () => void;
}

export default function GuestSelectionForm({
  guests,
  onGuestSelect,
  onBack,
}: GuestSelectionFormProps) {
  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl font-semibold mb-4">Who are you RSVPing for?</h2>
      <div className="space-y-2">
        {guests.map((guest) => (
          <Button
            key={guest.id}
            variant="outline"
            onClick={() => onGuestSelect(guest)}
            className="w-full h-auto p-3 justify-start"
          >
            <div className="text-left">
              <div className="font-medium">{getGuestDisplayName(guest)}</div>
              {guest.party_size > 1 && (
                <div className="text-sm text-gray-600">Party of {guest.party_size}</div>
              )}
            </div>
          </Button>
        ))}
      </div>
      <Button variant="secondary" onClick={onBack} className="w-full">
        Back
      </Button>
    </div>
  );
}
