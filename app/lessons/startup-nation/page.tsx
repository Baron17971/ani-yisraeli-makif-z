import type { Metadata } from "next";
import { LessonView } from "../../lesson-view";
import { lessons } from "../../data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: `${lessons[3].title} | אני ישראלי`,
  description: lessons[3].hook,
};

export default function Page() {
  return <LessonView index={3}/>;
}
