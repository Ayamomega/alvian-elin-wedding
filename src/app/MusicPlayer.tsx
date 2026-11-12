
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
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause music" : "Play music"}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#E5D1A5] bg-gradient-to-br from-[#C5A46D] via-[#A9844F] to-[#79572F] text-[#FFF8E9] shadow-[0_5px_20px_rgba(80,55,25,0.35)] transition-all duration-500 hover:scale-110 hover:shadow-[0_6px_25px_rgba(169,132,79,0.5)] ${
          isPlaying ? "animate-[spin_8s_linear_infinite]" : ""
        }`}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F5E5C5]/70">
          {isPlaying ? (
            <span className="text-xl font-serif">Ⅱ</span>
          ) : (
            <span className="text-2xl">♫</span>
          )}
        </span>
      </button>
    </>
  );
};

export default MusicPlayer;
