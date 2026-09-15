"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const THEME_KEY = "ani-yisraeli-escape-theme";
type EscapeTheme = "night" | "day";

export default function GameThemeToggle() {
  const [theme, setTheme] = useState<EscapeTheme>("night");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let saved: EscapeTheme = "night";
    try {
      saved = window.localStorage.getItem(THEME_KEY) === "day" ? "day" : "night";
    } catch {}
    setTheme(saved);
    document.documentElement.dataset.escapeTheme = saved;
    setReady(true);

    return () => {
      delete document.documentElement.dataset.escapeTheme;
    };
  }, []);

  const toggleTheme = () => {
    const next: EscapeTheme = theme === "night" ? "day" : "night";
    setTheme(next);
    document.documentElement.dataset.escapeTheme = next;
    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {}
  };

  if (!ready) return null;

  const isDay = theme === "day";
  return (
    <button
      type="button"
      className="escape-theme-toggle"
      onClick={toggleTheme}
      aria-pressed={isDay}
      aria-label={isDay ? "מעבר למצב לילה" : "מעבר למצב יום"}
      title={isDay ? "מצב לילה" : "מצב יום"}
    >
      {isDay ? <Moon size={17}/> : <Sun size={17}/>} 
      <span>{isDay ? "מצב לילה" : "מצב יום"}</span>
    </button>
  );
}
