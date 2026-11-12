
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const ClosingNote = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;

  const elements = section.querySelectorAll(".closing-reveal");

  let observer: IntersectionObserver | null = null;

  const ctx = gsap.context(() => {
    gsap.set(elements, {
      opacity: 0,
      y: 35,
      scale: 0.985,
      filter: "blur(8px)",
    });

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const timeline = gsap.timeline();

        timeline.to(elements, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.6,
          stagger: 0.28,
          ease: "power3.out",
        });

        observer?.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
  }, section);

  return () => {
    observer?.disconnect();
    ctx.revert();
  };
}, []);

  return (
    <section
      ref={sectionRef}
      id="closing-section"
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      {/* Ivory Daisy Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/closing/closing-daisy-bg.png')",
        }}
      />

      {/* Soft Natural Overlay */}
      <div className="absolute inset-0 -z-10 bg-[#FFFDF7]/15" />

      {/* Elegant Border */}
      <div className="pointer-events-none absolute inset-5 border border-[#C6A878]/45 md:inset-10" />
      <div className="pointer-events-none absolute inset-7 border border-[#C6A878]/20 md:inset-12" />

      <div className="relative mx-auto w-full max-w-2xl">

        <p className="closing-reveal mb-6 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#A18459]">
          Before You Go
        </p>

        <div className="closing-reveal mb-7 font-editorial text-4xl text-[#B99B6E]">
          ❧
        </div>

        <h2 className="closing-reveal mb-8 font-editorial text-4xl font-normal leading-tight text-[#344B3B] md:text-6xl">
          A Note from Us
        </h2>

        <div className="closing-reveal mx-auto mb-9 h-px w-16 bg-[#C6A878]" />

        <p className="closing-reveal mx-auto max-w-lg font-editorial text-lg leading-9 text-[#756B5B]">
          Having you as part of our journey means more than words can express.
          Thank you for your love, your prayers, and for celebrating this
          beautiful chapter of our lives with us.
        </p>

        <p className="closing-reveal mt-7 font-editorial text-lg italic leading-9 text-[#756B5B]">
          We cannot wait to create beautiful memories together.
        </p>

        <div className="closing-reveal my-12 font-editorial text-3xl text-[#B99B6E]">
          ♡
        </div>

        <p className="closing-reveal mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#A18459]">
          With Love
        </p>

        <h3 className="closing-reveal font-editorial text-3xl italic text-[#344B3B] md:text-4xl">
          Alviyan & Cherline
        </h3>

        <p className="closing-reveal mt-5 text-[10px] font-medium tracking-[0.3em] text-[#A18459]">
          21 · 10 · 2028
        </p>

        <div className="closing-reveal mt-12 font-editorial text-sm italic text-[#95846B]">
          Forever begins with love.
        </div>

      </div>
    </section>
  );
};

export default ClosingNote;
