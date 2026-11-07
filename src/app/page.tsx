"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import Countdown from "./Countdown";
import OurStory from "./OurStory";
import WeddingDetails from "./WeddingDetails";
import RSVP from "./RSVP";
import Guestbook from "./Guestbook";
import MusicPlayer from "./MusicPlayer";
export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [invitationCode, setInvitationCode] = useState<string | null>(null);

  const [invitedGuest, setInvitedGuest] = useState<{
    id: string;
    guest_name: string;
    max_guests: number;
  } | null>(null);

  useEffect(() => {
    const fetchInvitedGuest = async () => {
      const invitationCode = new URLSearchParams(
        window.location.search
      ).get("to");

      if (!invitationCode) return;

setInvitationCode(invitationCode);

const { data, error } = await supabase.rpc(
        "get_invited_guest_by_code_v2",
        {
          p_code: invitationCode,
        }
      );

      if (error) {
        console.error("Failed to load invitation:", error);
        return;
      }

      if (data && data.length > 0) {
        setInvitedGuest(data[0]);
      }
    };

    fetchInvitedGuest();
  }, []);
  return (<main className="min-h-screen bg-[#F5F0E8] flex flex-col items-center p-5">
    
      <div className="relative w-full max-w-2xl min-h-[750px] border border-[#C5AC83] p-3">
        <div className="min-h-[724px] border border-[#C5AC83]/60 flex flex-col items-center justify-center text-center px-6 py-16 relative overflow-hidden">

          {/* Decorative elements */}
          <div className="absolute top-8 left-8 text-[#B69A6B] text-3xl">✳</div>
          <div className="absolute top-8 right-8 text-[#B69A6B] text-3xl">✳</div>
          <div className="absolute bottom-8 left-8 text-[#B69A6B] text-3xl">✳</div>
          <div className="absolute bottom-8 right-8 text-[#B69A6B] text-3xl">✳</div>

          {/* Wedding identity */}
          <p className="text-[#9B8058] tracking-[0.4em] text-[10px] uppercase mb-8">
            The Wedding Celebration
          </p>

          <p className="font-serif italic text-[#9B8058] text-xl mb-5">
            Together with our families
          </p>

          <h1 className="font-serif text-5xl md:text-7xl text-[#756044] tracking-wide">
            Alviyan
          </h1>

          <p className="font-serif italic text-3xl text-[#B69A6B] my-3">
            &
          </p>

          <h1 className="font-serif text-5xl md:text-7xl text-[#756044] tracking-wide">
            Cherline
          </h1>
          <div className="mt-8 mb-6 w-52 h-64 md:w-60 md:h-72 overflow-hidden rounded-t-full border-2 border-[#C5AC83] p-1">
  <img
    src="/images/couple.jpg"
    alt="Alviyan and Cherline"
    className="w-full h-full object-cover rounded-t-full"
  />
</div>

          <div className="w-16 h-px bg-[#B69A6B] my-9" />

          <p className="text-[#8C785A] tracking-[0.3em] text-xs uppercase">
            A Beautiful Beginning
          </p>

          <p className="font-serif italic text-[#9B8058] text-lg mt-3">
            We invite you to celebrate our love
          </p>

          <a
  href="#invitation"
  onClick={() => {
    audioRef.current?.play().catch((error) => {
      console.error("Music playback failed:", error);
    });
  }}
  className="mt-12 border border-[#AD9165] text-[#806B4D] px-10 py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-[#AD9165] hover:text-white transition duration-500"
>
  Open Invitation
</a>

          <p className="absolute bottom-16 text-[#B19B78] text-[9px] tracking-[0.3em] uppercase">
            Vielin Wedding Planner
          </p>

        </div>
      </div>
            <section
        id="invitation"
        className="min-h-screen bg-[#F5F0E8] flex flex-col items-center justify-center text-center px-6 py-20"
      >
        <p className="text-[#9B8058] tracking-[0.4em] text-xs uppercase mb-8">
          You Are Invited
        </p>

        <h2 className="font-serif text-4xl md:text-5xl text-[#756044] mb-6">
  {invitedGuest
    ? `Dear ${invitedGuest.guest_name}`
    : "Dear Beloved Guest"}
</h2>

        <div className="w-16 h-px bg-[#B69A6B] mb-8" />

        <p className="max-w-md text-[#8C785A] leading-8 text-sm">
          With joyful hearts and the blessing of our families,
          we would be honored to have you join us as we celebrate
          the beginning of our forever.
        </p>

        <p className="font-serif italic text-3xl text-[#9B8058] mt-12">
          Alviyan & Cherline
        </p>

        <p className="text-[#B19B78] text-[10px] tracking-[0.3em] uppercase mt-4">
          The Beginning of Forever
        </p>
      </section>
            <Countdown />
            <OurStory />
            <WeddingDetails />
           <RSVP
  invitedGuest={invitedGuest}
  invitationCode={invitationCode}
/>
            <Guestbook guestName={invitedGuest?.guest_name ?? ""} />
            <MusicPlayer audioRef={audioRef} />
    </main>
  );
}
