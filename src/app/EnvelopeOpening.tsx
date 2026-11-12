
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function Daisy({ className }: { className: string }) {
  return (
    <svg className={`daisy ${className}`} viewBox="0 0 120 190" fill="none">
      <path d="M60 75 Q45 125 62 185" stroke="#617746" strokeWidth="3" />
      <path d="M53 130 Q22 105 17 125 Q35 145 53 130Z" fill="#718951" />
      <path d="M59 155 Q88 125 99 143 Q82 165 59 155Z" fill="#718951" />
      <g transform="translate(60 55)">
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="-25"
            rx="8"
            ry="22"
            fill="#fffdf3"
            stroke="#e8e1cb"
            strokeWidth="1"
            transform={`rotate(${i * 30})`}
          />
        ))}
        <circle r="11" fill="#e6bd4d" />
        <circle r="5" fill="#f7df8b" />
      </g>
    </svg>
  );
}

function Butterfly({ className }: { className: string }) {
  return (
    <svg className={`butterfly ${className}`} viewBox="0 0 70 50">
      <g className="wings">
        <path d="M34 25 C12 -5 0 7 10 27 C17 42 29 34 34 25Z" fill="#fffdf2" />
        <path d="M36 25 C58 -5 70 7 60 27 C53 42 41 34 36 25Z" fill="#fffdf2" />
        <path d="M34 26 C16 25 15 43 27 42 C34 39 35 32 34 26Z" fill="#eee7d5" />
        <path d="M36 26 C54 25 55 43 43 42 C36 39 35 32 36 26Z" fill="#eee7d5" />
      </g>
      <path d="M35 19 L35 38" stroke="#6b5943" strokeWidth="2" />
      <path d="M35 20 Q27 8 25 11 M35 20 Q43 8 45 11" stroke="#6b5943" strokeWidth="1" fill="none" />
    </svg>
  );
}

export default function EnvelopeOpening() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, {
        y: 45,
        rotation: -1.5,
        scale: 0.96,
        autoAlpha: 0,
      });

      gsap.set(buttonRef.current, {
        y: 15,
        autoAlpha: 0,
      });

      gsap.set(nextRef.current, {
        autoAlpha: 0,
        y: 35,
      });

      const intro = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      intro
        .to(cardRef.current, {
          y: 0,
          rotation: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 1.4,
          delay: 0.2,
        })
        .from(".card-kicker, .card-flower, .card-copy, .card-names, .card-date, .card-footer", {
          y: 18,
          autoAlpha: 0,
          duration: 1,
          stagger: 0.16,
          ease: "power2.out",
        }, "-=0.7")
        .to(buttonRef.current, {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
        }, "-=0.35");

      gsap.to(".sun-glow", {
        opacity: 0.8,
        scale: 1.12,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".leaf", {
        rotation: (i) => (i % 2 ? 5 : -5),
        transformOrigin: "top center",
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
        ease: "sine.inOut",
      });

      gsap.to(".daisy", {
        rotation: (i) => (i % 2 ? 4 : -4),
        transformOrigin: "50% 100%",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.7,
        ease: "sine.inOut",
      });

      gsap.to(".butterfly", {
        keyframes: [
          { x: 20, y: -22, rotation: 8, duration: 2.5 },
          { x: -12, y: -42, rotation: -7, duration: 2.7 },
          { x: 30, y: -12, rotation: 5, duration: 2.4 },
          { x: 0, y: 0, rotation: 0, duration: 2.5 },
        ],
        repeat: -1,
        ease: "sine.inOut",
        stagger: 1.3,
      });
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  const openInvitation = () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setOpened(true);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const tl = gsap.timeline();

    if (reduced) {
      tl.set(contentRef.current, { autoAlpha: 0 })
        .set(nextRef.current, { autoAlpha: 1, y: 0 });
      return;
    }

    tl.to(buttonRef.current, {
      autoAlpha: 0,
      y: 12,
      duration: 0.4,
    })
      .to(cardRef.current, {
        scale: 1.12,
        duration: 1.3,
        ease: "power2.inOut",
      })
      .to(contentRef.current, {
        autoAlpha: 0,
        y: -25,
        duration: 0.9,
        ease: "power2.inOut",
      }, "-=0.4")
      .to(nextRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.3,
        ease: "power2.inOut",
      }, "-=0.35");
  };

  return (
    <main className="garden-scene" ref={sceneRef}>
      {/* Forest atmosphere */}
      <div className="garden-background">
        <div className="sun-glow" />
        <div className="forest-haze" />
        <div className="forest-floor" />

        <div className="branch branch-left">
          <span className="leaf leaf-one" />
          <span className="leaf leaf-two" />
          <span className="leaf leaf-three" />
          <span className="leaf leaf-four" />
        </div>

        <div className="branch branch-right">
          <span className="leaf leaf-one" />
          <span className="leaf leaf-two" />
          <span className="leaf leaf-three" />
          <span className="leaf leaf-four" />
        </div>
      </div>

      {/* Living flowers */}
      <div className="flower-garden">
        <Daisy className="daisy-one" />
        <Daisy className="daisy-two" />
        <Daisy className="daisy-three" />
        <Daisy className="daisy-four" />
        <Daisy className="daisy-five" />
        <Daisy className="daisy-six" />
      </div>

      {/* Flying butterflies */}
      <Butterfly className="butterfly-one" />
      <Butterfly className="butterfly-two" />
      <Butterfly className="butterfly-three" />
      <Butterfly className="butterfly-four" />

      {/* Opening content */}
      <div className="content-layer" ref={contentRef}>
        <p className="top-label">
          TOGETHER WITH OUR FAMILIES
        </p>

        <div className="paper-card" ref={cardRef}>
          <div className="paper-texture" />

          <div className="paper-botanical top-botanical">
            <span>❧</span>
            <span>✿</span>
          </div>

          <div className="paper-inner">
            <p className="card-kicker">
              A LITTLE STORY OF LOVE
            </p>

            <span className="card-flower">❧</span>

            <p className="card-copy">
              You are warmly invited to
              <br />
              celebrate the marriage of
            </p>

            <h1 className="card-names">
              Alviyan
              <span>&</span>
              Cherline
            </h1>

            <div className="card-divider">
              <span />
              ✦
              <span />
            </div>

            <p className="card-date">
              21 · 10 · 2028
            </p>

            <p className="card-footer">
              WITH LOVE AND BLESSINGS
            </p>
          </div>

          <div className="paper-botanical bottom-botanical">
            <span>❧</span>
            <span>✿</span>
          </div>
        </div>

        <p className="beginning-note">
          A beautiful beginning awaits
        </p>

        <button
          ref={buttonRef}
          className="invitation-button"
          onClick={openInvitation}
          disabled={opened}
        >
          OPEN OUR INVITATION
          <span>→</span>
        </button>

        <p className="bottom-signature">
          ✿ &nbsp; ALVIYAN & CHERLINE &nbsp; ✿
        </p>
      </div>

      {/* Next scene reveal */}
      <div className="next-scene" ref={nextRef}>
        <p className="next-kicker">A NEW CHAPTER BEGINS</p>
        <h2>We're getting married!</h2>
        <div className="next-divider">✦</div>
        <p className="next-date">21 · 10 · 2028</p>
        <p className="next-names">Alviyan & Cherline</p>
        <p className="next-message">
          Two hearts, one beautiful story.
        </p>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .garden-scene {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 100svh;
          padding: 36px 16px 48px;
          overflow: hidden;
          isolation: isolate;
          color: #3A2A1F;
          background: #182516;
        }

        .garden-background {
          position: absolute;
          z-index: -3;
          inset: 0;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 80% 15%, #a2a66b 0%, transparent 30%),
            radial-gradient(ellipse at 20% 65%, #526b3d 0%, transparent 40%),
            linear-gradient(145deg, #263a20, #172516 65%, #10190f);
        }

        .sun-glow {
          position: absolute;
          top: -12%;
          right: -20%;
          width: 85%;
          height: 60%;
          border-radius: 50%;
          opacity: .55;
          background: radial-gradient(
            ellipse,
            #f6dfa0aa 0%,
            #d4c47a33 35%,
            transparent 70%
          );
          filter: blur(24px);
        }

        .forest-haze {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 50% 45%, transparent 20%, #0d170e99 100%),
            linear-gradient(180deg, #10180d33, #3a2a1f33 60%, #0d170e88);
        }

        .forest-floor {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 30%;
          background: radial-gradient(ellipse at 50% 100%, #60734355, transparent 70%);
          filter: blur(20px);
        }

        .branch {
          position: absolute;
          top: -5%;
          width: 150px;
          height: 200px;
          border-left: 4px solid #35482a;
          transform-origin: top center;
        }

        .branch-left {
          left: 0;
          transform: rotate(-35deg);
        }

        .branch-right {
          right: 0;
          transform: rotate(35deg) scaleX(-1);
        }

        .leaf {
          position: absolute;
          width: 45px;
          height: 20px;
          border-radius: 100% 0 100% 0;
          background: linear-gradient(135deg, #718b4c, #293e25);
          box-shadow: 0 3px 9px #0004;
        }

        .leaf-one { top: 35px; left: -4px; transform: rotate(-25deg); }
        .leaf-two { top: 70px; left: 25px; transform: rotate(35deg); }
        .leaf-three { top: 105px; left: -18px; transform: rotate(-10deg); }
        .leaf-four { top: 140px; left: 15px; transform: rotate(45deg); }

        .content-layer {
          position: relative;
          z-index: 4;
          display: flex;
          width: 100%;
          max-width: 430px;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .top-label {
          margin-bottom: 23px;
          color: #F6F0E4;
          font-size: 9px;
          letter-spacing: .28em;
          text-shadow: 0 2px 10px #0009;
        }

        .paper-card {
          position: relative;
          width: min(88vw, 360px);
          min-height: 485px;
          padding: 17px;
          overflow: hidden;
          background:
            repeating-linear-gradient(
              90deg,
              #ffffff09 0 2px,
              #806b4c08 2px 3px
            ),
            linear-gradient(145deg, #fff9e9, #f1e6d2);
          clip-path: polygon(
            2% 1%, 98% 0%, 99% 3%, 98% 8%, 100% 15%,
            99% 25%, 100% 38%, 98% 50%, 100% 65%,
            98% 80%, 99% 96%, 96% 99%, 80% 98%,
            65% 100%, 48% 98%, 30% 100%, 12% 98%,
            2% 100%, 1% 92%, 0% 80%, 2% 65%,
            0% 50%, 2% 35%, 0% 20%, 2% 10%
          );
          box-shadow: 0 22px 55px #0007;
        }

        .paper-texture {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .4;
          background:
            repeating-linear-gradient(0deg, transparent 0 4px, #a18a6510 4px 5px),
            radial-gradient(ellipse at 20% 20%, #fff9, transparent 65%);
        }

        .paper-inner {
          position: relative;
          z-index: 2;
          min-height: 450px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 15px 6px;
        }

        .paper-botanical {
          position: absolute;
          z-index: 3;
          color: #82906a;
          opacity: .75;
          font-size: 40px;
          pointer-events: none;
        }

        .paper-botanical span:last-child {
          display: block;
          font-size: 23px;
          color: #c5a96c;
        }

        .top-botanical {
          top: 10px;
          left: 12px;
          transform: rotate(-30deg);
        }

        .bottom-botanical {
          bottom: 8px;
          right: 12px;
          transform: rotate(150deg);
        }

        .card-kicker {
          color: #806b4e;
          font-size: 9px;
          letter-spacing: .25em;
        }

        .card-flower {
          margin: 22px 0;
          color: #b89a63;
          font-size: 30px;
        }

        .card-copy {
          color: #5c4935;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 18px;
          font-style: italic;
          line-height: 1.45;
        }

        .card-names {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 25px;
          color: #3A2A1F;
          font-family: "Pinyon Script", cursive;
          font-size: clamp(55px, 14vw, 70px);
          font-weight: 400;
          line-height: .83;
        }

        .card-names span {
          margin: 9px 0;
          color: #b38e4d;
          font-size: 35px;
          line-height: 1;
        }

        .card-divider {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-top: 25px;
          color: #b38e4d;
          font-size: 13px;
        }

        .card-divider span {
          width: 48px;
          height: 1px;
          background: #bda06b;
        }

        .card-date {
          margin-top: 18px;
          color: #493a2b;
          font-size: 13px;
          letter-spacing: .3em;
        }

        .card-footer {
          margin-top: 24px;
          color: #887657;
          font-size: 8px;
          letter-spacing: .22em;
        }

        .beginning-note {
          margin-top: 22px;
          color: #fff8e9;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 21px;
          font-style: italic;
          text-shadow: 0 2px 12px #0009;
        }

        .invitation-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          min-width: 225px;
          min-height: 51px;
          margin-top: 21px;
          padding: 0 23px;
          border: 1px solid #d8bd8a;
          border-radius: 40px;
          background: #1D2C4D;
          color: #F6F0E4;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 11px;
          letter-spacing: .2em;
          box-shadow: 0 7px 25px #0005;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .invitation-button span {
          color: #d8bd8a;
          font-size: 18px;
        }

        .invitation-button:disabled {
          opacity: .5;
          pointer-events: none;
        }

        .bottom-signature {
          margin-top: 25px;
          color: #F6F0E4;
          font-size: 8px;
          letter-spacing: .22em;
          text-shadow: 0 2px 8px #0009;
        }

        .flower-garden {
          position: absolute;
          z-index: 2;
          inset: 0;
          pointer-events: none;
        }

        .daisy {
          position: absolute;
          width: 100px;
          height: 155px;
          filter: drop-shadow(0 4px 8px #0004);
        }

        .daisy-one { bottom: -18px; left: -20px; width: 125px; }
        .daisy-two { bottom: -28px; right: -20px; width: 130px; }
        .daisy-three { bottom: 10px; left: 20%; width: 75px; }
        .daisy-four { bottom: 15px; right: 22%; width: 75px; }
        .daisy-five { top: 8%; left: -28px; width: 70px; opacity: .8; }
        .daisy-six { top: 10%; right: -30px; width: 70px; opacity: .8; }

        .butterfly {
          position: absolute;
          z-index: 3;
          width: 35px;
          height: 27px;
          filter: drop-shadow(0 2px 5px #0005);
          pointer-events: none;
        }

        .wings {
          transform-box: fill-box;
          transform-origin: center;
          animation: flap .22s ease-in-out infinite alternate;
        }

        .butterfly-one { top: 22%; left: 5%; }
        .butterfly-two { top: 42%; right: 5%; width: 27px; }
        .butterfly-three { bottom: 23%; left: 12%; width: 30px; }
        .butterfly-four { top: 13%; right: 20%; width: 23px; }

        @keyframes flap {
          from { transform: scaleX(1); }
          to { transform: scaleX(.18); }
        }

        .next-scene {
          position: absolute;
          z-index: 8;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          text-align: center;
          color: #F6F0E4;
          background:
            radial-gradient(ellipse at 50% 35%, #66764b88, transparent 55%),
            linear-gradient(145deg, #1d2c4d, #182516);
        }

        .next-kicker {
          font-size: 9px;
          letter-spacing: .3em;
        }

        .next-scene h2 {
          margin-top: 25px;
          font-family: "Pinyon Script", cursive;
          font-size: clamp(48px, 12vw, 65px);
          font-weight: 400;
        }

        .next-divider {
          margin: 25px 0;
          color: #d8bd8a;
        }

        .next-date {
          letter-spacing: .25em;
          font-size: 13px;
        }

        .next-names {
          margin-top: 25px;
          font-family: "Pinyon Script", cursive;
          font-size: 42px;
        }

        .next-message {
          margin-top: 20px;
          font-size: 17px;
          font-style: italic;
        }

        @media (max-height: 760px) {
          .garden-scene {
            padding-top: 20px;
            padding-bottom: 30px;
          }

          .paper-card {
            min-height: 420px;
          }

          .paper-inner {
            min-height: 390px;
          }

          .card-flower {
            margin: 13px 0;
          }

          .card-names {
            font-size: 58px;
            margin-top: 17px;
          }

          .card-divider {
            margin-top: 17px;
          }

          .beginning-note {
            margin-top: 13px;
          }

          .invitation-button {
            margin-top: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wings {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
