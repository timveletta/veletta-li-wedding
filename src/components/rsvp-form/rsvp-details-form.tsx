"use client";

import { useState } from "react";
import { type Guest, type RsvpData, getGuestDisplayName } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface RsvpDetailsFormProps {
  guest: Guest;
  initialData: RsvpData;
  onSubmit: (data: RsvpData) => Promise<void>;
  onBack: () => void;
}

export default function RsvpDetailsForm({
  guest,
  initialData,
  onSubmit,
  onBack,
}: RsvpDetailsFormProps) {
  const [rsvpData, setRsvpData] = useState<RsvpData>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(rsvpData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="bg-primary text-white p-4 rounded-lg">
        <h2 className="text-xl font-serif">
          RSVP for {getGuestDisplayName(guest)}
        </h2>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-medium">
          {guest.party_size > 1
            ? "Will you both be attending? *"
            : "Will you be attending? *"}
        </Label>
        <RadioGroup
          value={rsvpData.attending ? "true" : "false"}
          onValueChange={(value) =>
            setRsvpData({ ...rsvpData, attending: value === "true" })
          }
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="attending-yes" />
            <Label htmlFor="attending-yes">
              {guest.party_size > 1
                ? "Yes, we'll be there!"
                : "Yes, I'll be there!"}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="attending-no" />
            <Label htmlFor="attending-no">
              {guest.party_size > 1
                ? "Sorry, we can't make it"
                : "Sorry, I can't make it"}
            </Label>
          </div>
        </RadioGroup>
      </div>

      {rsvpData.attending && (
        <div className="space-y-2">
          <Label htmlFor="email">Email address (for confirmation) *</Label>
          <Input
            id="email"
            type="email"
            required
            value={rsvpData.email || ""}
            onChange={(e) =>
              setRsvpData({ ...rsvpData, email: e.target.value })
            }
            placeholder="your@email.com"
          />
        </div>
      )}

      {rsvpData.attending && (
        <div className="space-y-2">
          <Label htmlFor="dietary_requirements">Dietary Requirements</Label>
          <Textarea
            id="dietary_requirements"
            value={rsvpData.dietary_requirements}
            onChange={(e) =>
              setRsvpData({
                ...rsvpData,
                dietary_requirements: e.target.value,
              })
            }
            rows={3}
            placeholder="Any allergies, dietary preferences, or special requirements..."
          />
        </div>
      )}

      {!rsvpData.attending && (
        <div className="space-y-2">
          <Label htmlFor="message">Message for the couple</Label>
          <Textarea
            id="message"
            value={rsvpData.message}
            onChange={(e) =>
              setRsvpData({ ...rsvpData, message: e.target.value })
            }
            rows={3}
            placeholder="Let the couple know your thoughts..."
          />
        </div>
      )}

      <div className="flex space-x-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onBack}
          className="flex-1"
        >
          Back
        </Button>
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "Submitting..." : "Submit RSVP"}
        </Button>
      </div>
    </form>
  );
}
