"use client";

import { useEffect, useRef, useState } from "react";
import GamePage from "./game-page";

export default function StudentEscapeRoomPage() {
  const [instance, setInstance] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
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
