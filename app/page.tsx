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
      <div className="pedagogy"><p className="eyebrow">פיתוח פדגוגי</p><p className="names">ענת ברון לוביש <span>•</span> אתי נייברג <span>•</span> נטלי בן חמו</p><p className="team">צוות מעו״ף | מקיף ז׳ אשדוד</p></div>
    </section>
  </main><Footer/></>
}
