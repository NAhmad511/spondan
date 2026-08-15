import { Clock } from "@/components/Clock";
import { SocialLinks } from "@/components/SocialLinks";
import { Player } from "@/components/Player";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* Background */}
      <div
        className="hero-bg fixed top-0 left-0 w-full h-full -z-20"
        style={{
          backgroundImage: "url('/bg/scene-wide.png')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
      </div>

      {/* Grain Overlay */}
      <GrainOverlay />

      {/* Top Row: Clock, Listeners, Social Links */}
      <div className="relative w-full flex justify-between items-start p-4 safe-top z-10">
        {/* Clock (Top Left) */}
        <Clock />

        {/* Centered - could add listener count here */}
        <div className="flex-1" />

        {/* Social Links (Top Right) */}
        <SocialLinks />
      </div>

      {/* Player (Centered, Bottom) */}
      <div className="relative flex-1 flex items-end justify-center w-full pb-6 safe-bottom z-10 px-4">
        <div className="max-w-xl w-full">
          <Player />
        </div>
      </div>

      {/* Analytics */}
      <Analytics />
      <SpeedInsights />
    </main>
  );
}
