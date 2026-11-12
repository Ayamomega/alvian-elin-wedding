
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
      const code = new URLSearchParams(window.location.search).get("to");

      if (!code) return;

      setInvitationCode(code);

      const { data, error } = await supabase.rpc(
        "get_invited_guest_by_code_v2",
        { p_code: code }
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

  const openInvitation = () => {
    audioRef.current?.play().catch((error) => {
      console.error("Music playback failed:", error);
    });

    document.getElementById("invitation")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F5EF] text-[#101D32]">

      {/* HERO */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">

        <div className="absolute inset-5 border border-[#C6A878]/50 pointer-events-none" />
        <div className="absolute inset-7 border border-[#C6A878]/20 pointer-events-none" />

        <div className="relative z-10 animate-reveal flex w-full max-w-3xl flex-col items-center">

          <p className="mb-8 text-[10px] uppercase tracking-[0.45em] text-[#A88B60]">
            A Letter From Our Hearts
          </p>

          <p className="font-script text-4xl text-[#B89A6B]">
            Together with our families
          </p>

          <h1 className="mt-7 font-editorial text-6xl font-normal tracking-wide text-[#101D32] md:text-8xl">
            Alviyan
          </h1>

          <span className="my-1 font-script text-6xl text-[#C6A878]">
            &
          </span>

          <h1 className="font-editorial text-6xl font-normal tracking-wide text-[#101D32] md:text-8xl">
            Cherline
          </h1>

          <div className="my-10 h-[1px] w-20 bg-[#C6A878]" />

          <div className="relative h-[340px] w-[260px] overflow-hidden rounded-t-[140px] border border-[#C6A878] p-2 md:h-[420px] md:w-[320px]">
            <img
              src="/images/couple.jpg"
              alt="Alviyan and Cherline"
              className="h-full w-full rounded-t-[130px] object-cover"
            />
          </div>

          <p className="mt-10 text-[10px] uppercase tracking-[0.4em] text-[#8B806F]">
            Saturday
          </p>

          <p className="mt-2 font-editorial text-3xl tracking-widest text-[#101D32]">
            21 . 10 . 2028
          </p>

          <button
            onClick={openInvitation}
            className="mt-12 border border-[#B89A6B] px-12 py-4 text-[10px] uppercase tracking-[0.3em] text-[#101D32] transition duration-500 hover:bg-[#101D32] hover:text-[#F8F5EF]"
          >
            Discover Our Invitation
          </button>

          <p className="mt-10 font-script text-2xl text-[#B89A6B]">
            The beginning of forever
          </p>
        </div>
      </section>

      {/* PERSONAL INVITATION */}
      <section
        id="invitation"
        className="relative flex min-h-screen flex-col items-center justify-center bg-[#101D32] px-6 py-28 text-center text-[#F8F5EF]"
      >
        <div className="absolute inset-5 border border-[#C6A878]/30 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-2xl animate-reveal">

          <p className="text-[10px] uppercase tracking-[0.45em] text-[#D2B98F]">
            A Personal Invitation
          </p>

          <h2 className="mt-12 font-script text-6xl text-[#D2B98F] md:text-7xl">
            Dear
          </h2>

          <h3 className="mt-3 font-editorial text-4xl font-normal md:text-6xl">
            {invitedGuest
              ? invitedGuest.guest_name
              : "Beloved Guest"}
          </h3>

          <div className="mx-auto my-10 h-px w-16 bg-[#C6A878]" />

          <p className="mx-auto max-w-lg font-editorial text-xl leading-9 text-[#E5DDD0] md:text-2xl">
            With joyful hearts and the blessing of our families,
            we would be honored to have you join us as we celebrate
            the beginning of our forever.
          </p>

          <p className="mt-12 font-script text-5xl text-[#D2B98F]">
            Alviyan & Cherline
          </p>

          <p className="mt-5 text-[10px] uppercase tracking-[0.35em] text-[#C6A878]">
            With love, we invite you
          </p>
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="bg-[#F8F5EF] px-4 py-20">
        <Countdown />
      </section>

      {/* OUR STORY */}
      <section className="bg-[#F0EBE2] px-4 py-20">
        <OurStory />
      </section>

      {/* WEDDING DETAILS */}
      <section className="bg-[#F8F5EF] px-4 py-20">
        <WeddingDetails />
      </section>

      {/* RSVP */}
      <section className="bg-[#101D32] px-4 py-20">
        <RSVP
          invitedGuest={invitedGuest}
          invitationCode={invitationCode}
        />
      </section>

      {/* GUESTBOOK */}
      <section className="bg-[#F8F5EF] px-4 py-20">
        <Guestbook guestName={invitedGuest?.guest_name ?? ""} />
      </section>

      {/* CLOSING */}
      <footer className="bg-[#101D32] px-6 py-24 text-center text-[#F8F5EF]">
        <p className="font-script text-5xl text-[#D2B98F]">
          With Love
        </p>

        <p className="mt-6 font-editorial text-3xl tracking-widest">
          Alviyan & Cherline
        </p>

        <div className="mx-auto my-8 h-px w-16 bg-[#C6A878]" />

        <p className="text-[9px] uppercase tracking-[0.4em] text-[#C6A878]">
          The Beginning of Forever · 2028
        </p>
      </footer>

      <MusicPlayer audioRef={audioRef} />
    </main>
  );
}
