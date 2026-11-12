
"use client";

import { useEffect, useRef, useState } from "react";
import MusicPlayer from "../MusicPlayer";
import gsap from "gsap";
import NatureBackground from "../components/NatureBackground";
import RSVP from "../RSVP";
import Guestbook from "../Guestbook";
import ClosingNote from "../ClosingNote";
import { supabase } from "../../lib/supabase";

export default function PreviewPage() {
      const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // PAGE 5 — COUNTDOWN TIMER
  useEffect(() => {
    const weddingDate = new Date("2028-10-21T00:00:00+07:00").getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const difference = weddingDate - now;

      if (difference <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setCountdown({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);
  const audioRef = useRef<HTMLAudioElement>(null);
  const coverRef = useRef<HTMLElement>(null);
  const welcomeRef = useRef<HTMLElement>(null);

const [invitationCode, setInvitationCode] = useState<string | null>(null);

const [invitedGuest, setInvitedGuest] = useState<{
  id: string;
  guest_name: string;
  max_guests: number;
} | null>(null);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const flourishRef = useRef<SVGPathElement>(null);
  const storyRef = useRef<HTMLElement>(null);

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

  

// SECTION 1 — LUXURY COVER ENTRANCE ANIMATION
useEffect(() => {
  const cover = document.querySelector(".opening-content");
  if (!cover) return;

  const elements = Array.from(cover.children);

  const ctx = gsap.context(() => {
    gsap.set(elements, {
      opacity: 0,
      y: 35,
      filter: "blur(6px)",
    });

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 35,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.4,
        stagger: 0.18,
        ease: "power3.out",
        delay: 0.3,
      }
    );
  }, cover);

  return () => ctx.revert();
}, []);


useEffect(() => {
  const previousBodyOverflow = document.body.style.overflow;
  const previousHtmlOverflow = document.documentElement.style.overflow;

  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = previousBodyOverflow;
    document.documentElement.style.overflow = previousHtmlOverflow;
  };
}, []);

const openInvitation = async () => {
  const audio = audioRef.current;
  const cover = coverRef.current;
  const welcome = welcomeRef.current;

  if (audio) {
    try {
      await audio.play();
    } catch (error) {
      console.error("Music playback failed:", error);
    }
  }

  if (!cover || !welcome) return;

  // Hide welcome before scrolling
  gsap.set(welcome, {
    opacity: 0,
  });

  const content = cover.querySelector(".opening-content");

  gsap.timeline({
    onComplete: () => {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";

  welcome.scrollIntoView({
    behavior: "smooth",
  });

      // Soft fade-in for welcome page
      
gsap.to(welcome, {
  opacity: 1,
  duration: 2,
  delay: 0.5,
  ease: "power2.out",
  onComplete: () => {
    gsap.set(cover, {
      clearProps: "opacity,transform,filter",
    });

    gsap.set(content, {
      clearProps: "opacity,transform,filter",
    });
  },
});

    },
  })
    .to(cover, {
      scale: 1.06,
      duration: 1.1,
      ease: "power2.in",
    })
    .to(
      content,
      {
        opacity: 0,
        y: -20,
        filter: "blur(8px)",
        duration: 0.8,
        ease: "power2.in",
      },
      "-=0.8"
    )
    .to(
      cover,
      {
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.7,
        ease: "power2.inOut",
      },
      "-=0.5"
    );
};


 // SECTION 4 — GSAP ANIMATION
useEffect(() => {
  const section = document.querySelector(".ac-details");
  if (!section) return;

  const heading = section.querySelector(".ac-details-heading");
  const cardOne = section.querySelector(".details-card-one");
  const cardTwo = section.querySelector(".details-card-two");
  const flower = section.querySelector(".details-float");

  if (!heading || !cardOne || !cardTwo || !flower) return;

  gsap.set([heading, cardOne, cardTwo], {
    opacity: 0,
    y: 25,
  });

  gsap.set(flower, {
    y: 0,
  });

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        const timeline = gsap.timeline();

        timeline
          .to(heading, {
            opacity: 1,
            y: 0,
            duration: 1.6,
            ease: "power2.out",
          })
          .to(cardOne, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
          }, "-=0.7")
          .to(cardTwo, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power2.out",
          }, "-=0.9");

        gsap.to(flower, {
          y: -10,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(section);

  return () => {
    observer.disconnect();
    gsap.killTweensOf([heading, cardOne, cardTwo, flower]);
    
  };
}, []);

  // PAGE 5 — COUNTDOWN REVEAL ANIMATION
  useEffect(() => {
    const section = document.querySelector(".ac-countdown");
    if (!section) return;

    const background = section.querySelector(
      ".ac-countdown-background"
    );
    const kicker = section.querySelector(
      ".ac-countdown-kicker"
    );
    const title = section.querySelector(
      ".ac-countdown-title"
    );
    const divider = section.querySelector(
      ".ac-countdown-divider"
    );
    const date = section.querySelector(
      ".ac-countdown-date"
    );
    const timer = section.querySelector(
      ".ac-countdown-timer"
    );
    const units = section.querySelectorAll(
      ".ac-countdown-unit"
    );
    const footer = section.querySelector(
      ".ac-countdown-footer"
    );

    if (
      !background ||
      !kicker ||
      !title ||
      !divider ||
      !date ||
      !timer ||
      !footer ||
      units.length === 0
    ) return;

    gsap.set(
      [kicker, title, divider, date, footer],
      {
        opacity: 0,
        y: 24,
        filter: "blur(5px)",
      }
    );

    gsap.set(units, {
      opacity: 0,
      y: 18,
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const timeline = gsap.timeline();

        timeline
          .fromTo(
            background,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 3,
              ease: "power2.out",
            }
          )
          .to(kicker, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power2.out",
          }, "-=2.2")
          .to(title, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power3.out",
          }, "-=0.65")
          .to(divider, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
          }, "-=0.8")
          .to(date, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
          }, "-=0.5")
          .to(units, {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
  duration: 1.1,
  stagger: 0.16,
  ease: "power3.out",
}, "-=0.35")
          .to(footer, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power2.out",
          }, "-=0.4");

        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      gsap.killTweensOf([
        background,
        kicker,
        title,
        divider,
        date,
        timer,
        footer,
        ...Array.from(units),
      ]);
    };
  }, []);

  // SECTION 2 — HANDWRITING REVEAL
  useEffect(() => {
    const section = welcomeRef.current;
    const heading = headingRef.current;
    const flourish = flourishRef.current;

    if (!section || !heading || !flourish) return;
    

    gsap.set(heading, {
      clipPath: "inset(0 100% 0 0)",
      opacity: 1,
    });

    gsap.set(flourish, {
      strokeDasharray: 1,
      strokeDashoffset: 1,
    });

    let hasPlayed = false;

    const playAnimation = () => {
      if (hasPlayed) return;
      hasPlayed = true;

      gsap.timeline()
        .to(heading, {
          clipPath: "inset(0 0% 0 0)",
          duration: 3,
          ease: "power2.inOut",
        })
        .to(
          flourish,
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power1.inOut",
          },
          "-=0.4"
        );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          playAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      gsap.killTweensOf([heading, flourish]);
    };
  }, []);

  // SECTION 3 — OUR STORY REVEAL
  useEffect(() => {
    const section = storyRef.current;
    if (!section) return;

    const elements = section.querySelectorAll(".story-reveal");
    const photos = section.querySelectorAll(".ac-story-photo");

    gsap.set(elements, {
      opacity: 0,
      y: 30,
    });

    gsap.set(photos, {
  opacity: 0,
  y: 45,
});

    let hasPlayed = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasPlayed) return;

        hasPlayed = true;

        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.25,
          ease: "power2.out",
        });

        gsap.to(photos, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: "power2.out",
        });

        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      gsap.killTweensOf(elements);
      gsap.killTweensOf(photos);
    };
  }, []);

  return (
    <main className="overflow-hidden bg-[#F5F0E8]">

      {/* SECTION 1 — OPENING */}
      <section
      ref={coverRef} 
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-16 text-center text-[#F5F0E8]">
        <NatureBackground overlayOpacity={0.38} />

       <div className="opening-content relative z-10 mx-auto flex w-full max-w-xl flex-col items-center">
          <p className="mb-8 font-editorial text-xs uppercase tracking-[0.35em] text-[#D8BD8A]">
            The Wedding Invitation
          </p>

          <div className="mb-8 h-px w-16 bg-[#D8BD8A]/70" />

          <p className="mb-5 font-editorial text-lg italic">
            Together with our families
          </p>

          <h1
            className="leading-[1.15] text-[#F5F0E8]"
            style={{
              fontFamily: "var(--font-pinyon), cursive",
              fontSize: "clamp(5rem, 13vw, 8rem)",
              fontWeight: 400,
            }}
          >
            Alviyan
            <span
              className="my-1 block text-[#D8BD8A]"
              style={{ fontSize: "0.55em" }}
            >
              &
            </span>
            Cherline
          </h1>

          <div className="my-8 h-px w-16 bg-[#D8BD8A]/70" />

          <p className="font-editorial text-base tracking-[0.3em]">
            21 . 10 . 2028
          </p>

        {invitedGuest?.guest_name && (
  <p className="opening-reveal mt-10 font-editorial text-2xl italic tracking-wide text-[#F5F0E8] sm:text-3xl">
    Dear {invitedGuest.guest_name.replace(/\b\w/g, (char) => char.toUpperCase())},
  </p>
)}

<p className="mt-3 font-editorial text-sm italic text-[#F5F0E8]/85 sm:text-base">
  We joyfully invite you to celebrate our special day
</p>
          <button
            type="button"
            onClick={openInvitation}
            className="button-wedding mt-8 cursor-pointer"
          >
            Open Invitation
          </button>

          <p className="mt-4 font-editorial text-xs tracking-widest text-[#F5F0E8]/60">
            SCROLL TO EXPLORE
          </p>
        </div>
      </section>

      
      {/* SECTION 2 — ORNATE VINTAGE WELCOME */}
      <section
        id="welcome-section"
        ref={welcomeRef}
        className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#101D32] px-4 py-16 sm:px-8"
      >
        {/* Sunset background */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/story/story-sunset.jpeg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#101D32]/75" />
        </div>

        {/* Ornate card */}
       <div className="relative mx-auto w-full max-w-[460px]">
  <div className="relative mx-auto aspect-[0.78/1] w-full">

            {/* SVG vintage scalloped frame */}
            <svg
              viewBox="0 0 600 830"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full drop-shadow-2xl"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="paperTone" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FBF8F0" />
                  <stop offset="50%" stopColor="#F5F0E8" />
                  <stop offset="100%" stopColor="#EDE4D6" />
                </linearGradient>
              </defs>

              <path
                d="
                  M300 12
                  C330 12 340 32 370 32
                  C400 32 410 12 440 18
                  C470 24 475 50 500 62
                  C525 74 552 65 570 88
                  C588 112 568 138 580 165
                  C592 192 588 210 588 240
                  C588 270 568 280 568 310
                  C568 340 588 350 588 380
                  C588 410 568 420 568 450
                  C568 480 588 490 588 520
                  C588 550 570 560 580 590
                  C590 620 568 640 545 650
                  C522 660 510 680 500 710
                  C490 740 470 755 440 760
                  C410 765 390 790 360 800
                  C330 810 320 818 300 818
                  C280 818 270 810 240 800
                  C210 790 190 765 160 760
                  C130 755 110 740 100 710
                  C90 680 78 660 55 650
                  C32 640 10 620 20 590
                  C30 560 12 550 12 520
                  C12 490 32 480 32 450
                  C32 420 12 410 12 380
                  C12 350 32 340 32 310
                  C32 280 12 270 12 240
                  C12 210 8 192 20 165
                  C32 138 12 112 30 88
                  C48 65 75 74 100 62
                  C125 50 130 24 160 18
                  C190 12 200 32 230 32
                  C260 32 270 12 300 12 Z
                "
                fill="url(#paperTone)"
                stroke="#D8BD8A"
                strokeWidth="3"
              />

              <path
                d="
                  M300 34
                  C328 34 345 51 370 51
                  C398 51 417 33 440 39
                  C461 45 468 68 489 78
                  C512 89 537 84 551 103
                  C565 122 550 145 560 169
                  C571 195 568 215 568 240
                  C568 268 550 281 550 310
                  C550 339 568 352 568 380
                  C568 408 550 421 550 450
                  C550 479 568 492 568 520
                  C568 548 552 562 560 586
                  C568 611 549 629 529 638
                  C505 649 493 670 483 700
                  C474 725 458 737 433 741
                  C404 746 386 771 356 779
                  C329 787 319 796 300 796
                  C281 796 271 787 244 779
                  C214 771 196 746 167 741
                  C142 737 126 725 117 700
                  C107 670 95 649 71 638
                  C51 629 32 611 40 586
                  C48 562 32 548 32 520
                  C32 492 50 479 50 450
                  C50 421 32 408 32 380
                  C32 352 50 339 50 310
                  C50 281 32 268 32 240
                  C32 215 29 195 40 169
                  C50 145 35 122 49 103
                  C63 84 88 89 111 78
                  C132 68 139 45 160 39
                  C183 33 202 51 230 51
                  C255 51 272 34 300 34 Z
                "
                stroke="#C4A66F"
                strokeWidth="1.5"
              />

              {/* Botanical corner ornaments */}
              <g
                stroke="#B69A6B"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              >
                <path d="M105 145 Q125 115 155 108 Q140 135 105 145Z" />
                <path d="M105 145 Q135 145 153 168" />
                <path d="M495 145 Q475 115 445 108 Q460 135 495 145Z" />
                <path d="M495 145 Q465 145 447 168" />

                <path d="M105 685 Q125 715 155 722 Q140 695 105 685Z" />
                <path d="M105 685 Q135 685 153 662" />
                <path d="M495 685 Q475 715 445 722 Q460 695 495 685Z" />
                <path d="M495 685 Q465 685 447 662" />
              </g>

              {/* Tiny champagne details */}
              <g fill="#C4A66F">
                <circle cx="300" cy="105" r="3" />
                <circle cx="300" cy="725" r="3" />
                <circle cx="80" cy="415" r="2" />
                <circle cx="520" cy="415" r="2" />
              </g>
            </svg>

            {/* Card content */}
           
{/* Card content */}
<div className="absolute inset-0 flex flex-col items-center px-[14%] pt-[10%] pb-[8%] text-center">

  <p className="font-editorial text-[10px] uppercase tracking-[0.32em] text-[#A58B61] sm:text-xs">
    A Celebration of Love
  </p>

  <p className="mt-4 font-editorial text-sm italic text-[#756044] sm:mt-8">
  Together with our families
</p>

  <h2
    ref={headingRef}
   className="mt-5 text-[#101D32] sm:mt-9"
    style={{
      fontFamily: "var(--font-pinyon), cursive",
      fontSize: "clamp(2.9rem, 7vw, 4.1rem)",
      fontWeight: 400,
      lineHeight: 1.12,
    }}
  >
    We're Getting
    <span className="block">Married!</span>
  </h2>

  <svg
    viewBox="0 0 240 24"
    className="mt-5 w-36 overflow-visible sm:w-40"
    fill="none"
    aria-hidden="true"
  >
    <path
      ref={flourishRef}
      d="M4 12 C55 12 65 4 105 12 S165 20 205 10 S228 8 236 12"
      pathLength="1"
      stroke="#D8BD8A"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>

  <p className="mt-6 max-w-sm font-editorial text-sm leading-relaxed text-[#3A2A1F] sm:text-base">
    With grateful hearts, we invite you to witness
    the beginning of our forever.
  </p>

  
<div className="mt-5 h-px w-10 bg-[#D8BD8A]" />

<p className="mt-3 font-editorial text-[9px] uppercase tracking-[0.3em] text-[#A58B61]">
  The Wedding Of
</p>

<p
  className="mt-1 whitespace-nowrap text-[#101D32]"
  style={{
    fontFamily: "var(--font-pinyon), cursive",
   fontSize: "clamp(1.35rem, 4vw, 2.05rem)",
    lineHeight: 1.15,
  }}
>
  Alviyan & Cherline
</p>

<p className="mt-2 font-editorial text-[10px] tracking-[0.28em] text-[#756044]">
  21 . 10 . 2028
</p>


</div>

          </div>
        </div>
      </section>


      
      
      
      
      {/* SECTION 3 — LUXURY EDITORIAL OUR STORY */}
      <section
        ref={storyRef}
        className="ac-story relative isolate overflow-hidden"
      >
        {/* Background placeholder */}
        <div className="ac-story-background" aria-hidden="true">
  <img
    src="/images/our-story/our-story-bg.webp"
    alt=""
  />
  <div className="ac-story-background-overlay" />
</div>

        <div className="ac-story-stage">

          {/* Back parchment */}
          <img
            src="/images/our-story/03-parchment-back.svg"
            alt=""
            className="ac-story-paper-back"
            aria-hidden="true"
          />

          {/* Main parchment */}
          <article className="ac-story-paper">
            <img
              src="/images/our-story/02-parchment-main.svg"
              alt=""
              className="ac-story-paper-texture"
              aria-hidden="true"
            />

            <div className="ac-story-content">

              <div className="story-reveal ac-story-monogram">
                A <span>&amp;</span> C
              </div>

              <p className="story-reveal ac-story-kicker">
                A Journey of Two Hearts
              </p>

              <div className="story-reveal ac-story-title-wrap">
                <h2 className="ac-story-title">Our Story</h2>
                <div className="ac-story-divider">
                  <span />
                  <i>✧</i>
                  <span />
                </div>
              </div>

              <div className="story-reveal ac-story-copy">
                <p>
                  It began with a simple connection, grew through
                  shared experiences, and turned into a love we
                  choose every day.
                </p>

                <p>
                  Through every season, every place, and every
                  little moment, we found our forever in each other.
                </p>
              </div>

              <div className="story-reveal ac-story-couple">
                <p className="ac-story-small-label">The Wedding Of</p>
                <p className="ac-story-names">Alviyan &amp; Cherline</p>
                <p className="ac-story-date">21 October 2028</p>
              </div>

              <div className="story-reveal ac-story-wax">
                <img
                  src="/images/story/wax-seal-ac.png"
                  alt="Alviyan and Cherline gold wax seal"
                />
              </div>

            </div>
          </article>

          {/* Two overlapping vintage photographs */}
          <div className="ac-story-photos">
            <figure className="story-photo ac-story-photo ac-story-photo-one">
              <div className="ac-story-photo-image">
                <img
                  src="/images/story/story-beach.jpeg"
                  alt="Alviyan and Cherline at the beach"
                />
              </div>
              <figcaption>Where our story unfolds</figcaption>
            </figure>

            <figure className="story-photo ac-story-photo ac-story-photo-two">
              <div className="ac-story-photo-image">
                <img
                  src="/images/story/story-hug.jpeg"
                  alt="A tender moment between Alviyan and Cherline"
                />
              </div>
              <figcaption>My favorite place is with you</figcaption>
            </figure>
          </div>

          {/* Botanical details */}
          {/* Botanical details */}
<img
  src="/images/our-story/decor/05-botanical-gold.svg"
  alt=""
  className="ac-story-botanical"
  aria-hidden="true"
/>

<img
  src="/images/our-story/calla-lilies.png"
  alt=""
  className="ac-story-lily"
  aria-hidden="true"
/>


        </div>
      </section>


      {/* SECTION 4 — THE WEDDING DETAILS */}
      <section className="ac-details">
        <div className="ac-details-background" aria-hidden="true" />

        <div className="ac-details-inner">
          <div className="ac-details-heading details-reveal">
            <span className="ac-details-monogram">A <i>&amp;</i> C</span>
            <p className="ac-details-kicker">A Celebration of Love</p>
            <h2 className="ac-details-title">The Wedding Day</h2>
            <div className="ac-details-divider">
              <span />
              <i>✧</i>
              <span />
            </div>
            <p className="ac-details-date">
              Saturday <span>·</span> 21 October 2028
            </p>
          </div>

          <div className="ac-details-cards">
            <article className="ac-details-card details-reveal details-card-one">

<svg
  className="ac-details-card-frame"
  viewBox="0 0 600 830"
  preserveAspectRatio="none"
  aria-hidden="true"
>
  <path
    d="M300 12 C330 12 340 32 370 32 C400 32 410 12 440 18 C470 24 475 50 500 62 C525 74 552 65 570 88 C588 112 568 138 580 165 C592 192 588 210 588 240 C588 270 568 280 568 310 C568 340 588 350 588 380 C588 410 568 420 568 450 C568 480 588 490 588 520 C588 550 570 560 580 590 C590 620 568 640 545 650 C522 660 510 680 500 710 C490 740 470 755 440 760 C410 765 390 790 360 800 C330 810 320 818 300 818 C280 818 270 810 240 800 C210 790 190 765 160 760 C130 755 110 740 100 710 C90 680 78 660 55 650 C32 640 10 620 20 590 C30 560 12 550 12 520 C12 490 32 480 32 450 C32 420 12 410 12 380 C12 350 32 340 32 310 C32 280 12 270 12 240 C12 210 8 192 20 165 C32 138 12 112 30 88 C48 65 75 74 100 62 C125 50 130 24 160 18 C190 12 200 32 230 32 C260 32 270 12 300 12 Z"
    fill="#F5F0E8"
    stroke="#D8BD8A"
    strokeWidth="7"
  />
  <path
    d="M300 34 C328 34 345 51 370 51 C398 51 417 33 440 39 C461 45 468 68 489 78 C512 89 537 84 551 103 C565 122 550 145 560 169 C571 195 568 215 568 240 C568 268 550 281 550 310 C550 339 568 352 568 380 C568 408 550 421 550 450 C550 479 568 492 568 520 C568 548 552 562 560 586 C568 611 549 629 529 638 C505 649 493 670 483 700 C474 725 458 737 433 741 C404 746 386 771 356 779 C329 787 319 796 300 796 C281 796 271 787 244 779 C214 771 196 746 167 741 C142 737 126 725 117 700 C107 670 95 649 71 638 C51 629 32 611 40 586 C48 562 32 548 32 520 C32 492 50 479 50 450 C50 421 32 408 32 380 C32 352 50 339 50 310 C50 281 32 268 32 240 C32 215 29 195 40 169 C50 145 35 122 49 103 C63 84 88 89 111 78 C132 68 139 45 160 39 C183 33 202 51 230 51 C255 51 272 34 300 34 Z"
    fill="none"
    stroke="#C4A66F"
    strokeWidth="3"
  />
</svg>

              <span className="ac-details-card-number">01</span>
              <div className="ac-details-card-icon">✧</div>
              <p className="ac-details-card-kicker">The Ceremony</p>
              <h3>Holy Matrimony</h3>
              <div className="ac-details-card-line" />
              <p className="ac-details-info-label">Time</p>
              <p className="ac-details-info-value">To Be Announced</p>
              <p className="ac-details-info-label">Venue</p>
              <p className="ac-details-info-value">To Be Announced</p>
              <p className="ac-details-map">View Location on Google Maps</p>
            </article>

            <article className="ac-details-card details-reveal details-card-two">

<svg
  className="ac-details-card-frame"
  viewBox="0 0 600 830"
  preserveAspectRatio="none"
  aria-hidden="true"
>
  <path
    d="M300 12 C330 12 340 32 370 32 C400 32 410 12 440 18 C470 24 475 50 500 62 C525 74 552 65 570 88 C588 112 568 138 580 165 C592 192 588 210 588 240 C588 270 568 280 568 310 C568 340 588 350 588 380 C588 410 568 420 568 450 C568 480 588 490 588 520 C588 550 570 560 580 590 C590 620 568 640 545 650 C522 660 510 680 500 710 C490 740 470 755 440 760 C410 765 390 790 360 800 C330 810 320 818 300 818 C280 818 270 810 240 800 C210 790 190 765 160 760 C130 755 110 740 100 710 C90 680 78 660 55 650 C32 640 10 620 20 590 C30 560 12 550 12 520 C12 490 32 480 32 450 C32 420 12 410 12 380 C12 350 32 340 32 310 C32 280 12 270 12 240 C12 210 8 192 20 165 C32 138 12 112 30 88 C48 65 75 74 100 62 C125 50 130 24 160 18 C190 12 200 32 230 32 C260 32 270 12 300 12 Z"
    fill="#F5F0E8"
    stroke="#D8BD8A"
    strokeWidth="7"
  />
  <path
    d="M300 34 C328 34 345 51 370 51 C398 51 417 33 440 39 C461 45 468 68 489 78 C512 89 537 84 551 103 C565 122 550 145 560 169 C571 195 568 215 568 240 C568 268 550 281 550 310 C550 339 568 352 568 380 C568 408 550 421 550 450 C550 479 568 492 568 520 C568 548 552 562 560 586 C568 611 549 629 529 638 C505 649 493 670 483 700 C474 725 458 737 433 741 C404 746 386 771 356 779 C329 787 319 796 300 796 C281 796 271 787 244 779 C214 771 196 746 167 741 C142 737 126 725 117 700 C107 670 95 649 71 638 C51 629 32 611 40 586 C48 562 32 548 32 520 C32 492 50 479 50 450 C50 421 32 408 32 380 C32 352 50 339 50 310 C50 281 32 268 32 240 C32 215 29 195 40 169 C50 145 35 122 49 103 C63 84 88 89 111 78 C132 68 139 45 160 39 C183 33 202 51 230 51 C255 51 272 34 300 34 Z"
    fill="none"
    stroke="#C4A66F"
    strokeWidth="3"
  />
</svg>

              <span className="ac-details-card-number">02</span>
              <div className="ac-details-card-icon">✧</div>
              <p className="ac-details-card-kicker">The Celebration</p>
              <h3>Wedding Reception</h3>
              <div className="ac-details-card-line" />
              <p className="ac-details-info-label">Time</p>
              <p className="ac-details-info-value">To Be Announced</p>
              <p className="ac-details-info-label">Venue</p>
              <p className="ac-details-info-value">To Be Announced</p>
              <p className="ac-details-map">View Location on Google Maps</p>
            </article>
          </div>

          <p className="ac-details-footer">
            We cannot wait to celebrate this beautiful day with you.
          </p>
        </div>

        <img
          src="/images/our-story/calla-lilies.png"
          alt=""
          className="ac-details-lily details-float"
          aria-hidden="true"
        />
        <img
          src="/images/our-story/decor/05-botanical-gold.svg"
          alt=""
          className="ac-details-botanical"
          aria-hidden="true"
        />
      </section>
      {/* SECTION 5 — COUNTING DOWN TO FOREVER */}
      <section className="ac-countdown">
        <div className="ac-countdown-background" aria-hidden="true" />

        <div className="ac-countdown-inner">
          <p className="ac-countdown-kicker">
            THE BEGINNING OF FOREVER
          </p>

          <h2 className="ac-countdown-title">
            Counting Down
            <span>to Forever</span>
          </h2>

          <div className="ac-countdown-divider">
            <span />
            <i>✧</i>
            <span />
          </div>

          <p className="ac-countdown-date">
            21 October 2028
          </p>

          <div className="ac-countdown-timer">
            <div className="ac-countdown-unit">
              <span className="ac-countdown-number">
                {String(countdown.days).padStart(3, "0")}
              </span>
              <span className="ac-countdown-label">Days</span>
            </div>

            <span className="ac-countdown-colon">:</span>

            <div className="ac-countdown-unit">
              <span className="ac-countdown-number">
                {String(countdown.hours).padStart(2, "0")}
              </span>
              <span className="ac-countdown-label">Hours</span>
            </div>

            <span className="ac-countdown-colon">:</span>

            <div className="ac-countdown-unit">
              <span className="ac-countdown-number">
                {String(countdown.minutes).padStart(2, "0")}
              </span>
              <span className="ac-countdown-label">Minutes</span>
            </div>

            <span className="ac-countdown-colon">:</span>

            <div className="ac-countdown-unit">
              <span className="ac-countdown-number">
                {String(countdown.seconds).padStart(2, "0")}
              </span>
              <span className="ac-countdown-label">Seconds</span>
            </div>
          </div>

          <p className="ac-countdown-footer">
            Every second brings us closer to our forever.
          </p>
        </div>

    
      </section>

{/* SECTION 6 — DAISY GARDEN RSVP */}
<section
  id="rsvp-section"
  className="relative isolate overflow-hidden bg-[#183D2C] py-20"
>
  {/* Daisy Garden Background */}
  <div
    className="absolute inset-0 -z-10 bg-cover bg-center"
    style={{
      backgroundImage: "url('/images/rsvp/daisy-garden-bg.png')",
    }}
  />

  {/* Soft Natural Overlay */}
<div className="absolute inset-0 -z-10 bg-black/20" />

  {/* RSVP Form */}
  <div className="relative z-10">
    <RSVP
      invitedGuest={invitedGuest}
      invitationCode={invitationCode}
    />
  </div>
</section>

{/* SECTION 7 — ROMANTIC GARDEN GUESTBOOK */}
<section
  id="guestbook-section"
  className="relative w-full overflow-hidden"
>
  <Guestbook
    guestName={invitedGuest?.guest_name ?? ""}
  />
</section>

{/* SECTION 8 — THE FINAL NOTE */}
<ClosingNote />

      <MusicPlayer audioRef={audioRef} />
    </main>
  );
}
