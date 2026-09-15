import type { ReactNode } from "react";
import AmbientSound from "./ambient-sound";
import "./student-experience.css";

export default function StudentPlayLayout({ children }: { children: ReactNode }) {
  return <>{children}<AmbientSound/></>;
}
