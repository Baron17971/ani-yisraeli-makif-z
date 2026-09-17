import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Grid2X2, KeyRound } from "lucide-react";
import { Footer, Header } from "./components";
import { lessons } from "./data";

const companionApps:Record<string,{url:string;shortUrl:string;description:string}>={
  "tanks-and-courage":{
    url:"https://tanks-hulit-live.vercel.app",
    shortUrl:"tanks-hulit-live.vercel.app",
    description:"האפליקציה מרכזת את הפעילות הכיתתית החיה של השיעור, כולל הסקר, ענן הערכים ותצוגת המקרן."
  },
  "startup-nation":{
    url:"https://startup-state-live.vercel.app",
    shortUrl:"startup-state-live.vercel.app",
    description:"האפליקציה מלווה את הפעילות הכיתתית, מאפשרת לפתוח כיתה, לאסוף תשובות ולהציג תוצאות במקרן."
  },
  "brothers-and-disputes":{
    url:"https://brothers-forget-live.vercel.app",
    shortUrl:"brothers-forget-live.vercel.app",
    description:"האפליקציה מלווה את הלמידה בחברותא, ענן המילים, האמנה הכיתתית, מד החום ותצוגת המקרן."
  }
};

export function LessonView({ index }: { index: number }) {
  const lesson=lessons[index],previous=lessons[index-1],next=lessons[index+1];
  const about=lesson.about??[lesson.description];
  const companionApp=companionApps[lesson.slug];
  return <><Header/><main className="lesson-page" style={{"--accent":lesson.accentColor} as React.CSSProperties}>
    {companionApp&&<aside className="companion-app-float" aria-label="אפליקציה מלווה">
      <div className="companion-app-icon"><KeyRound size={24} strokeWidth={1.9}/></div>
      <p className="companion-app-kicker">אפליקציה מלווה</p>
      <h2>פתיחת האפליקציה לכיתה</h2>
      <p>{companionApp.description}</p>
      <div className="companion-app-shortcut"><span>קישור ישיר</span><code>{companionApp.shortUrl}</code></div>
      <a className="companion-app-launch" href={companionApp.url} target="_blank" rel="noreferrer">פתיחת האפליקציה <ExternalLink size={17}/></a>
    </aside>}

    <div className="lesson-shell">
      <nav className="breadcrumbs" aria-label="פירורי לחם"><Link href="/">ראשי</Link><span>/</span><Link href="/#lessons">השיעורים</Link><span>/</span><span>{lesson.title}</span></nav>
      <header className="lesson-heading"><span className="category">{lesson.category}</span><h1>{lesson.title}</h1><p>{lesson.hook}</p>{(lesson.grade||lesson.duration||lesson.lessonType)&&<div className="lesson-meta">{lesson.grade&&<span>שכבה: {lesson.grade}</span>}{lesson.duration&&<span>משך: {lesson.duration}</span>}<span>תחום: {lesson.category}</span>{lesson.lessonType&&<span>{lesson.lessonType}</span>}</div>}</header>
      <div className="lesson-hero"><img src={lesson.coverImage} alt={`שקף הפתיחה של השיעור ${lesson.title}`}/></div>
      <div className="lesson-cta"><a className="button primary" href={lesson.lessonUrl} target="_blank" rel="noreferrer">לצפייה בשיעור <ExternalLink size={18}/></a><span>המצגת תיפתח בכרטיסייה חדשה</span></div>

      <section className="lesson-about lesson-content-section"><p className="eyebrow">היכרות קצרה</p><h2>על השיעור</h2>{about.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}</section>

      {lesson.objectiveCards&&<section className="lesson-content-section"><p className="eyebrow">מטרות</p><h2>מטרות השיעור</h2><div className="resource-grid">{lesson.objectiveCards.map((objective)=><article className="resource-card resource-card-static" key={objective.title}><span className="resource-kicker">מטרה</span><h3>{objective.title}</h3><p>{objective.text}</p></article>)}</div></section>}

      {!lesson.objectiveCards&&lesson.objectives&&<section className="lesson-content-section"><p className="eyebrow">מטרות</p><h2>מטרות השיעור</h2><ul className="lesson-objectives">{lesson.objectives.map((objective)=><li key={objective}>{objective}</li>)}</ul></section>}

      {lesson.prep&&<section className="lesson-content-section"><p className="eyebrow">היערכות</p><h2>לפני שמתחילים</h2><ul className="lesson-objectives">{lesson.prep.map((item)=><li key={item}>{item}</li>)}</ul></section>}

      {lesson.steps&&<section className="lesson-content-section"><p className="eyebrow">רצף הפעילות</p><h2>מהלך השיעור</h2><div className="lesson-steps">{lesson.steps.map((step)=><article className="lesson-step" key={step.number}><span className="step-number">{step.number}</span><div><h3>{step.title}{step.duration&&<small> · {step.duration}</small>}</h3><p>{step.description}</p>{step.topics&&<div className="step-topics">{step.topics.map((topic)=><span key={topic}>{topic}</span>)}</div>}</div></article>)}</div></section>}

      {lesson.discussionQuestions&&<section className="lesson-content-section discussion-section"><p className="eyebrow">לדיון בכיתה</p><h2>שאלות לדיון</h2><ol>{lesson.discussionQuestions.map((question)=><li key={question}>{question}</li>)}</ol></section>}

      {companionApp?<section className="lesson-content-section"><p className="eyebrow">קישור ישיר</p><h2>אפליקציה מלווה</h2><div className="resource-grid"><a className="resource-card companion-resource-card" href={companionApp.url} target="_blank" rel="noreferrer"><span className="resource-kicker">אפליקציה מלווה</span><h3>פתיחת האפליקציה לכיתה</h3><p>{companionApp.description}</p><code className="companion-resource-url">{companionApp.shortUrl}</code><strong>פתיחת האפליקציה <ExternalLink size={16}/></strong></a></div></section>:lesson.digitalTools&&<section className="lesson-content-section"><p className="eyebrow">קישורים ישירים</p><h2>כלים דיגיטליים בשיעור</h2><div className="resource-grid">{lesson.digitalTools.map((tool)=><a className="resource-card" href={tool.url} target="_blank" rel="noreferrer" key={tool.title}><span className="resource-kicker">כלי דיגיטלי</span><h3>{tool.title}</h3><p>{tool.description}</p><strong>{tool.label} <ExternalLink size={16}/></strong></a>)}</div></section>}

      {lesson.materials&&<section className="lesson-content-section"><p className="eyebrow">למורה</p><h2>חומרים להורדה</h2><div className="resource-grid">{lesson.materials.map((material)=>material.url?<a className="resource-card" href={material.url} target="_blank" rel="noreferrer" key={material.title}><span className="resource-kicker">חומר נלווה</span><h3>{material.title}</h3><p>{material.description}</p><strong>{material.label} <ExternalLink size={16}/></strong></a>:<article className="resource-card resource-card-static" key={material.title}><span className="resource-kicker">חומר נלווה</span><h3>{material.title}</h3><p>{material.description}</p></article>)}</div></section>}

      <nav className="lesson-navigation" aria-label="מעבר בין שיעורים">
        <div>{previous&&<Link href={`/lessons/${previous.slug}`}><ArrowRight size={18}/><span><small>השיעור הקודם</small>{previous.title}</span></Link>}</div>
        <Link className="all-lessons" href="/#lessons"><Grid2X2 size={18}/>כל השיעורים</Link>
        <div>{next&&<Link href={`/lessons/${next.slug}`}><span><small>השיעור הבא</small>{next.title}</span><ArrowLeft size={18}/></Link>}</div>
      </nav>
    </div>
    <style>{`
      .companion-app-float{position:fixed;left:clamp(22px,4vw,72px);top:50%;transform:translateY(-46%);z-index:8;width:min(320px,22vw);min-width:270px;padding:25px 24px 24px;border:1px solid #d6e2e4;border-radius:22px;background:rgba(255,255,255,.96);box-shadow:0 18px 48px rgba(16,45,64,.13);backdrop-filter:blur(10px);text-align:right}
      .companion-app-icon{width:52px;height:52px;border-radius:15px;display:grid;place-items:center;background:#e7f4f3;color:var(--teal);margin-bottom:15px}
      .companion-app-kicker{margin:0 0 8px;color:var(--teal);font-size:.84rem;font-weight:800}
      .companion-app-float h2{margin:0;color:var(--navy);font-size:clamp(1.35rem,1.8vw,1.75rem);line-height:1.18;letter-spacing:-.02em}
      .companion-app-float>p:not(.companion-app-kicker){margin:13px 0 0;color:var(--muted);font-size:.91rem;line-height:1.72}
      .companion-app-shortcut{margin:18px 0 12px;display:grid;gap:6px}
      .companion-app-shortcut span{color:var(--text);font-size:.79rem;font-weight:800}
      .companion-app-shortcut code,.companion-resource-url{direction:ltr;text-align:left;font-family:inherit;overflow-wrap:anywhere}
      .companion-app-shortcut code{display:block;padding:10px 11px;border:1px solid #d5e0e3;border-radius:11px;background:#f7fafb;color:#718691;font-size:.78rem}
      .companion-app-launch{min-height:48px;display:flex;align-items:center;justify-content:center;gap:8px;border-radius:12px;background:var(--accent);color:#fff;font-weight:800;font-size:.9rem;transition:transform .2s ease,filter .2s ease}
      .companion-app-launch:hover{transform:translateY(-1px);filter:brightness(1.04)}
      .companion-resource-card{grid-column:1/-1;max-width:720px}
      .companion-resource-url{display:block;width:fit-content;max-width:100%;margin-top:14px;padding:7px 10px;border-radius:9px;background:#f3f7f8;color:#607883;font-size:.82rem}
      .site-dark .companion-app-float{background:rgba(23,44,53,.96);border-color:#314852;box-shadow:0 20px 52px rgba(0,0,0,.3)}
      .site-dark .companion-app-icon{background:#203a43;color:#79c7c4}
      .site-dark .companion-app-float h2{color:#eef5f5}
      .site-dark .companion-app-float>p:not(.companion-app-kicker){color:#b4c5ca}
      .site-dark .companion-app-shortcut span{color:#dce8ea}
      .site-dark .companion-app-shortcut code,.site-dark .companion-resource-url{background:#142932;border-color:#314852;color:#9fb2b8}
      @media(max-width:1350px){.companion-app-float{width:278px;left:18px}.lesson-page:has(.companion-app-float) .lesson-shell{padding-left:330px}}
      @media(min-width:1351px){.lesson-page:has(.companion-app-float) .lesson-shell{padding-left:min(370px,25vw)}}
      @media(max-width:900px){
        .companion-app-float{position:relative;left:auto;top:auto;transform:none;width:auto;min-width:0;margin:20px 20px 0;padding:22px;border-radius:18px}
        .lesson-page:has(.companion-app-float) .lesson-shell{padding-left:20px}
      }
      @media(max-width:700px){.companion-app-float{margin:12px 18px 0}.companion-app-float h2{font-size:1.45rem}.companion-app-float>p:not(.companion-app-kicker){font-size:.9rem}}
    `}</style>
  </main><Footer/></>
}
