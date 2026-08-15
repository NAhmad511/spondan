"use client";

import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      const parts = formatter.formatToParts(now);
      let formatted = "";
      parts.forEach((part) => {
        if (part.type === "literal") {
          formatted += `<span class="colon-blink">${part.value}</span>`;
        } else {
          formatted += part.value;
        }
      });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <div className="text-xs text-white/70">--:--</div>;

  return (
    <div className="text-xs tabular-nums text-white/70 font-mono">
      <div dangerouslySetInnerHTML={{ __html: time }} />
    </div>
  );
}
