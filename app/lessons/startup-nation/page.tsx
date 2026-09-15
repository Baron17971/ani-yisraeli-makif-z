import type { Metadata } from "next";
import { LegacyLessonPage } from "../../legacy-lesson-page";
import { lessons } from "../../data";

const lesson=lessons[3];
export const metadata:Metadata={title:`${lesson.title} | אני ישראלי`,description:lesson.hook};

const prepItems=[
  {label:"הכנה",text:"מצגת פתוחה מראש"},
  {label:"ציוד",text:"טלפון או מחשב לכל קבוצה"},
  {label:"מבנה",text:"עבודה בקבוצות"},
  {label:"הדפסה",text:"דפי הפעילות של „קהילת אופק”"}
];
const objectiveTitles=["ידע והבנה","מיומנויות","בחינה היסטורית","חזון וסיכון"];
const stepLabels=["פתיחה","פעילות קבוצתית","בחינה היסטורית","סקר ודיון","תובנה מסכמת"];

export default function Page(){return <LegacyLessonPage index={3} showGuide={false} prepItems={prepItems} objectiveTitles={objectiveTitles} stepLabels={stepLabels} teacherNote="אפשר להתאים את עומק הדיון ואת משך הפעילות לקצב הכיתה. מומלץ להשאיר זמן מספק לדיון המסכם על קבלת החלטות בתנאי אי־ודאות."/>;}
