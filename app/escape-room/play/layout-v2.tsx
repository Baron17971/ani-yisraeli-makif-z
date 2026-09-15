import type { ReactNode } from "react";
import OpeningGateV2 from "./opening-gate-v2";
import GameFeedbackV2 from "./game-feedback-v2";
import "./student-experience.css";
import "./opening-gate.css";

export default function StudentPlayLayoutV2({ children }: { children: ReactNode }) {
  return <><OpeningGateV2/>{children}<GameFeedbackV2/></>;
}
