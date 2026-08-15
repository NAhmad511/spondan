"use client";

import type { Playlist } from "@/lib/playlists";

interface PlaylistSelectorProps {
  playlists: Playlist[];
  currentPlaylistId: string;
  onSelect: (playlistId: string) => void;
}

export function PlaylistSelector({
  playlists,
  currentPlaylistId,
  onSelect,
}: PlaylistSelectorProps) {
  return (
    <div className="flex gap-2 justify-center flex-wrap px-4">
      {playlists.map((playlist) => (
        <button
          key={playlist.id}
          onClick={() => onSelect(playlist.id)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition ${
            currentPlaylistId === playlist.id
              ? "bg-yellow-500 text-black"
              : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white/90"
          }`}
        >
          {playlist.nameLocal}
        </button>
      ))}
    </div>
  );
}
