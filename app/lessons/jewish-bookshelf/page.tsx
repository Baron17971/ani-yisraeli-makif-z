import type { Metadata } from "next";
import { LegacyLessonPage } from "../../legacy-lesson-page";
import { lessons } from "../../data";

const lesson=lessons[1];
export const metadata:Metadata={title:`${lesson.title} | אני ישראלי`,description:lesson.hook};

const tools=[{
  title:"ערכים במבחן",
  description:"פעילות דיגיטלית מלווה לשיעור ארון הספרים היהודי.",
  url:"https://arachim-bamivhan.etty900.chatgpt.site/?utm_source=canva&utm_medium=iframely",
  label:"פתיחת הפעילות"
}];

export default function Page(){return <LegacyLessonPage index={1} tools={tools}/>;}
