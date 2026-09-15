import { lessons } from "./data";
import { Footer, Header, LessonCard } from "./components";
import { HeroCarousel } from "./hero-carousel";
import { HomeThemeShell } from "./home-theme-shell";

const focuses = [
  ["זהות ושייכות", "היכרות עם הזהות היהודית והישראלית והמשמעות האישית שלה."],
  ["מורשת וזיכרון", "אירועים, סיפורים ודמויות שעיצבו את החברה והמדינה."],
  ["תרבות וחברה", "ספרות, קולנוע, מסורת, מחלוקות וקולות מגוונים בחברה הישראלית."],
  ["ישראליות מתחדשת", "חדשנות, יזמות, אחריות אזרחית והאתגרים של מדינת ישראל כיום."],
];

export default function Home() {
  return <HomeThemeShell><Header/><main>
    <HeroCarousel/>
    <section className="quote-section" aria-label="ציטוט מדוד בן־גוריון">
      <blockquote>
        <img src="/ben-gurion-quote.png" alt="עליכם להניח היסודות הנאמנים לעתיד האומה והמולדת" />
        <footer>דוד בן־גוריון, דברים לתלמידי בתי הספר התיכוניים, 1954</footer>
      </blockquote>
    </section>
    <section id="lessons" className="lessons-section">
      <div className="section-heading"><h2>ספריית השיעורים</h2></div>
      <div className="lessons-grid">{lessons.map((lesson,index)=><LessonCard key={lesson.id} lesson={lesson} index={index}/>)}</div>
    </section>
    <section id="about" className="about-section">
      <div className="focus-grid">{focuses.map(([title,text])=><article className="focus-item" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className="pedagogy"><div className="pedagogy-heading" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:0,width:"100%",marginBottom:"4px"}}><img className="pedagogy-logo" src="/maof-logo.png" alt="צוות מעו״ף" style={{width:"128px",height:"128px",objectFit:"contain",background:"transparent",flex:"0 0 auto",marginBottom:"-10px"}}/><p className="pedagogy-title" style={{margin:0,color:"var(--teal)",fontSize:"clamp(1.2rem,3.2vw,1.5rem)",fontWeight:700,lineHeight:1.15}}>פיתוח פדגוגי</p></div><p className="names" style={{justifyContent:"center",textAlign:"center",fontSize:"clamp(1.03rem,2.3vw,1.16rem)",lineHeight:1.85}}><span className="person">ענת ברון לוביש - סגנית פדגוגית</span><span className="separator" aria-hidden="true">•</span><span className="person">אתי נייברג - רכזת פדגוגית חט״ב</span><span className="separator" aria-hidden="true">•</span><span className="person">נטלי בן חמו - רכזת חינוך חברתי</span></p><p className="team" style={{textAlign:"center",marginTop:"10px"}}>צוות מעו״ף | מקיף ז׳ אשדוד</p></div>
    </section>
  </main><Footer/></HomeThemeShell>
}
