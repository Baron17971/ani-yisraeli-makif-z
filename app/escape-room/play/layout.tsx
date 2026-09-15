import type { ReactNode } from "react";
import OpeningGate from "./opening-gate";
import "./student-experience.css";
import "./opening-gate.css";

export default function StudentPlayLayout({ children }: { children: ReactNode }) {
  return <><OpeningGate/>{children}</>;
}
