import type { ReactNode } from "react";
import GameShell from "./game-shell";
import "./student-experience.css";
import "./opening-gate.css";

export default function StudentPlayLayout({ children }: { children: ReactNode }) {
  return <GameShell>{children}</GameShell>;
}
