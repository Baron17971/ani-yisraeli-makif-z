import Link from "next/link";
import type { CSSProperties } from "react";
import { lessons, type LessonLink, type LessonMaterial } from "./data";

type Guide={title:string;description:string;url:string};
type PrepItem={label:string;text:string};

type Props={
  index:number;
  tools?:LessonLink[];
  materials?:LessonMaterial[];
  guide?:Guide;
  showGuide?:boolean;
  objectiveTitles?:string[];
  prepItems?:PrepItem[];
  stepLabels?:string[];
  teacherNote?:string;
};

export function LegacyLessonPage({index,tools,materials,guide,showGuide=true,objectiveTitles,prepItems,stepLabels,teacherNote}:Props){
  const lesson=lessons[index];
  const previous=lessons[index-1];
  const next=lessons[index+1];
  const goals=lesson.objectiveCards??(lesson.objectives??[]).map((text,i)=>({title:objectiveTitles?.[i]??`מטרה ${i+1}`,text}));
  const prep=prepItems??(lesson.prep??[]).map(text=>({label:"הכנה",text}));
  const lessonTools=tools??lesson.digitalTools??[];
  const lessonMaterials=(materials??lesson.materials??[]).filter(item=>item.url!==lesson.lessonUrl);
  const defaultGuide=lessonMaterials.find(item=>item.url&&item.title.includes("מערך"));
  const guideData=guide??(defaultGuide?.url?{title:defaultGuide.title,description:defaultGuide.description,url:defaultGuide.url}:undefined);
  const about=lesson.about??[];

  return <div className="legacy-lesson-page" style={{"--accent":lesson.accentColor} as CSSProperties}>
    <link rel="stylesheet" href="/lessons/teacher-portal.css"/>
    <header className="top"><div className="brand">✡ אני ישראלי</div><Link className="home" href="/lessons">כל השיעורים</Link></header>
    <div className="shell">
      <nav className="crumbs"><Link href="/">ראשי</Link> / <Link href="/lessons">השיעורים</Link> / {lesson.title}</nav>
      <header className="lesson-hero">
        <div><span className="tag">שיעור {String(index+1).padStart(2,"0")} | {lesson.category}</span><h1>{lesson.title}</h1><p className="hook">{lesson.hook}</p><div className="meta"><span>{lesson.duration?.replace(" דקות"," דק׳")??"90 דק׳"}</span><span>שכבת י׳</span><span>{lesson.lessonType}</span></div></div>
        <div className="cover"><img src={lesson.coverImage} alt={`שקף הפתיחה של ${lesson.title}`}/></div>
      </header>

      <div className="actions">
        <a className="action" href={lesson.lessonUrl} target="_blank" rel="noreferrer">מצגת השיעור</a>
        {showGuide?<a className="action" href={guideData?.url??"#teacher-guide"} target={guideData?"_blank":undefined} rel={guideData?"noreferrer":undefined}>מערך מלא למורה PDF</a>:<a className="action" href="#flow">מהלך השיעור</a>}
        <a className="action" href="#tools">כלים דיגיטליים</a>
        <a className="action" href="#materials">חומרים להורדה</a>
      </div>

      {about.length>0&&<section id="about"><h2>על השיעור</h2>{about.map(p=><p key={p}>{p}</p>)}</section>}

      <section id="goals"><h2>מטרות השיעור</h2><div className="goal-grid">{goals.map(g=><article className="small-card" key={g.title}><b>{g.title}</b><p>{g.text}</p></article>)}</div></section>

      {prep.length>0&&<section id="prep"><h2>לפני שמתחילים</h2><div className="prep-grid">{prep.map((p,i)=><div className="prep-item" key={`${p.text}-${i}`}><b>{p.label}</b>{p.text}</div>)}</div></section>}

      {lesson.steps&&<section id="flow"><h2>מהלך השיעור</h2><div className="flow">{lesson.steps.map((s,i)=><div className="flow-item" key={s.number}><span className="flow-num">{String(i+1).padStart(2,"0")}</span><div className="flow-title"><b>{s.title}</b>{(s.duration||stepLabels?.[i])&&<span>{s.duration??stepLabels?.[i]}</span>}</div><p>{s.description}{s.topics?.length?` ${s.topics.join(", ")}.`:""}</p></div>)}</div></section>}

      {showGuide&&<section id="teacher-guide"><h2>מערך מלא למורה</h2><div className="pdf-card">{guideData?<><div><b>{guideData.title}</b><p>{guideData.description}</p></div><a className="button-outline" href={guideData.url} target="_blank" rel="noreferrer">פתיחת המערך המלא PDF</a></>:<><div><b>מערך מפורט הכולל רקע תוכני, מטרות, מהלך מלא, שאלות לדיון ודגשים פדגוגיים.</b><p>קובץ ה־PDF של השיעור יתווסף כאן.</p></div><span className="button-outline">פתיחת המערך המלא PDF</span></>}</div></section>}

      {lesson.discussionQuestions&&<section id="discussion"><h2>שאלות לדיון</h2><div className="questions">{lesson.discussionQuestions.map(q=><div className="question" key={q}>{q}</div>)}</div></section>}

      <section id="tools"><h2>כלים דיגיטליים בשיעור</h2>{lessonTools.length?<div className="goal-grid">{lessonTools.map(tool=><a className="small-card" href={tool.url} target="_blank" rel="noreferrer" key={tool.title}><b>{tool.title}</b><p>{tool.description}</p><span className="button-outline">{tool.label}</span></a>)}</div>:<p className="empty">קישורים לכלים הדיגיטליים של שיעור זה יתווספו כאן.</p>}</section>

      <section id="materials"><h2>חומרים להורדה</h2>{lessonMaterials.length?<div className="questions">{lessonMaterials.map(material=>material.url?<a className="question" href={material.url} target="_blank" rel="noreferrer" key={material.title}><b>{material.title}</b><span> · {material.description}</span></a>:<div className="question" key={material.title}><b>{material.title}</b><span> · {material.description}</span></div>)}</div>:<p className="empty">דפי עבודה, כרטיסיות וקבצי הוראה יתווספו כאן.</p>}</section>

      <section id="presentation"><h2>מצגת השיעור</h2><div className="presentation"><img src={lesson.coverImage} alt=""/><div><b>{lesson.title}</b><p>המצגת תיפתח בכרטיסייה חדשה.</p></div><a className="button" href={lesson.lessonUrl} target="_blank" rel="noreferrer">פתיחת המצגת</a></div></section>

      <section><details><summary>דגשים למורה</summary><p>{teacherNote??"בחרו את היקף הדיון והפעילות בהתאם לאופי הכיתה ולזמן העומד לרשותכם."}</p></details><details><summary>הצעות להרחבה</summary><p>אפשר להרחיב באמצעות מקור נוסף, משימת כתיבה או פעילות המשך קבוצתית.</p></details></section>

      <nav className="nav-bottom" aria-label="מעבר בין שיעורים">{previous?<Link href={`/lessons/${previous.slug}`}>→ השיעור הקודם<br/>{previous.title}</Link>:<span/>}<Link className="all" href="/lessons">כל השיעורים</Link>{next?<Link href={`/lessons/${next.slug}`}>השיעור הבא ←<br/>{next.title}</Link>:<span/>}</nav>
    </div>
    <footer className="footer">© תשפ״ז | „אני ישראלי” | מקיף ז׳ אשדוד</footer>
    <style>{`
      .legacy-lesson-page .lesson-hero{display:grid!important;grid-template-columns:minmax(0,1.1fr) minmax(300px,.9fr)!important;gap:50px!important;align-items:center!important;padding-bottom:42px!important;border-bottom:1px solid var(--line)!important;aspect-ratio:auto!important;overflow:visible!important;background:transparent!important}
      .legacy-lesson-page .cover{aspect-ratio:16/9;overflow:hidden;background:var(--mist);border-bottom:5px solid var(--accent)}
      .legacy-lesson-page .cover img{width:100%;height:100%;object-fit:contain}
      .legacy-lesson-page #about p{max-width:940px;color:var(--muted);font-size:1rem}
      @media(max-width:800px){.legacy-lesson-page .lesson-hero{grid-template-columns:1fr!important;gap:25px!important;padding-bottom:42px!important}.legacy-lesson-page .cover{width:100%}}
    `}</style>
  </div>;
}
