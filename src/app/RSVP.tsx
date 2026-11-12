
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
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
    const sectionRef = useRef<HTMLElement>(null);
const headingRef = useRef<HTMLHeadingElement>(null);
const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("yes");
  const [guests, setGuests] = useState("1");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
// RSVP — ELEGANT SCROLL REVEAL
useEffect(() => {
  const section = sectionRef.current;
  const heading = headingRef.current;
  const form = formRef.current;

  if (!section || !heading || !form) return;

  gsap.set([heading, form], {
    opacity: 0,
    y: 30,
  });

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;

      const timeline = gsap.timeline();

      timeline
        .to(heading, {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "power3.out",
        })
        .to(
          form,
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power3.out",
          },
          "-=0.65"
        );

      observer.disconnect();
    },
    { threshold: 0.2 }
  );

  observer.observe(section);

  return () => {
    observer.disconnect();
    gsap.killTweensOf([heading, form]);
  };
}, []);
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

  const inputClass =
    "w-full rounded-lg border border-[#C6A878] bg-[#FFFEFA] p-3.5 text-sm font-medium text-[#101D32] outline-none transition placeholder:text-[#625746] placeholder:opacity-100 focus:border-[#D2B98F] focus:ring-2 focus:ring-[#C6A878]/30 disabled:cursor-not-allowed disabled:opacity-100";

  const labelClass =
    "mb-2 block text-sm font-semibold tracking-wide text-[#FFF9EC]";

  return (
    <section
  ref={sectionRef}
  className="mx-auto w-full max-w-2xl px-5 py-20 text-center"
>

      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#E5C995]">
        Kindly Respond
      </p>

      <h2
  ref={headingRef}
  className="mb-5 font-editorial text-5xl font-normal text-[#FFF9EC] md:text-6xl"
>
        RSVP
      </h2>

      <div className="mx-auto mb-6 h-px w-16 bg-[#D2B98F]" />

      <p className="mx-auto mb-12 max-w-md font-editorial text-lg leading-8 text-[#F1E8D9]">
        We would be delighted to have you celebrate with us.
        Please confirm your attendance below.
      </p>

      {submitted ? (
        <div className="rounded-2xl border border-[#C6A878]/70 bg-[#101D32] p-10 shadow-xl">
          <div className="mb-5 text-4xl">🤍</div>

          <h3 className="mb-4 font-editorial text-3xl text-[#E5C995]">
            Thank You!
          </h3>

          <p className="font-editorial text-lg leading-8 text-[#FFF9EC]">
            Your response has been received.
            We look forward to celebrating with you!
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="space-y-6 rounded-2xl border border-[#C6A878]/60 bg-[#101D32] p-6 text-left shadow-2xl md:p-9"
        >

          <div>
            <label className={labelClass}>
              Full Name
            </label>

            <input
              type="text"
              value={invitedGuest ? invitedGuest.guest_name : name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              readOnly={!!invitedGuest}
              required
              className={`${inputClass} ${
                invitedGuest ? "cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div>
            <label className={labelClass}>
              Will you attend?
            </label>

            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className={inputClass}
            >
              <option value="yes">Joyfully Accept</option>
              <option value="no">Regretfully Decline</option>
            </select>
          </div>

          {attendance === "yes" && (
            <div>
              <label className={labelClass}>
                Number of Guests
              </label>

              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className={inputClass}
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
            <p className="rounded-lg border border-red-300/40 bg-red-950/40 p-3 text-sm text-red-100">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg border border-[#E3C995] bg-[#D2B98F] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[#101D32] transition duration-300 hover:bg-[#E5D0A9] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Confirm Attendance"}
          </button>

          <p className="pt-2 text-center text-[10px] font-medium tracking-wide text-[#E5D9C5]">
            Thank you for being part of our special day.
          </p>

        </form>
      )}
    </section>
  );
};

export default RSVP;
