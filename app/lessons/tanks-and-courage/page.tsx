import type { Metadata } from "next";
import { LegacyLessonPage } from "../../legacy-lesson-page";
import { lessons } from "../../data";

const lesson=lessons[2];
export const metadata:Metadata={title:`${lesson.title} | אני ישראלי`,description:lesson.hook};

export default function Page(){return <LegacyLessonPage index={2}/>;}
