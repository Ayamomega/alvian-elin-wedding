
"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("2028-10-21T00:00:00+07:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = targetDate - Date.now();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="relative overflow-hidden bg-[#101D32] px-5 py-24 text-center">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-[#D8BD8A]" />
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full border border-[#D8BD8A]" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full border border-[#D8BD8A]" />
        <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full border border-[#D8BD8A]" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-[#D8BD8A]">
          Save The Date
        </p>

        <div className="mx-auto mb-6 h-px w-12 bg-[#D8BD8A]" />

        <h2 className="font-serif text-3xl leading-relaxed text-[#F5F0E8] sm:text-5xl">
          Counting Down
          <br />
          <span className="italic text-[#D8BD8A]">to Forever</span>
        </h2>

        <p className="mt-6 text-xs tracking-[0.25em] text-[#D8BD8A]">
          SATURDAY, 21 OCTOBER 2028
        </p>

        <div className="mx-auto mt-12 grid max-w-xl grid-cols-4 gap-2 sm:gap-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="border border-[#B99A68]/50 bg-white/[0.04] px-1 py-6 sm:py-8"
            >
              <p className="font-serif text-3xl tabular-nums text-[#F5F0E8] sm:text-5xl">
                {String(item.value).padStart(2, "0")}
              </p>
              <p className="mt-3 text-[8px] uppercase tracking-[0.2em] text-[#D8BD8A] sm:text-[10px]">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 h-px w-12 bg-[#D8BD8A]" />

        <p className="mt-8 font-serif text-lg italic text-[#D8BD8A] sm:text-xl">
          Every second brings us closer to forever.
        </p>

        <p className="mt-3 text-[9px] uppercase tracking-[0.35em] text-[#F5F0E8]/50">
          Alviyan & Cherline
        </p>
      </div>
    </section>
  );
}
