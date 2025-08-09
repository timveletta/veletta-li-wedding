"use client";

import { useState } from "react";
import { supabase, type Guest, type RsvpData } from "@/lib/supabase";

type FormStage = "surname" | "guest-selection" | "rsvp-details" | "submitted";

export default function RsvpForm() {
  const [stage, setStage] = useState<FormStage>("surname");
  const [surname, setSurname] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [rsvpData, setRsvpData] = useState<RsvpData>({
    guest_id: "",
    attending: true,
    dietary_requirements: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSurnameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from("guests")
        .select("*")
        .ilike("last_name", surname);

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestSelection = (guest: Guest) => {
    setSelectedGuest(guest);
    setRsvpData({ ...rsvpData, guest_id: guest.id });
    setStage("rsvp-details");
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("rsvps").insert([rsvpData]);

      if (error) {
        console.error("Error:", error);
        alert("Error submitting RSVP. Please try again.");
      } else {
        setStage("submitted");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting RSVP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (stage === "submitted") {
    return (
      <div className="max-w-md mx-auto p-6 bg-green-50 rounded-lg">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Thank You!</h2>
        <p className="text-green-700">
          Your RSVP has been submitted successfully.
        </p>
      </div>
    );
  }

  if (stage === "surname") {
    return (
      <form
        onSubmit={handleSurnameSubmit}
        className="max-w-md mx-auto space-y-4"
      >
        <div>
          <label htmlFor="surname" className="block text-sm font-medium mb-1">
            Please enter your surname *
          </label>
          <input
            type="text"
            id="surname"
            required
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Smith"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Looking up..." : "Continue"}
        </button>
      </form>
    );
  }

  if (stage === "guest-selection") {
    return (
      <div className="max-w-md mx-auto space-y-4">
        <h2 className="text-xl font-semibold mb-4">Who are you RSVPing for?</h2>
        <div className="space-y-2">
          {guests.map((guest) => (
            <button
              key={guest.id}
              onClick={() => handleGuestSelection(guest)}
              className="w-full p-3 text-left border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="font-medium">
                {guest.first_name} {guest.last_name}
              </div>
              {guest.party_size > 1 && (
                <div className="text-sm text-gray-600">
                  Party of {guest.party_size}
                </div>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => setStage("surname")}
          className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
        >
          Back
        </button>
      </div>
    );
  }

  if (stage === "rsvp-details") {
    return (
      <form onSubmit={handleRsvpSubmit} className="max-w-md mx-auto space-y-4">
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <h2 className="text-xl font-semibold">
            RSVP for {selectedGuest?.first_name} {selectedGuest?.last_name}
          </h2>
          {selectedGuest && selectedGuest.party_size > 1 && (
            <p className="text-sm text-gray-600">
              Party of {selectedGuest.party_size}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Will you be attending? *
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="attending"
                value="true"
                checked={rsvpData.attending}
                onChange={() => setRsvpData({ ...rsvpData, attending: true })}
                className="mr-2"
              />
              Yes, I&apos;ll be there!
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="attending"
                value="false"
                checked={!rsvpData.attending}
                onChange={() => setRsvpData({ ...rsvpData, attending: false })}
                className="mr-2"
              />
              Sorry, I can&apos;t make it
            </label>
          </div>
        </div>

        {rsvpData.attending && (
          <div>
            <label
              htmlFor="dietary_requirements"
              className="block text-sm font-medium mb-1"
            >
              Dietary Requirements
            </label>
            <textarea
              id="dietary_requirements"
              value={rsvpData.dietary_requirements}
              onChange={(e) =>
                setRsvpData({
                  ...rsvpData,
                  dietary_requirements: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Any allergies, dietary preferences, or special requirements..."
            />
          </div>
        )}

        {!rsvpData.attending && (
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message for the couple
            </label>
            <textarea
              id="message"
              value={rsvpData.message}
              onChange={(e) =>
                setRsvpData({ ...rsvpData, message: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Let the couple know your thoughts..."
            />
          </div>
        )}

        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setStage("guest-selection")}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit RSVP"}
          </button>
        </div>
      </form>
    );
  }

  return null;
}
