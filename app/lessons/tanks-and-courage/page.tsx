import type { Metadata } from "next";import { LessonView } from "../../lesson-view";import { lessons } from "../../data";
export const metadata:Metadata={title:`${lessons[2].title} | אני ישראלי`,description:lessons[2].hook};
export default function Page(){return <LessonView index={2}/>}
