import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Grid2X2 } from "lucide-react";
import { Footer, Header } from "./components";
import { lessons } from "./data";

export function LessonView({ index }: { index: number }) {
  const lesson=lessons[index],previous=lessons[index-1],next=lessons[index+1];
  return <><Header/><main className="lesson-page" style={{"--accent":lesson.accentColor} as React.CSSProperties}>
    <div className="lesson-shell">
      <nav className="breadcrumbs" aria-label="פירורי לחם"><Link href="/">ראשי</Link><span>/</span><Link href="/#lessons">השיעורים</Link><span>/</span><span>{lesson.title}</span></nav>
      <header className="lesson-heading"><span className="category">{lesson.category}</span><h1>{lesson.title}</h1><p>{lesson.hook}</p></header>
      <div className="lesson-hero"><img src={lesson.coverImage} alt={`שקף הפתיחה של השיעור ${lesson.title}`}/></div>
      <div className="lesson-cta"><a className="button primary" href={lesson.lessonUrl} target="_blank" rel="noreferrer">לצפייה בשיעור <ExternalLink size={18}/></a><span>המצגת תיפתח בכרטיסייה חדשה</span></div>
      <section className="lesson-about"><p className="eyebrow">היכרות קצרה</p><h2>על השיעור</h2><p>{lesson.description}</p></section>
      <nav className="lesson-navigation" aria-label="מעבר בין שיעורים">
        <div>{previous&&<Link href={`/lessons/${previous.slug}`}><ArrowRight size={18}/><span><small>השיעור הקודם</small>{previous.title}</span></Link>}</div>
        <Link className="all-lessons" href="/#lessons"><Grid2X2 size={18}/>כל השיעורים</Link>
        <div>{next&&<Link href={`/lessons/${next.slug}`}><span><small>השיעור הבא</small>{next.title}</span><ArrowLeft size={18}/></Link>}</div>
      </nav>
    </div>
  </main><Footer/></>
}
