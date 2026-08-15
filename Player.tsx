"use client";

import { useEffect, useRef, useState } from "react";
import { playlists, type Playlist, type Track } from "@/lib/playlists";
import { PlaylistSelector } from "./PlaylistSelector";
import { DesktopPlayer } from "./DesktopPlayer";
import { MobilePlayer } from "./MobilePlayer";

export function Player() {
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string>(playlists[0].id);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [elapsed, setElapsed] = useState<number>(0);
  const [iframeSrc, setIframeSrc] = useState<string>("");
  const [listeners, setListeners] = useState<number>(Math.floor(Math.random() * 1000) + 100);
  const playerRef = useRef<any>(null);
  const elapsedIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentPlaylist = playlists.find((p) => p.id === currentPlaylistId);
  const currentTrack = currentPlaylist?.tracks[currentTrackIndex];

  // Initialize YouTube IFrame API
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    (window as any).onYouTubeIframeAPIReady = () => {
      if (currentTrack?.videoId) {
        initializePlayer();
      }
    };
  }, []);

  // Initialize player when track changes
  useEffect(() => {
    if (currentTrack?.videoId && (window as any).YT) {
      initializePlayer();
    }
  }, [currentTrack?.videoId]);

  const initializePlayer = () => {
    if ((window as any).YT && (window as any).YT.Player) {
      if (playerRef.current instanceof (window as any).YT.Player) {
        playerRef.current.loadVideoById(currentTrack?.videoId);
      } else {
        playerRef.current = new (window as any).YT.Player("youtube-player", {
          width: "100%",
          height: "100%",
          videoId: currentTrack?.videoId,
          events: {
            onStateChange: onStateChange,
            onError: onError,
          },
          playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
          },
        });
      }
    }
  };

  const onStateChange = (event: any) => {
    const state = event.data;
    const YT = (window as any).YT;

    if (state === YT.PlayerState.PLAYING) {
      setIsPlaying(true);
      if (!elapsedIntervalRef.current) {
        elapsedIntervalRef.current = setInterval(() => {
          if (playerRef.current?.getCurrentTime) {
            setElapsed(playerRef.current.getCurrentTime());
          }
        }, 100);
      }
    } else if (state === YT.PlayerState.PAUSED) {
      setIsPlaying(false);
      if (elapsedIntervalRef.current) {
        clearInterval(elapsedIntervalRef.current);
        elapsedIntervalRef.current = null;
      }
    } else if (state === YT.PlayerState.ENDED) {
      nextTrack();
    }
  };

  const onError = (event: any) => {
    console.error("YouTube player error:", event.data);
    // Skip to next track on error
    nextTrack();
  };

  const togglePlay = () => {
    if (!currentTrack?.videoId) return;

    if (isPlaying) {
      playerRef.current?.pauseVideo();
    } else {
      playerRef.current?.playVideo();
    }
  };

  const previousTrack = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? (currentPlaylist?.tracks.length || 1) - 1 : prev - 1
    );
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) =>
      prev === (currentPlaylist?.tracks.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handlePlaylistChange = (playlistId: string) => {
    setCurrentPlaylistId(playlistId);
    setCurrentTrackIndex(0);
    setElapsed(0);
    setIsPlaying(false);
    if (elapsedIntervalRef.current) {
      clearInterval(elapsedIntervalRef.current);
      elapsedIntervalRef.current = null;
    }
  };

  const handleSeek = (time: number) => {
    if (playerRef.current?.seekTo) {
      playerRef.current.seekTo(time, true);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* YouTube Player - Hidden but actively playing */}
      <div id="youtube-player" className="hidden" />

      {/* Playlist Selector */}
      <PlaylistSelector
        playlists={playlists}
        currentPlaylistId={currentPlaylistId}
        onSelect={handlePlaylistChange}
      />

      {/* Desktop Player */}
      <DesktopPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        elapsed={elapsed}
        onTogglePlay={togglePlay}
        onPrevious={previousTrack}
        onNext={nextTrack}
        onSeek={handleSeek}
      />

      {/* Mobile Player */}
      <MobilePlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        elapsed={elapsed}
        onTogglePlay={togglePlay}
        onPrevious={previousTrack}
        onNext={nextTrack}
        onSeek={handleSeek}
      />

      {/* Listeners Count */}
      <div className="text-center text-xs text-white/60">
        {listeners} listening now
      </div>
    </div>
  );
}
