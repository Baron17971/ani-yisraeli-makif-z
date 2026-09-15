import type { ReactNode } from "react";
import OpeningGate from "./opening-gate";
import GameFeedback from "./game-feedback";
import "./student-experience.css";
import "./opening-gate.css";
import "./game-feedback.css";

export default function StudentPlayLayout({ children }: { children: ReactNode }) {
  return <><OpeningGate/>{children}<GameFeedback/></>;
}
