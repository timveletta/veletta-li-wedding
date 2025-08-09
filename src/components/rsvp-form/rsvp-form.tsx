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
  const [rsvpData, setRsvpData] = useState<RsvpData>({
    guest_id: "",
    attending: true,
    email: "",
    dietary_requirements: "",
    message: "",
  });

  const handleSurnameSubmit = async (surname: string) => {
    try {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .or(`last_name.ilike.%${surname}%,last_name_2.ilike.%${surname}%`);

      if (error) {
        console.error("Error:", error);
        alert("Error looking up guests. Please try again.");
      } else if (data.length === 0) {
        alert(
          "No guests found with that surname. Please check your spelling or contact the couple."
        );
      } else {
        setGuests(data);
        setStage("guest-selection");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error looking up guests. Please try again.");
    }
  };

  const handleGuestSelection = (guest: Guest) => {
    setSelectedGuest(guest);
    setRsvpData({ ...rsvpData, guest_id: guest.id });
    setStage("rsvp-details");
  };

  const handleRsvpSubmit = async (data: RsvpData) => {
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
        alert("Error submitting RSVP. Please try again.");
      } else {
        setStage("submitted");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting RSVP. Please try again.");
    }
  };

  if (stage === "submitted") {
    return (
      <div className="w-full p-6 bg-primary text-white rounded-lg">
        <h2 className="text-4xl font-allura mb-4">Thank you!</h2>
        <p className="font-serif">
          Your RSVP has been submitted successfully. If you provided an email address,
          you should receive a confirmation email shortly.
        </p>
      </div>
    );
  }

  if (stage === "surname") {
    return <SurnameForm onSubmit={handleSurnameSubmit} />;
  }

  if (stage === "guest-selection") {
    return (
      <GuestSelectionForm
        guests={guests}
        onGuestSelect={handleGuestSelection}
        onBack={() => setStage("surname")}
      />
    );
  }

  if (stage === "rsvp-details" && selectedGuest) {
    return (
      <RsvpDetailsForm
        guest={selectedGuest}
        initialData={rsvpData}
        onSubmit={handleRsvpSubmit}
        onBack={() => setStage("guest-selection")}
      />
    );
  }

  return null;
}
