
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type InvitedGuest = {
  id: string;
  guest_name: string;
  max_guests: number;
};

type RSVPProps = {
  invitedGuest: InvitedGuest | null;
  invitationCode: string | null;
};

const RSVP = ({ invitedGuest, invitationCode }: RSVPProps) => {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [guests, setGuests] = useState("1");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (invitedGuest) {
      setName(invitedGuest.guest_name);
      setGuests("1");
    }
  }, [invitedGuest]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) return;

    setLoading(true);
    setErrorMessage("");

    let error;

    if (invitedGuest) {
      if (!invitationCode) {
        setLoading(false);
        setErrorMessage("Invalid invitation link.");
        return;
      }

      const result = await supabase.rpc("submit_invited_guest_rsvp", {
        p_code: invitationCode,
        p_attendance:
          attendance === "yes" ? "attending" : "not_attending",
        p_guest_count: attendance === "yes" ? Number(guests) : 1,
      });

      error = result.error;
    } else {
      const result = await supabase.from("rsvps").insert({
        guest_name: name.trim(),
        attendance:
          attendance === "yes" ? "attending" : "not_attending",
        guest_count: attendance === "yes" ? Number(guests) : 1,
      });

      error = result.error;
    }

    setLoading(false);

    if (error) {
      console.error("RSVP submission failed:", error);
      setErrorMessage(
        error.message.includes("Guest count exceeds")
          ? "The number of guests exceeds your invitation limit."
          : "Sorry, something went wrong. Please try again."
      );
      return;
    }

    setSubmitted(true);
  };

  const maxGuests = invitedGuest?.max_guests ?? 4;

  return (
    <section className="w-full max-w-2xl mx-auto py-20 px-5 text-center">
      <p className="text-sm tracking-[0.35em] uppercase text-amber-800 mb-3">
        Kindly Respond
      </p>

      <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
        RSVP
      </h2>

      <p className="text-gray-700 mb-10">
        We would be delighted to have you celebrate with us.
        Please confirm your attendance below.
      </p>

      {submitted ? (
        <div className="border border-amber-300 rounded-2xl p-10">
          <div className="text-4xl mb-4">🤍</div>
          <h3 className="text-2xl font-serif text-gray-900 mb-3">
            Thank You!
          </h3>
          <p className="text-gray-700">
            Your response has been received.
            We look forward to celebrating with you!
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="text-left border border-amber-200 rounded-2xl p-6 md:p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Full Name
            </label>
            <input
  type="text"
  value={invitedGuest ? invitedGuest.guest_name : name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Enter your full name"
  readOnly={!!invitedGuest}
  required
  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 bg-transparent outline-none focus:border-amber-600"
/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">
              Will you attend?
            </label>
            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 bg-transparent outline-none focus:border-amber-600"
            >
              <option value="yes">Joyfully Accept</option>
              <option value="no">Regretfully Decline</option>
            </select>
          </div>

          {attendance === "yes" && (
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Number of Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 bg-transparent outline-none focus:border-amber-600"
              >
                {Array.from({ length: maxGuests }, (_, index) => (
                  <option key={index + 1} value={String(index + 1)}>
                    {index + 1} {index === 0 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          )}

          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-800 hover:bg-amber-900 disabled:opacity-50 text-white py-3 rounded-lg tracking-widest uppercase text-sm transition"
          >
            {loading ? "Submitting..." : "Confirm Attendance"}
          </button>
        </form>
      )}
    </section>
  );
};

export default RSVP;
