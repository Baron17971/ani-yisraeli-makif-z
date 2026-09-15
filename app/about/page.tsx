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
      <img src="/file_000000001f34820aa8188af788222a31.png" alt="פסיפס ישראלי של תלמידים, מורשת, תרבות, נופי הארץ וזהות" />
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

    <section className="pedagogy program-about-pedagogy">
      <div className="pedagogy-heading" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:0,width:"100%",marginBottom:"4px"}}>
        <img className="pedagogy-logo" src="/maof-logo.png" alt="צוות מעו״ף" style={{width:"128px",height:"128px",objectFit:"contain",background:"transparent",flex:"0 0 auto",marginBottom:"-10px"}}/>
        <p className="pedagogy-title" style={{margin:0,color:"var(--teal)",fontSize:"clamp(1.2rem,3.2vw,1.5rem)",fontWeight:700,lineHeight:1.15}}>פיתוח פדגוגי</p>
      </div>
      <p className="names" style={{justifyContent:"center",textAlign:"center",fontSize:"clamp(1.03rem,2.3vw,1.16rem)",lineHeight:1.85}}>
        <span className="person">ענת ברון לוביש - סגנית פדגוגית</span><span className="separator" aria-hidden="true">•</span><span className="person">אתי נייברג - רכזת פדגוגית חט״ב</span><span className="separator" aria-hidden="true">•</span><span className="person">נטלי בן חמו - רכזת חינוך חברתי</span>
      </p>
      <p className="team" style={{textAlign:"center",marginTop:"10px"}}>צוות מעו״ף | מקיף ז׳ אשדוד</p>
    </section>

    <section className="program-about-back"><a href="/lessons">← חזרה לספריית השיעורים</a></section>
  </main><Footer/>
  <style>{`
    .program-about-page{background:#f7f9f8;color:var(--text)}
    .program-about-hero{position:relative;height:clamp(320px,42vw,540px);overflow:hidden;color:#fff}
    .program-about-hero>img{width:100%;height:100%;object-fit:cover;object-position:center}
    .program-about-shade{position:absolute;inset:0;background:linear-gradient(90deg,#071e2ca8 0%,#0a2c3b56 48%,#0a2c3b15 100%),linear-gradient(0deg,#071e2c78 0%,transparent 65%)}
    .program-about-title{position:absolute;right:clamp(24px,7vw,120px);bottom:clamp(36px,5.5vw,64px);max-width:760px;text-align:right}
    .program-about-title p{margin:0 0 10px;font-size:.9rem;font-weight:700;letter-spacing:.04em;color:#d9efed}
    .program-about-title h1{margin:0;font-size:clamp(3.1rem,6vw,5.6rem);line-height:1;letter-spacing:-.05em}
    .program-about-title span{display:block;margin-top:14px;font-size:clamp(1rem,1.6vw,1.2rem);line-height:1.55;color:#e7f5f4}
    .program-about-intro{max-width:1050px;margin:0 auto;padding:clamp(58px,7vw,88px) clamp(22px,5vw,52px) 44px;text-align:right}
    .program-about-kicker{margin:0 0 10px;color:var(--teal);font-weight:700;font-size:.9rem}
    .program-about-intro h2{margin:0;color:var(--navy);font-size:clamp(2.1rem,4vw,4rem);line-height:1.08;letter-spacing:-.035em;max-width:900px}
    .program-about-intro>p:last-child{margin:24px 0 0;max-width:930px;font-size:clamp(1.05rem,1.6vw,1.25rem);line-height:1.95;color:#3c5968}
    .program-about-grid{max-width:1180px;margin:0 auto;padding:20px clamp(22px,5vw,52px) clamp(74px,10vw,120px);display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
    .program-about-card{position:relative;min-height:290px;padding:32px 32px 30px;border:1px solid #dbe5e2;background:#fff}
    .program-about-number{display:block;margin-bottom:26px;color:#82a6a8;font-size:.78rem;font-weight:700;letter-spacing:.12em}
    .program-about-card h2{margin:0 0 16px;color:var(--navy);font-size:clamp(1.45rem,2.2vw,2rem);line-height:1.25}
    .program-about-card p{margin:0;color:#526d79;font-size:1rem;line-height:1.9}
    .program-about-card:nth-child(1){border-top:5px solid #102d40}.program-about-card:nth-child(2){border-top:5px solid #17495e}.program-about-card:nth-child(3){border-top:5px solid #2b6078}.program-about-card:nth-child(4){border-top:5px solid #247f82}
    .program-about-pedagogy{max-width:1180px;margin:0 auto 78px;padding:30px clamp(22px,5vw,52px) 0;text-align:center}
    .program-about-back{text-align:center;padding:0 20px 74px}.program-about-back a{display:inline-flex;padding:12px 22px;border:1px solid #cadcdd;border-radius:999px;color:var(--deep);font-weight:700;background:#fff}
    @media(max-width:700px){
      .program-about-hero{height:390px}.program-about-hero>img{object-position:center center}.program-about-title{right:22px;left:22px;bottom:32px}.program-about-title p{margin-bottom:8px}.program-about-title h1{font-size:3.15rem}.program-about-title span{font-size:1rem;line-height:1.55;margin-top:12px}
      .program-about-intro{padding:48px 22px 34px}.program-about-intro h2{font-size:2.35rem}.program-about-intro>p:last-child{font-size:1.02rem;line-height:1.85;margin-top:22px}
      .program-about-grid{grid-template-columns:1fr;padding:10px 20px 68px}.program-about-card{min-height:0;padding:27px 24px}.program-about-number{margin-bottom:18px}
      .program-about-pedagogy{margin:0 20px 64px;padding:30px 0 0}
      .program-about-back{padding-bottom:62px}
    }
  `}</style></>;
}
