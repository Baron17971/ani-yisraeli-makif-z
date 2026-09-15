import type { Metadata } from "next";
import { LegacyLessonPage } from "../../legacy-lesson-page";
import { lessons } from "../../data";

const lesson=lessons[4];
export const metadata:Metadata={title:`${lesson.title} | אני ישראלי`,description:lesson.hook};

const tools=[
  {title:"כשאחים שוכחים",description:"האפליקציה הכיתתית המלווה את פעילות השיעור.",url:"https://when-brothers-forget.baranat.chatgpt.site/teacher/LX24E",label:"פתיחת האפליקציה"},
  {title:"ענן מילים כיתתי",description:"פתיחת ענן מילים חדש לכיתה.",url:"https://disputes-word-cloud.baranat.chatgpt.site/",label:"פתיחת ענן מילים"}
];

const materials=[
  {title:"דפי פעילות לשיעור",description:"דפי חברותא ופעילות להדפסה",url:"/דפי פעילות לשיעור אלטלנה1.pdf",label:"פתיחת הדפים"},
  {title:"דומינו מסכם – אופציונלי",description:"פעילות סיכום להדפסה",url:"/דומינו שיעור אלטלנה_20260915_022455_0000.pdf",label:"פתיחת הדומינו"}
];

const guide={
  title:"מדריך מורחב למורה – אלטלנה: כשאחים שוכחים",
  description:"מערך מלא ל־90 דקות הכולל דגשי הוראה, שלבי שיעור, רקע לשמונת סיפורי המחלוקת והכנה לפני הכניסה לכיתה.",
  url:"/אלטלנה_כשאחים_שוכחים_מדריך_למורה_מורחב (1).pdf"
};

export default function Page(){return <LegacyLessonPage index={4} tools={tools} materials={materials} guide={guide}/>;}
