import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Grid2X2 } from "lucide-react";
import { Footer, Header } from "./components";
import { lessons } from "./data";

export function LessonView({ index }: { index: number }) {
  const lesson=lessons[index],previous=lessons[index-1],next=lessons[index+1];
  const about=lesson.about??[lesson.description];
  return <><Header/><main className="lesson-page" style={{"--accent":lesson.accentColor} as React.CSSProperties}>
    <div className="lesson-shell">
      <nav className="breadcrumbs" aria-label="פירורי לחם"><Link href="/">ראשי</Link><span>/</span><Link href="/#lessons">השיעורים</Link><span>/</span><span>{lesson.title}</span></nav>
      <header className="lesson-heading"><span className="category">{lesson.category}</span><h1>{lesson.title}</h1><p>{lesson.hook}</p>{(lesson.grade||lesson.duration)&&<div className="lesson-meta"><span>שכבה: {lesson.grade}</span><span>משך: {lesson.duration}</span><span>תחום: {lesson.category}</span></div>}</header>
      <div className="lesson-hero"><img src={lesson.coverImage} alt={`שקף הפתיחה של השיעור ${lesson.title}`}/></div>
      <div className="lesson-cta"><a className="button primary" href={lesson.lessonUrl} target="_blank" rel="noreferrer">לצפייה בשיעור <ExternalLink size={18}/></a><span>המצגת תיפתח בכרטיסייה חדשה</span></div>

      <section className="lesson-about lesson-content-section"><p className="eyebrow">היכרות קצרה</p><h2>על השיעור</h2>{about.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}</section>

      {lesson.objectives&&<section className="lesson-content-section"><p className="eyebrow">מטרות</p><h2>מטרות השיעור</h2><ul className="lesson-objectives">{lesson.objectives.map((objective)=><li key={objective}>{objective}</li>)}</ul></section>}

      {lesson.steps&&<section className="lesson-content-section"><p className="eyebrow">רצף הפעילות</p><h2>מהלך השיעור</h2><div className="lesson-steps">{lesson.steps.map((step)=><article className="lesson-step" key={step.number}><span className="step-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p>{step.topics&&<div className="step-topics">{step.topics.map((topic)=><span key={topic}>{topic}</span>)}</div>}</div></article>)}</div></section>}

      {lesson.discussionQuestions&&<section className="lesson-content-section discussion-section"><p className="eyebrow">לדיון בכיתה</p><h2>שאלות לדיון</h2><ol>{lesson.discussionQuestions.map((question)=><li key={question}>{question}</li>)}</ol></section>}

      {lesson.digitalTools&&<section className="lesson-content-section"><p className="eyebrow">קישורים ישירים</p><h2>כלים דיגיטליים בשיעור</h2><div className="resource-grid">{lesson.digitalTools.map((tool)=><a className="resource-card" href={tool.url} target="_blank" rel="noreferrer" key={tool.title}><span className="resource-kicker">כלי דיגיטלי</span><h3>{tool.title}</h3><p>{tool.description}</p><strong>{tool.label} <ExternalLink size={16}/></strong></a>)}</div></section>}

      {lesson.materials&&<section className="lesson-content-section"><p className="eyebrow">למורה</p><h2>חומרים להורדה</h2><div className="resource-grid">{lesson.materials.map((material)=>material.url?<a className="resource-card" href={material.url} target="_blank" rel="noreferrer" key={material.title}><span className="resource-kicker">חומר נלווה</span><h3>{material.title}</h3><p>{material.description}</p><strong>{material.label} <ExternalLink size={16}/></strong></a>:<article className="resource-card resource-card-static" key={material.title}><span className="resource-kicker">חומר נלווה</span><h3>{material.title}</h3><p>{material.description}</p></article>)}</div></section>}

      <nav className="lesson-navigation" aria-label="מעבר בין שיעורים">
        <div>{previous&&<Link href={`/lessons/${previous.slug}`}><ArrowRight size={18}/><span><small>השיעור הקודם</small>{previous.title}</span></Link>}</div>
        <Link className="all-lessons" href="/#lessons"><Grid2X2 size={18}/>כל השיעורים</Link>
        <div>{next&&<Link href={`/lessons/${next.slug}`}><span><small>השיעור הבא</small>{next.title}</span><ArrowLeft size={18}/></Link>}</div>
      </nav>
    </div>
  </main><Footer/></>
}
