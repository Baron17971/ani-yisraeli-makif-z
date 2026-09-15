import type { Metadata } from "next";
import Link from "next/link";
import { lessons } from "../../data";

const lesson=lessons[0];

export const metadata:Metadata={title:`${lesson.title} | אני ישראלי`,description:lesson.hook};

export default function Page(){
  const goals=lesson.objectiveCards??[];
  const prep=lesson.prep??[];
  const steps=lesson.steps??[];
  const questions=lesson.discussionQuestions??[];
  return <div className="legacy-lesson-page">
    <link rel="stylesheet" href="/lessons/teacher-portal.css"/>
    <header className="top" style={{background:lesson.accentColor}}><div className="brand">✡ אני ישראלי</div><Link className="home" href="/lessons">כל השיעורים</Link></header>
    <div className="shell">
      <nav className="crumbs"><Link href="/">ראשי</Link> / <Link href="/lessons">השיעורים</Link> / {lesson.title}</nav>
      <header className="lesson-hero" style={{"--accent":lesson.accentColor} as React.CSSProperties}>
        <div><span className="tag">שיעור 01 | {lesson.category}</span><h1>{lesson.title}</h1><p className="hook">{lesson.hook}</p><div className="meta"><span>90 דק׳</span><span>שכבת י׳</span><span>{lesson.lessonType}</span></div></div>
        <div className="cover"><img src={lesson.coverImage} alt={`שקף הפתיחה של ${lesson.title}`}/></div>
      </header>
      <div className="actions"><a className="action" href={lesson.lessonUrl} target="_blank" rel="noreferrer">מצגת השיעור</a><a className="action" href="#teacher-guide">מערך מלא למורה PDF</a><a className="action" href="#tools">כלים דיגיטליים</a><a className="action" href="#materials">חומרים להורדה</a></div>
      <section id="goals"><h2>מטרות השיעור</h2><div className="goal-grid">{goals.map(g=><article className="small-card" key={g.title}><b>{g.title}</b><p>{g.text}</p></article>)}</div></section>
      <section id="prep"><h2>לפני שמתחילים</h2><div className="prep-grid">{prep.map(p=><div className="prep-item" key={p}><b>הכנה</b>{p}</div>)}</div></section>
      <section id="flow"><h2>מהלך השיעור</h2><div className="flow">{steps.map((s,i)=><div className="flow-item" key={s.number}><div className="flow-num">{String(i+1).padStart(2,"0")}</div><div className="flow-title"><b>{s.title}</b><span>{s.duration}</span></div><p>{s.description}</p></div>)}</div></section>
      <section id="teacher-guide"><h2>מערך מלא למורה</h2><div className="pdf-card"><div><b>מערך מפורט הכולל רקע תוכני, מטרות, מהלך מלא, שאלות לדיון ודגשים פדגוגיים.</b><p>קובץ ה־PDF של השיעור יתווסף כאן.</p></div><span className="button-outline">פתיחת המערך המלא PDF</span></div></section>
      <section id="discussion"><h2>שאלות לדיון</h2><div className="questions">{questions.map(q=><div className="question" key={q}>{q}</div>)}</div></section>
      <section id="tools"><h2>כלים דיגיטליים בשיעור</h2><p className="empty">קישורים לכלים הדיגיטליים של שיעור זה יתווספו כאן.</p></section>
      <section id="materials"><h2>חומרים להורדה</h2><p className="empty">דפי עבודה, כרטיסיות וקבצי הוראה יתווספו כאן.</p></section>
      <section id="presentation"><h2>מצגת השיעור</h2><div className="presentation"><img src={lesson.coverImage} alt=""/><div><b>{lesson.title}</b><p>המצגת תיפתח בכרטיסייה חדשה.</p></div><a className="button" href={lesson.lessonUrl} target="_blank" rel="noreferrer">פתיחת המצגת</a></div></section>
      <section><details><summary>דגשים למורה</summary><p>בחרו את היקף הדיון והפעילות בהתאם לאופי הכיתה ולזמן העומד לרשותכם.</p></details><details><summary>הצעות להרחבה</summary><p>אפשר להרחיב באמצעות מקור נוסף, משימת כתיבה או פעילות המשך קבוצתית.</p></details></section>
      <nav className="nav-bottom"><span></span><Link className="all" href="/lessons">חזרה לכל השיעורים</Link><Link href="/lessons/jewish-bookshelf">לשיעור הבא ←</Link></nav>
    </div>
    <footer className="footer">© תשפ״ז | „אני ישראלי” | מקיף ז׳ אשדוד</footer>
    <style>{`
      .legacy-lesson-page .lesson-hero{
        display:grid!important;
        grid-template-columns:minmax(0,1.1fr) minmax(300px,.9fr)!important;
        gap:50px!important;
        align-items:center!important;
        padding-bottom:42px!important;
        border-bottom:1px solid var(--line)!important;
        aspect-ratio:auto!important;
        overflow:visible!important;
        background:transparent!important;
      }
      .legacy-lesson-page .cover{
        aspect-ratio:16/9;
        overflow:hidden;
        background:var(--mist);
        border-bottom:5px solid var(--accent);
      }
      .legacy-lesson-page .cover img{
        width:100%;
        height:100%;
        object-fit:cover;
        object-position:center;
      }
      @media(max-width:800px){
        .legacy-lesson-page .lesson-hero{
          grid-template-columns:1fr!important;
          gap:25px!important;
          padding-bottom:42px!important;
        }
        .legacy-lesson-page .cover{width:100%;}
      }
      @media(max-width:700px){
        .legacy-lesson-page .top{padding:0 18px}
        .legacy-lesson-page .home{display:flex;align-items:center;min-height:44px}
        .legacy-lesson-page .shell{padding:22px 18px 58px}
        .legacy-lesson-page .crumbs{overflow:hidden;margin-bottom:16px;white-space:nowrap;text-overflow:ellipsis}
        .legacy-lesson-page .lesson-hero{gap:22px!important;padding-bottom:34px!important}
        .legacy-lesson-page .lesson-hero h1{font-size:clamp(2.35rem,10.5vw,3.05rem)!important;line-height:1.03!important;letter-spacing:-.045em!important}
        .legacy-lesson-page .lesson-hero .hook{margin-top:12px;font-size:1rem;line-height:1.65}
        .legacy-lesson-page .lesson-hero .meta{margin-top:15px;gap:6px}
        .legacy-lesson-page .actions{gap:8px;margin:26px 0 40px}
        .legacy-lesson-page .action{display:grid;place-items:center;min-height:50px;padding:9px 8px;font-size:.84rem;line-height:1.35}
        .legacy-lesson-page section{padding:36px 0}
        .legacy-lesson-page h2{font-size:clamp(1.7rem,8vw,2.05rem)}
        .legacy-lesson-page .small-card{padding:16px}
        .legacy-lesson-page .flow-item{grid-template-columns:44px 1fr;gap:8px 12px;padding:16px 0}
        .legacy-lesson-page .flow-item p{grid-column:2;padding-right:0}
        .legacy-lesson-page .pdf-card,.legacy-lesson-page .presentation{padding:20px;gap:14px}
        .legacy-lesson-page .button,.legacy-lesson-page .button-outline{display:grid;width:100%;min-height:46px;place-items:center;text-align:center}
        .legacy-lesson-page .question{padding:12px 14px;line-height:1.6}
        .legacy-lesson-page .nav-bottom{gap:12px;padding-top:30px}
        .legacy-lesson-page .nav-bottom a{font-size:.88rem;line-height:1.5}
      }
    `}</style>
  </div>;
}
