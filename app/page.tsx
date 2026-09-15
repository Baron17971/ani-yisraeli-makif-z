import { lessons } from "./data";
import { Footer, Header, LessonCard } from "./components";
import { HeroCarousel } from "./hero-carousel";

const focuses = [
  ["זהות ושייכות", "היכרות עם הזהות היהודית והישראלית והמשמעות האישית שלה."],
  ["מורשת וזיכרון", "אירועים, סיפורים ודמויות שעיצבו את החברה והמדינה."],
  ["תרבות וחברה", "ספרות, קולנוע, מסורת, מחלוקות וקולות מגוונים בחברה הישראלית."],
  ["ישראליות מתחדשת", "חדשנות, יזמות, אחריות אזרחית והאתגרים של מדינת ישראל כיום."],
];

export default function Home() {
  return <><Header/><main>
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
      <div className="about-intro">
        <p className="eyebrow">תוכנית לימודים</p><h2>על התוכנית</h2>
        <p>תוכנית „אני ישראלי” נועדה לאפשר לתלמידי שכבה י׳ לפגוש את הסיפור הישראלי והיהודי מזוויות מגוונות, דרך אירועים מכוננים, מורשת, תרבות, זהות, מחלוקות, חדשנות ואישים שעיצבו את החברה והמדינה. התוכנית מבקשת לעורר סקרנות, שיח, חשיבה עצמאית ותחושת שייכות, וליצור חיבור בין העבר, ההווה והאחריות לעתיד.</p>
      </div>
      <div className="focus-grid">{focuses.map(([title,text])=><article className="focus-item" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      <div className="pedagogy"><div className="pedagogy-heading" style={{display:"flex",alignItems:"center",gap:"10px"}}><img className="pedagogy-logo" src="/maof-logo.png" alt="צוות מעו״ף" style={{width:"44px",height:"44px",objectFit:"contain",background:"transparent",flex:"0 0 auto"}}/><p className="eyebrow" style={{margin:0}}>פיתוח פדגוגי</p></div><p className="names"><span className="person">ענת ברון לוביש - סגנית פדגוגית</span><span className="separator" aria-hidden="true">•</span><span className="person">אתי נייברג - רכזת פדגוגית חט״ב</span><span className="separator" aria-hidden="true">•</span><span className="person">נטלי בן חמו - רכזת חינוך חברתי</span></p><p className="team">צוות מעו״ף | מקיף ז׳ אשדוד</p></div>
    </section>
  </main><Footer/></>
}
