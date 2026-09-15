import { Footer, Header } from "../components";

const sections = [
  {
    title: "תוכנית שנבנתה במיוחד עבור התלמידים שלנו",
    text: "„אני ישראלי” היא תוכנית השכלה כללית מקורית וייחודית שפותחה במקיף ז׳ אשדוד על ידי צוות מעו״ף. התוכנית נולדה מתוך רצון ליצור לתלמידי שכבה י׳ מרחב משמעותי למפגש עם הסיפור הישראלי והיהודי דרך זהות ושייכות, מורשת וזיכרון, תרבות, מסורת, מחלוקות, חדשנות ואישים שעיצבו את החברה והמדינה.",
  },
  {
    title: "המחנכים כמובילי התוכנית",
    text: "אחד המאפיינים המרכזיים של „אני ישראלי” הוא שהשיעורים נלמדים במסגרת השכלה כללית על ידי מחנכי שכבה י׳. המחנך, שמכיר את הכיתה ואת תלמידיו, מוביל שיחה ערכית ואישית, מאפשר מקום לדעות שונות ומחבר בין התכנים הגדולים של החברה הישראלית לבין עולמם של התלמידים.",
  },
  {
    title: "המרחב המוזיאלי – הלמידה יוצאת מהכיתה",
    text: "לצד התוכנית נבנה בשכבה מרחב מוזיאלי ייעודי שמרחיב את הלמידה אל מעבר לכיתה. המרחב מאפשר מפגש חזותי וחווייתי עם הסיפור הישראלי באמצעות תצוגות, דימויים, ציטוטים ותחנות תוכן, ומזמין את התלמידים להתבונן, לשאול, לזהות חיבורים ולפגוש את המורשת, התרבות והזהות בדרך נוספת.",
  },
  {
    title: "לא ללמוד רק על ישראל — אלא לשאול מהי ישראליות",
    text: "התוכנית אינה מבקשת להציע תשובה אחת לשאלה מהי ישראליות. היא מזמינה את התלמידים לפגוש מגוון קולות, לשאול, להתווכח, לחשוב ולגבש עמדה משלהם. המטרה היא לחזק ידע, שייכות, סקרנות ואחריות — ולחבר בין הסיפור שהיה כאן לפניהם לבין הסיפור שהם עצמם ממשיכים לכתוב.",
  },
];

export default function AboutPage() {
  return <><Header/><main className="program-about-page">
    <section className="program-about-hero">
      <img src="/about-program-banner.png" alt="פסיפס ישראלי של תלמידים, מורשת, תרבות, נופי הארץ וזהות" />
      <div className="program-about-shade" />
      <div className="program-about-title">
        <p>אני ישראלי | מקיף ז׳ אשדוד</p>
        <h1>על התוכנית</h1>
        <span>למידה, זהות ושייכות במרחב ישראלי חי</span>
      </div>
    </section>

    <section className="program-about-intro">
      <p className="program-about-kicker">תוכנית השכלה כללית | שכבה י׳</p>
      <h2>לפגוש את הסיפור הישראלי — ולמצוא בו מקום אישי</h2>
      <p>„אני ישראלי” נועדה לאפשר לתלמידי שכבה י׳ לפגוש את הסיפור הישראלי והיהודי מזוויות מגוונות. התוכנית משלבת סיפורים, דילמות, חקר, משחקים, כלים דיגיטליים ושיח כיתתי, ומבקשת לעורר סקרנות, חשיבה עצמאית ותחושת שייכות.</p>
    </section>

    <section className="program-about-grid" aria-label="עקרונות התוכנית">
      {sections.map((section,index)=><article className="program-about-card" key={section.title}>
        <span className="program-about-number">0{index+1}</span>
        <h2>{section.title}</h2>
        <p>{section.text}</p>
      </article>)}
    </section>

    <section className="program-about-signature">
      <img src="/maof-logo.png" alt="צוות מעו״ף" />
      <div>
        <p>פיתוח פדגוגי</p>
        <h2>צוות מעו״ף</h2>
        <span>מקיף ז׳ אשדוד</span>
      </div>
    </section>

    <section className="program-about-back"><a href="/#lessons">← חזרה לספריית השיעורים</a></section>
  </main><Footer/>
  <style>{`
    .program-about-page{background:#f7f9f8;color:var(--text)}
    .program-about-hero{position:relative;height:clamp(320px,42vw,540px);overflow:hidden;color:#fff}
    .program-about-hero>img{width:100%;height:100%;object-fit:cover;object-position:center}
    .program-about-shade{position:absolute;inset:0;background:linear-gradient(90deg,#071e2ca8 0%,#0a2c3b56 48%,#0a2c3b15 100%),linear-gradient(0deg,#071e2c78 0%,transparent 65%)}
    .program-about-title{position:absolute;right:clamp(24px,7vw,120px);bottom:clamp(34px,7vw,76px);max-width:760px;text-align:right}
    .program-about-title p{margin:0 0 8px;font-size:.9rem;font-weight:700;letter-spacing:.04em;color:#d9efed}
    .program-about-title h1{margin:0;font-size:clamp(3.2rem,7vw,6.8rem);line-height:.95;letter-spacing:-.055em}
    .program-about-title span{display:block;margin-top:18px;font-size:clamp(1rem,1.8vw,1.35rem);color:#e7f5f4}
    .program-about-intro{max-width:1050px;margin:0 auto;padding:clamp(64px,9vw,110px) clamp(22px,5vw,52px) 44px;text-align:right}
    .program-about-kicker{margin:0 0 10px;color:var(--teal);font-weight:700;font-size:.9rem}
    .program-about-intro h2{margin:0;color:var(--navy);font-size:clamp(2.1rem,4vw,4rem);line-height:1.08;letter-spacing:-.035em;max-width:900px}
    .program-about-intro>p:last-child{margin:28px 0 0;max-width:930px;font-size:clamp(1.05rem,1.6vw,1.25rem);line-height:1.95;color:#3c5968}
    .program-about-grid{max-width:1180px;margin:0 auto;padding:20px clamp(22px,5vw,52px) clamp(74px,10vw,120px);display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
    .program-about-card{position:relative;min-height:290px;padding:32px 32px 30px;border:1px solid #dbe5e2;background:#fff}
    .program-about-number{display:block;margin-bottom:26px;color:#82a6a8;font-size:.78rem;font-weight:700;letter-spacing:.12em}
    .program-about-card h2{margin:0 0 16px;color:var(--navy);font-size:clamp(1.45rem,2.2vw,2rem);line-height:1.25}
    .program-about-card p{margin:0;color:#526d79;font-size:1rem;line-height:1.9}
    .program-about-card:nth-child(1){border-top:5px solid #102d40}.program-about-card:nth-child(2){border-top:5px solid #17495e}.program-about-card:nth-child(3){border-top:5px solid #2b6078}.program-about-card:nth-child(4){border-top:5px solid #247f82}
    .program-about-signature{max-width:1180px;margin:0 auto 78px;padding:30px clamp(22px,5vw,52px);display:flex;align-items:center;justify-content:center;gap:12px;text-align:right;border-top:1px solid #dbe5e2;border-bottom:1px solid #dbe5e2}
    .program-about-signature img{width:132px;height:132px;object-fit:contain;margin-bottom:-10px}
    .program-about-signature p{margin:0;color:var(--teal);font-weight:700;font-size:1rem}
    .program-about-signature h2{margin:3px 0 5px;color:var(--navy);font-size:clamp(1.35rem,2.3vw,1.8rem)}
    .program-about-signature span{color:var(--muted)}
    .program-about-back{text-align:center;padding:0 20px 74px}.program-about-back a{display:inline-flex;padding:12px 22px;border:1px solid #cadcdd;border-radius:999px;color:var(--deep);font-weight:700;background:#fff}
    @media(max-width:700px){
      .program-about-hero{height:420px}.program-about-hero>img{object-position:center center}.program-about-title{right:22px;left:22px;bottom:38px}.program-about-title h1{font-size:3.7rem}.program-about-title span{font-size:1rem;line-height:1.6}
      .program-about-intro{padding:56px 22px 34px}.program-about-intro h2{font-size:2.35rem}.program-about-intro>p:last-child{font-size:1.02rem;line-height:1.85}
      .program-about-grid{grid-template-columns:1fr;padding:10px 20px 68px}.program-about-card{min-height:0;padding:27px 24px}.program-about-number{margin-bottom:18px}
      .program-about-signature{margin:0 20px 64px;padding:26px 20px;flex-direction:column;text-align:center;gap:2px}.program-about-signature img{width:118px;height:118px;margin-bottom:-6px}
      .program-about-back{padding-bottom:62px}
    }
  `}</style></>;
}
