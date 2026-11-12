
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { supabase } from "../lib/supabase";

type Wish = {
  id: string;
  name: string;
  message: string;
};

type GuestbookProps = {
  guestName: string;
};

const Guestbook = ({ guestName }: GuestbookProps) => {
    const sectionRef = useRef<HTMLElement>(null);
const headingRef = useRef<HTMLHeadingElement>(null);
const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
// GUESTBOOK — ROMANTIC SCROLL REVEAL
useEffect(() => {
  const section = sectionRef.current;
  const heading = headingRef.current;
  const form = formRef.current;

  if (!section || !heading || !form) return;

  const listHeading = section.querySelector(".guestbook-list-heading");
  const cards = section.querySelectorAll(".guestbook-card");

  gsap.set([heading, form, listHeading], {
    opacity: 0,
    y: 28,
  });

  gsap.set(cards, {
    opacity: 0,
    y: 25,
  });

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;

      const timeline = gsap.timeline();

      timeline
        .to(heading, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        })
        .to(form, {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: "power3.out",
        }, "-=0.6")
        .to(listHeading, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
        }, "-=0.4")
        .to(cards, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
        }, "-=0.3");

      observer.disconnect();
    },
    { threshold: 0.15 }
  );

  observer.observe(section);

  return () => {
    observer.disconnect();
    gsap.killTweensOf([heading, form, listHeading, ...Array.from(cards)]);
  };
}, [loading, wishes.length]);
  useEffect(() => {
    if (guestName) {
      setName(guestName);
    }
  }, [guestName]);

  useEffect(() => {
    const fetchWishes = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("guestbook")
        .select("id, guest_name, message")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to load guestbook:", error);
        setErrorMessage("Unable to load wishes. Please refresh the page.");
      } else {
        setWishes(
          (data || []).map((wish) => ({
            id: wish.id,
            name: wish.guest_name,
            message: wish.message,
          }))
        );
      }

      setLoading(false);
    };

    fetchWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    setSending(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase.from("guestbook").insert({
      guest_name: name.trim(),
      message: message.trim(),
    });

    setSending(false);

    if (error) {
      console.error("Guestbook submission failed:", error);
      setErrorMessage(
        error.message || "Unknown error. Please check Supabase."
      );
      return;
    }

    const newWish: Wish = {
      id: crypto.randomUUID(),
      name: name.trim(),
      message: message.trim(),
    };

    setWishes((current) => [newWish, ...current]);
    setName("");
    setMessage("");
    setSuccessMessage("Thank you for your beautiful wishes!");
  };

  const inputClass =
    "w-full rounded-xl border border-[#D5C3A2] bg-[#FFFEFA]/95 p-4 text-sm font-medium text-[#344B3B] outline-none transition placeholder:text-[#958A78] focus:border-[#A88B60] focus:ring-2 focus:ring-[#C6A878]/25";

  const labelClass =
    "mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#526B53]";

  return (
    <section
  ref={sectionRef}
  id="guestbook-section"
      className="relative isolate w-full overflow-hidden py-24 text-center"
    >
      {/* Ivory Daisy Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/guestbook/ivory-daisy-bg.png')",
        }}
      />

      {/* Soft Ivory Overlay */}
      <div className="absolute inset-0 -z-10 bg-[#FFFDF7]/25" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5">

        {/* Heading */}
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#A18459]">
          Words of Love
        </p>

        <h2 
        ref={headingRef}className="mb-5 font-editorial text-4xl font-normal text-[#344B3B] md:text-6xl">
          Leave Your Wishes
        </h2>

        <div className="mx-auto mb-7 h-px w-16 bg-[#C6A878]" />

        <p className="mx-auto mb-12 max-w-md font-editorial text-lg leading-8 text-[#756B5B]">
          Your love and kind words will become a beautiful part of our story.
          Leave us a little note to remember.
        </p>

        {/* Guestbook Form */}
        <form
         ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-[#D8C5A2]/90 bg-[#FFFEF9]/90 p-6 text-left shadow-[0_18px_55px_rgba(70,75,48,0.13)] backdrop-blur-sm md:p-10"
        >
          <div>
            <label className={labelClass}>
              Your Name
            </label>

            <input
              type="text"
              value={guestName || name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              readOnly={!!guestName}
              required
              className={`${inputClass} ${
                guestName ? "cursor-not-allowed bg-[#F1EBDD]" : ""
              }`}
            />
          </div>

          <div>
            <label className={labelClass}>
              Your Wishes
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your wishes for Alviyan & Cherline..."
              rows={5}
              required
              className={`${inputClass} resize-y leading-7`}
            />
          </div>

          {errorMessage && (
            <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="rounded-xl border border-[#C6A878]/50 bg-[#F7F2E7] p-4 text-center text-sm font-medium text-[#526B53]">
              🤍 {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="w-full rounded-xl border border-[#B99B6E] bg-[#B99B6E] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white shadow-md transition duration-300 hover:border-[#8F754E] hover:bg-[#8F754E] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Your Wishes"}
          </button>

          <p className="pt-1 text-center font-editorial text-sm italic text-[#8A795F]">
            With love, thank you for being part of our special day.
          </p>
        </form>

        {/* Wishes List */}
        <div className="mt-20">

          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A18459]">
            From Our Loved Ones
          </p>

          <h3 className="guestbook-list-heading mb-4 font-editorial text-3xl font-normal text-[#344B3B] md:text-4xl">
            Beautiful Wishes
          </h3>

          <div className="mx-auto mb-10 h-px w-12 bg-[#C6A878]" />

          {loading ? (
            <p className="font-editorial italic text-[#806B4E]">
              Gathering your wishes...
            </p>
          ) : wishes.length === 0 ? (
            <div className="rounded-2xl border border-[#D5C5A8] bg-[#FFFEFA]/85 p-10 shadow-sm backdrop-blur-sm">
              <p className="font-editorial text-lg italic text-[#806B4E]">
                Be the first to leave a little note of love.
              </p>
              <span className="mt-4 block text-2xl text-[#B99B6E]">❧</span>
            </div>
          ) : (
            <div className="space-y-5 text-left">
              {wishes.map((wish) => (
                <article
                  key={wish.id}
                  className="guestbook-card rounded-2xl border border-[#D5C5A8]/90 bg-[#FFFEFA]/90 p-7 shadow-[0_8px_28px_rgba(70,75,48,0.08)] backdrop-blur-sm transition duration-300 hover:shadow-[0_12px_35px_rgba(70,75,48,0.13)] md:p-9"
                >
                  <div className="mb-2 font-editorial text-5xl leading-none text-[#B99B6E]">
                    “
                  </div>

                  <p className="whitespace-pre-wrap font-editorial text-base leading-8 text-[#526052]">
                    {wish.message}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-px w-8 bg-[#B99B6E]" />

                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#806B4E]">
                      {wish.name}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 font-editorial text-2xl italic text-[#A18459]">
          With Love & Gratitude
        </div>

      </div>
    </section>
  );
};

export default Guestbook;
