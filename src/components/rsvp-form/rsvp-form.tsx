"use client";

import { useState } from "react";
import { supabase, type Guest, type RsvpData } from "@/lib/supabase";
import SurnameForm from "./surname-form";
import GuestSelectionForm from "./guest-selection-form";
import RsvpDetailsForm from "./rsvp-details-form";

type FormStage = "surname" | "guest-selection" | "rsvp-details" | "submitted";

export default function RsvpForm() {
  const [stage, setStage] = useState<FormStage>("surname");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [error, setError] = useState<string>("");
  const [rsvpData, setRsvpData] = useState<RsvpData>({
    guest_id: "",
    attending: true,
    email: "",
    dietary_requirements: "",
    message: "",
  });

  const handleSurnameSubmit = async (surname: string) => {
    setError("");
    try {
      const { data, error } = await supabase
        .from("guests")
        .select(
          `
          *,
          rsvps!left(id)
        `
        )
        .or(`last_name.ilike.%${surname}%,last_name_2.ilike.%${surname}%`)
        .is("rsvps.id", null);

      if (error) {
        console.error("Error:", error);
        setError("Error looking up guests. Please try again.");
      } else if (data.length === 0) {
        setError(
          "No guests found with that surname who haven't already RSVP'd. Please check your spelling or contact Tim on 0451122654 if you need to update your RSVP."
        );
      } else {
        setGuests(data);
        setStage("guest-selection");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error looking up guests. Please try again.");
    }
  };

  const handleGuestSelection = (guest: Guest) => {
    setError("");
    setSelectedGuest(guest);
    setRsvpData({ ...rsvpData, guest_id: guest.id });
    setStage("rsvp-details");
  };

  const handleRsvpSubmit = async (data: RsvpData) => {
    setError("");
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData);
        setError("Error submitting RSVP. Please try again.");
      } else {
        setStage("submitted");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error submitting RSVP. Please try again.");
    }
  };

  if (stage === "submitted") {
    return (
      <div className="w-full p-6 bg-primary text-white rounded-lg">
        <h2 className="text-4xl font-instrument-serif mb-4">Thank you!</h2>
        <p className="font-serif">
          Your RSVP has been submitted successfully. If you provided an email
          address, you should receive a confirmation email shortly.
        </p>
      </div>
    );
  }

  if (stage === "surname") {
    return (
      <div className="w-full space-y-4">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        <SurnameForm onSubmit={handleSurnameSubmit} />
      </div>
    );
  }

  if (stage === "guest-selection") {
    return (
      <div className="w-full space-y-4">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        <GuestSelectionForm
          guests={guests}
          onGuestSelect={handleGuestSelection}
          onBack={() => setStage("surname")}
        />
      </div>
    );
  }

  if (stage === "rsvp-details" && selectedGuest) {
    return (
      <div className="w-full space-y-4">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        <RsvpDetailsForm
          guest={selectedGuest}
          initialData={rsvpData}
          onSubmit={handleRsvpSubmit}
          onBack={() => setStage("guest-selection")}
        />
      </div>
    );
  }

  return null;
}
