import Link from "next/link";
import type { CSSProperties } from "react";
import { ExternalLink, Link2 } from "lucide-react";
import { lessons, type LessonLink, type LessonMaterial } from "./data";

type Guide={title:string;description:string;url:string};
type PrepItem={label:string;text:string};
type CompanionApp={title:string;description:string;url:string;shortUrl:string};

const companionApps:Record<string,CompanionApp>={
  "tanks-and-courage":{
    title:"מטנקי עמק הבכא לטנקיסטיות בחולית",
    description:"האפליקציה המלווה מרכזת את הפעילויות החיות של השיעור ומאפשרת למורה לנהל את הכיתה, התוצאות ותצוגת המקרן ממקום אחד.",
    url:"https://tanks-hulit-live.vercel.app",
    shortUrl:"tanks-hulit-live.vercel.app"
  },
  "startup-nation":{
    title:"אם מדינה הייתה סטארט־אפ",
    description:"האפליקציה המלווה מרכזת את הפעילות הכיתתית, הסקר ותצוגת המקרן של השיעור במקום אחד.",
    url:"https://startup-state-live.vercel.app",
    shortUrl:"startup-state-live.vercel.app"
  },
  "brothers-and-disputes":{
    title:"כשאחים שוכחים",
    description:"האפליקציה המלווה מרכזת את הלמידה בחברותא, ענן המילים, האמנה הכיתתית, מד החום ותצוגת המקרן.",
    url:"https://brothers-forget-live.vercel.app",
    shortUrl:"brothers-forget-live.vercel.app"
  }
};

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
  const companionApp=companionApps[lesson.slug];

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
        {companionApp?<a className="action companion-action" href={companionApp.url} target="_blank" rel="noreferrer">אפליקציה מלווה <ExternalLink size={15}/></a>:<a className="action" href="#tools">כלים דיגיטליים</a>}
        <a className="action" href="#materials">חומרים להורדה</a>
      </div>

      <div className={`lesson-body-layout${companionApp?" has-companion":""}`}>
        <div className="lesson-body-main">
          {about.length>0&&<section id="about"><h2>על השיעור</h2>{about.map(p=><p key={p}>{p}</p>)}</section>}

          <section id="goals"><h2>מטרות השיעור</h2><div className="goal-grid">{goals.map(g=><article className="small-card" key={g.title}><b>{g.title}</b><p>{g.text}</p></article>)}</div></section>

          {prep.length>0&&<section id="prep"><h2>לפני שמתחילים</h2><div className="prep-grid">{prep.map((p,i)=><div className="prep-item" key={`${p.text}-${i}`}><b>{p.label}</b>{p.text}</div>)}</div></section>}

          {lesson.steps&&<section id="flow"><h2>מהלך השיעור</h2><div className="flow">{lesson.steps.map((s,i)=><div className="flow-item" key={s.number}><span className="flow-num">{String(i+1).padStart(2,"0")}</span><div className="flow-title"><b>{s.title}</b>{(s.duration||stepLabels?.[i])&&<span>{s.duration??stepLabels?.[i]}</span>}</div><p>{s.description}{s.topics?.length?` ${s.topics.join(", ")}.`:""}</p></div>)}</div></section>}

          {showGuide&&<section id="teacher-guide"><h2>מערך מלא למורה</h2><div className="pdf-card">{guideData?<><div><b>{guideData.title}</b><p>{guideData.description}</p></div><a className="button-outline" href={guideData.url} target="_blank" rel="noreferrer">פתיחת המערך המלא PDF</a></>:<><div><b>מערך מפורט הכולל רקע תוכני, מטרות, מהלך מלא, שאלות לדיון ודגשים פדגוגיים.</b><p>קובץ ה־PDF של השיעור יתווסף כאן.</p></div><span className="button-outline">פתיחת המערך המלא PDF</span></>}</div></section>}

          {lesson.discussionQuestions&&<section id="discussion"><h2>שאלות לדיון</h2><div className="questions">{lesson.discussionQuestions.map(q=><div className="question" key={q}>{q}</div>)}</div></section>}

          {!companionApp&&<section id="tools"><h2>כלים דיגיטליים בשיעור</h2>{lessonTools.length?<div className="goal-grid">{lessonTools.map(tool=><a className="small-card" href={tool.url} target="_blank" rel="noreferrer" key={tool.title}><b>{tool.title}</b><p>{tool.description}</p><span className="button-outline">{tool.label}</span></a>)}</div>:<p className="empty">קישורים לכלים הדיגיטליים של שיעור זה יתווספו כאן.</p>}</section>}

          <section id="materials"><h2>חומרים להורדה</h2>{lessonMaterials.length?<div className="questions">{lessonMaterials.map(material=>material.url?<a className="question" href={material.url} target="_blank" rel="noreferrer" key={material.title}><b>{material.title}</b><span> · {material.description}</span></a>:<div className="question" key={material.title}><b>{material.title}</b><span> · {material.description}</span></div>)}</div>:<p className="empty">דפי עבודה, כרטיסיות וקבצי הוראה יתווספו כאן.</p>}</section>

          <section id="presentation"><h2>מצגת השיעור</h2><div className="presentation"><img src={lesson.coverImage} alt=""/><div><b>{lesson.title}</b><p>המצגת תיפתח בכרטיסייה חדשה.</p></div><a className="button" href={lesson.lessonUrl} target="_blank" rel="noreferrer">פתיחת המצגת</a></div></section>

          <section><details><summary>דגשים למורה</summary><p>{teacherNote??"בחרו את היקף הדיון והפעילות בהתאם לאופי הכיתה ולזמן העומד לרשותכם."}</p></details><details><summary>הצעות להרחבה</summary><p>אפשר להרחיב באמצעות מקור נוסף, משימת כתיבה או פעילות המשך קבוצתית.</p></details></section>
        </div>

        {companionApp&&<aside className="companion-launch" aria-labelledby={`companion-title-${lesson.slug}`}>
          <span className="companion-launch-icon"><Link2 size={26}/></span>
          <p className="companion-kicker">אפליקציה מלווה</p>
          <h2 id={`companion-title-${lesson.slug}`}>פתיחת האפליקציה לכיתה</h2>
          <p>{companionApp.description}</p>
          <div className="companion-shortcut">
            <span>קישור ישיר</span>
            <code dir="ltr">{companionApp.shortUrl}</code>
          </div>
          <a className="companion-open" href={companionApp.url} target="_blank" rel="noreferrer">פתיחת האפליקציה <ExternalLink size={17}/></a>
        </aside>}
      </div>

      <nav className="nav-bottom" aria-label="מעבר בין שיעורים">{previous?<Link href={`/lessons/${previous.slug}`}>→ השיעור הקודם<br/>{previous.title}</Link>:<span/>}<Link className="all" href="/lessons">כל השיעורים</Link>{next?<Link href={`/lessons/${next.slug}`}>השיעור הבא ←<br/>{next.title}</Link>:<span/>}</nav>
    </div>
    <footer className="footer">© 2026 ענת ברון־לוביש, אתי נייברג ונטלי בן חמו. כל הזכויות שמורות. אין להעתיק, להפיץ, לפרסם, לשנות או לעשות בתכנים שימוש מסחרי ללא אישור מראש ובכתב מבעלות הזכויות.</footer>
    <style>{`
      .legacy-lesson-page .shell{padding-top:32px}
      .legacy-lesson-page .crumbs{margin-bottom:22px}
      .legacy-lesson-page .lesson-hero{display:grid!important;grid-template-columns:minmax(0,1.1fr) minmax(300px,.9fr)!important;gap:50px!important;align-items:center!important;padding-bottom:42px!important;border-bottom:1px solid var(--line)!important;aspect-ratio:auto!important;overflow:visible!important;background:transparent!important}
      .legacy-lesson-page .lesson-hero .tag{display:block;margin-bottom:10px;font-size:.86rem;letter-spacing:.035em}
      .legacy-lesson-page .lesson-hero h1{margin:0!important;font-size:clamp(2.75rem,5vw,4.9rem)!important;line-height:1!important;letter-spacing:-.05em!important}
      .legacy-lesson-page .lesson-hero .hook{margin-top:14px!important;max-width:640px;font-size:clamp(1rem,1.45vw,1.15rem)!important;line-height:1.65}
      .legacy-lesson-page .lesson-hero .meta{margin-top:18px!important}
      .legacy-lesson-page .cover{aspect-ratio:16/9;overflow:hidden;background:var(--mist);border-bottom:5px solid var(--accent)}
      .legacy-lesson-page .cover img{width:100%;height:100%;object-fit:cover;object-position:center}
      .legacy-lesson-page #about p{max-width:780px;color:var(--muted);font-size:1rem;line-height:1.9}
      .legacy-lesson-page details p{max-width:780px;line-height:1.85}
      .legacy-lesson-page .pdf-card p{max-width:760px}
      .legacy-lesson-page .companion-action{display:flex!important;align-items:center;justify-content:center;gap:7px}
      .legacy-lesson-page .lesson-body-layout{display:block}
      .legacy-lesson-page .lesson-body-layout.has-companion{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:42px;align-items:start}
      .legacy-lesson-page .lesson-body-main{min-width:0}
      .legacy-lesson-page .companion-launch{position:sticky;top:92px;margin-top:36px;padding:25px;border:1px solid #d5e2df;border-radius:20px;background:#fff;box-shadow:0 18px 48px rgba(16,45,64,.1);text-align:right}
      .legacy-lesson-page .companion-launch-icon{display:grid;width:52px;height:52px;place-items:center;margin-bottom:16px;border-radius:15px;background:#e8f4f2;color:var(--accent)}
      .legacy-lesson-page .companion-kicker{margin:0 0 8px;color:var(--accent);font-size:.84rem;font-weight:800;letter-spacing:.035em}
      .legacy-lesson-page .companion-launch h2{margin:0;color:var(--navy);font-size:1.8rem;line-height:1.12;letter-spacing:-.025em}
      .legacy-lesson-page .companion-launch>p:not(.companion-kicker){margin:13px 0 0;color:#627983;line-height:1.75;font-size:.93rem}
      .legacy-lesson-page .companion-shortcut{display:grid;gap:7px;margin-top:20px}
      .legacy-lesson-page .companion-shortcut span{color:#173b4c;font-size:.82rem;font-weight:800}
      .legacy-lesson-page .companion-shortcut code{display:block;padding:10px 11px;border:1px solid #d9e4e2;border-radius:10px;background:#f7fbfa;color:#597078;font-family:inherit;font-size:.78rem;text-align:left;word-break:break-all}
      .legacy-lesson-page .companion-open{min-height:49px;margin-top:12px;display:flex;align-items:center;justify-content:center;gap:7px;border-radius:11px;background:var(--accent);color:#fff;font-weight:900;text-align:center;box-shadow:0 8px 18px rgba(16,45,64,.12);transition:transform .18s ease,filter .18s ease}
      .legacy-lesson-page .companion-open:hover{transform:translateY(-1px);filter:brightness(.95)}
      .site-dark .legacy-lesson-page .companion-launch{background:#172c35;border-color:#314852;box-shadow:0 18px 48px rgba(0,0,0,.22)}
      .site-dark .legacy-lesson-page .companion-launch h2,.site-dark .legacy-lesson-page .companion-shortcut span{color:#edf5f5}
      .site-dark .legacy-lesson-page .companion-launch>p:not(.companion-kicker){color:#b4c5ca}
      .site-dark .legacy-lesson-page .companion-shortcut code{background:#102129;border-color:#314852;color:#c5d3d6}
      @media(max-width:980px){
        .legacy-lesson-page .lesson-body-layout.has-companion{grid-template-columns:1fr;gap:0}
        .legacy-lesson-page .companion-launch{position:static;order:-1;margin-top:28px;margin-bottom:12px}
      }
      @media(max-width:800px){
        .legacy-lesson-page .shell{padding-top:24px}
        .legacy-lesson-page .crumbs{margin-bottom:18px}
        .legacy-lesson-page .lesson-hero{grid-template-columns:1fr!important;gap:25px!important;padding-bottom:42px!important}
        .legacy-lesson-page .lesson-hero .tag{margin-bottom:8px}
        .legacy-lesson-page .lesson-hero h1{font-size:clamp(2.45rem,11vw,3.35rem)!important}
        .legacy-lesson-page .lesson-hero .hook{max-width:none;margin-top:12px!important;font-size:1rem!important}
        .legacy-lesson-page .cover{width:100%}
        .legacy-lesson-page #about p,.legacy-lesson-page details p,.legacy-lesson-page .pdf-card p{max-width:none}
      }
      @media(max-width:700px){
        .legacy-lesson-page .top{padding:0 18px}
        .legacy-lesson-page .home{display:flex;align-items:center;min-height:44px}
        .legacy-lesson-page .shell{padding:22px 18px 58px}
        .legacy-lesson-page .crumbs{overflow:hidden;margin-bottom:16px;white-space:nowrap;text-overflow:ellipsis}
        .legacy-lesson-page .lesson-hero{gap:22px!important;padding-bottom:34px!important}
        .legacy-lesson-page .lesson-hero h1{font-size:clamp(2.35rem,10.5vw,3.05rem)!important;line-height:1.03!important}
        .legacy-lesson-page .lesson-hero .meta{margin-top:15px!important;gap:6px}
        .legacy-lesson-page .actions{gap:8px;margin:26px 0 40px}
        .legacy-lesson-page .action{display:grid;place-items:center;min-height:50px;padding:9px 8px;font-size:.84rem;line-height:1.35}
        .legacy-lesson-page .companion-action{display:flex!important}
        .legacy-lesson-page section{padding:36px 0}
        .legacy-lesson-page h2{font-size:clamp(1.7rem,8vw,2.05rem)}
        .legacy-lesson-page .small-card{padding:16px}
        .legacy-lesson-page .flow-item{grid-template-columns:44px 1fr;gap:8px 12px;padding:16px 0}
        .legacy-lesson-page .flow-item p{grid-column:2;padding-right:0}
        .legacy-lesson-page .pdf-card,.legacy-lesson-page .presentation{padding:20px;gap:14px}
        .legacy-lesson-page .button,.legacy-lesson-page .button-outline{display:grid;width:100%;min-height:46px;place-items:center;text-align:center}
        .legacy-lesson-page .question{padding:12px 14px;line-height:1.6}
        .legacy-lesson-page .companion-launch{padding:21px;border-radius:16px;margin-top:22px}
        .legacy-lesson-page .companion-launch h2{font-size:1.65rem}
        .legacy-lesson-page .nav-bottom{gap:12px;padding-top:30px}
        .legacy-lesson-page .nav-bottom a{font-size:.88rem;line-height:1.5}
      }
    `}</style>
  </div>;
}
