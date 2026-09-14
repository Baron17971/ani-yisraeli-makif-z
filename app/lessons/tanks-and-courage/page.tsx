import type { Metadata } from "next";import { LessonView } from "../../lesson-view";import { lessons } from "../../data";
export const metadata:Metadata={title:`${lessons[1].title} | אני ישראלי`,description:lessons[1].hook};
export default function Page(){return <LessonView index={1}/>}
