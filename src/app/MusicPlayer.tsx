
"use client";

import { useState, type RefObject } from "react";

type MusicPlayerProps = {
  audioRef: RefObject<HTMLAudioElement | null>;
};

const MusicPlayer = ({ audioRef }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (error) {
        console.error("Music playback failed:", error);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/wedding-song.mp3"
        loop
        preload="auto"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-amber-800 text-white shadow-lg flex items-center justify-center hover:bg-amber-900 transition"
      >
        <span className="text-2xl">
          {isPlaying ? "Ⅱ" : "♫"}
        </span>
      </button>
    </>
  );
};

export default MusicPlayer;
