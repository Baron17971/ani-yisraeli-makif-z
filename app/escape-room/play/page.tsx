"use client";

import { useEffect, useRef, useState } from "react";
import GamePage from "./game-page";

const STORAGE_PREFIX = "ani-yisraeli-time-tunnel-v2";

export default function StudentEscapeRoomPage() {
  const [instance, setInstance] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = (params.get("room") ?? "").trim().toUpperCase();
    if (room) {
      try {
        const saved = window.localStorage.getItem(`${STORAGE_PREFIX}:${room}`);
        if (saved) {
          const parsed = JSON.parse(saved) as { stage?: number };
          startedRef.current = (parsed.stage ?? 0) >= 2;
        }
      } catch {}
    }

    const handleStart = () => {
      startedRef.current = true;
      setInstance(value => value + 1);
    };

    window.addEventListener("time-tunnel-start", handleStart);

    const observer = new MutationObserver(() => {
      if (!startedRef.current) return;
      if (document.querySelector(".game-intro")) {
        startedRef.current = false;
        window.dispatchEvent(new Event("time-tunnel-show-gate"));
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("time-tunnel-start", handleStart);
      observer.disconnect();
    };
  }, []);

  return <GamePage key={instance}/>;
}
