import type { ReactNode } from "react";
import GameShell from "./game-shell";
import GameThemeToggle from "./game-theme-toggle";
import "./student-experience.css";
import "./opening-gate.css";
import "./waypoint-integrated.css";
import "./game-theme.css";
import "./escape-room-site-theme-hide.css";

// The shell owns the entire opening sequence so the game cannot advance behind it.
export default function StudentPlayLayout({ children }: { children: ReactNode }) {
  return <><GameShell>{children}</GameShell><GameThemeToggle/></>;
}
