"use client";

import type { Track } from "@/lib/playlists";
import { formatTime } from "@/lib/utils";

interface MobilePlayerProps {
  currentTrack?: Track;
  isPlaying: boolean;
  elapsed: number;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
}

export function MobilePlayer({
  currentTrack,
  isPlaying,
  elapsed,
  onTogglePlay,
  onPrevious,
  onNext,
  onSeek,
}: MobilePlayerProps) {
  if (!currentTrack?.videoId) {
    return (
      <div className="sm:hidden px-4">
        <div className="glass rounded-[26px] p-4">
          <div className="text-sm text-white/60 text-center py-8">
            Add YouTube video IDs to songs to start playing
          </div>
        </div>
      </div>
    );
  }

  const progress = currentTrack.duration ? (elapsed / currentTrack.duration) * 100 : 0;

  return (
    <div className="sm:hidden px-4">
      <div className="glass rounded-[26px] p-4 space-y-4">
        {/* Row 1: Vinyl + Metadata */}
        <div className="flex gap-3">
          {/* Vinyl */}
          <div className="relative flex-shrink-0">
            <div
              className="w-16 h-16 rounded-full bg-gradient-to-b from-white/20 to-white/5 border border-white/20"
              style={{
                animation: isPlaying ? "spin 8s linear infinite" : "none",
              }}
            >
              <div className="w-full h-full" />
            </div>
            {/* Spindle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-black/70 rounded-full ring-2 ring-white/40" />
          </div>

          {/* Metadata */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-white truncate">
              {currentTrack.title}
            </div>
            <div className="text-xs text-white/70 truncate">
              {currentTrack.artist}
            </div>
          </div>
        </div>

        {/* Row 2: Seek bar */}
        <div className="space-y-1">
          <input
            type="range"
            min="0"
            max={currentTrack.duration || 100}
            value={elapsed}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            className="w-full h-1 bg-white/15 rounded-full appearance-none cursor-pointer accent-yellow-500 hover:h-1.5 transition-all touch-none"
            style={{
              backgroundImage: `linear-gradient(to right, #fbbf24 0%, #fbbf24 ${progress}%, rgb(255 255 255 / 0.15) ${progress}%, rgb(255 255 255 / 0.15) 100%)`,
            }}
          />
        </div>

        {/* Row 3: Time + Transport */}
        <div className="flex items-center gap-3 justify-between">
          {/* Time */}
          <div className="text-xs tabular-nums text-white/70 font-mono">
            {formatTime(Math.floor(elapsed))} / {formatTime(currentTrack.duration)}
          </div>

          {/* Transport */}
          <div className="flex items-center gap-2 flex-1 justify-center">
            <button
              onClick={onPrevious}
              className="p-2.5 hover:bg-white/10 rounded-full transition min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Previous track"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            <button
              onClick={onTogglePlay}
              className="w-13 h-13 rounded-full bg-gradient-to-b from-yellow-500 to-yellow-600 flex items-center justify-center ring-1 ring-white/25 shadow-lg hover:shadow-xl transition min-w-[52px] min-h-[52px]"
              style={{
                boxShadow:
                  "0 4px 20px -4px rgba(251, 191, 36, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.25)",
              }}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              onClick={onNext}
              className="p-2.5 hover:bg-white/10 rounded-full transition min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Next track"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 18h2V6h-2zm-11-7l8.5-6v12z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
