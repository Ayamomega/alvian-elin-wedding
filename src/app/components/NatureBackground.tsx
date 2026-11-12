
"use client";

import { useEffect, useRef, useState } from "react";

type NatureBackgroundProps = {
  videoSrc?: string;
  posterSrc?: string;
  overlayOpacity?: number;
  className?: string;
};

export default function NatureBackground({
  videoSrc = "/videos/forest-daisies.mp4",
  posterSrc = "/images/nature/forest-daisies-poster.jpg",
  overlayOpacity = 0.22,
  className = "",
}: NatureBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateMotion = () => {
      setMotionAllowed(!media.matches);
    };

    updateMotion();
    media.addEventListener("change", updateMotion);

    return () => {
      media.removeEventListener("change", updateMotion);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !motionAllowed) return;

    const attemptPlay = () => {
      video.play().catch((error) => {
        console.warn("Autoplay belum berhasil:", error);
      });
    };

    video.addEventListener("canplay", attemptPlay);
    attemptPlay();

    return () => {
      video.removeEventListener("canplay", attemptPlay);
    };
  }, [motionAllowed]);

  return (
    <div
      className={`nature-background ${className}`}
      aria-hidden="true"
    >
      <div className="nature-fallback">
        <img src={posterSrc} alt="" />
      </div>

      {!videoFailed && (
        <video
          ref={videoRef}
          className="nature-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterSrc}
          onError={() => setVideoFailed(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      <div
        className="nature-overlay"
        style={{
          backgroundColor: `rgba(16, 29, 50, ${overlayOpacity})`,
        }}
      />
    </div>
  );
}
