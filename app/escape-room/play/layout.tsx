import type { ReactNode } from "react";
import GameShell from "./game-shell";
import "./student-experience.css";
import "./opening-gate.css";

// The shell owns the entire opening sequence so the game cannot advance behind it.
export default function StudentPlayLayout({ children }: { children: ReactNode }) {
  return <GameShell>{children}</GameShell>;
}
