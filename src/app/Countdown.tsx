
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
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
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
    <section className="min-h-[70vh] bg-[#F5F0E8] flex flex-col items-center justify-center text-center px-5 py-20">
      <p className="text-[#9B8058] tracking-[0.4em] text-xs uppercase mb-6">
        Save The Date
      </p>

      <h2 className="font-serif text-4xl text-[#756044] mb-4">
        Counting Down to Forever
      </h2>

      <p className="text-[#8C785A] text-sm mb-12">
        21 October 2028
      </p>

      <div className="grid grid-cols-4 gap-3 max-w-lg w-full">
        {items.map((item) => (
          <div key={item.label} className="border border-[#C5AC83] py-6 px-2">
            <p className="font-serif text-3xl text-[#756044]">
              {item.value}
            </p>
            <p className="text-[9px] tracking-widest uppercase text-[#9B8058] mt-2">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <p className="font-serif italic text-xl text-[#9B8058] mt-12">
        Every second brings us closer to forever.
      </p>
    </section>
  );
}
