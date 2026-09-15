import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";
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

    <section className="program-about-video-section" aria-labelledby="museum-space-title">
      <div className="program-about-video-copy">
        <p className="program-about-video-kicker">הצצה למרחב</p>
        <h2 id="museum-space-title">המרחב המוזיאלי – הלמידה יוצאת מהכיתה</h2>
        <p>מרחב שכבתי שנבנה כחלק מהתוכנית ומאפשר לתלמידים לפגוש את הסיפור הישראלי גם דרך המרחב עצמו — בתצוגות, בדימויים, בציטוטים ובתחנות תוכן.</p>
      </div>
      <div className="program-about-video-frame">
        <video controls preload="metadata" playsInline aria-label="סרטון הצצה למרחב המוזיאלי של תוכנית אני ישראלי">
          <source src="/museum-space-compressed.mp4" type="video/mp4"/>
          הדפדפן שלך אינו תומך בניגון וידאו.
        </video>
      </div>
    </section>

    <section className="program-about-activity-section" aria-labelledby="time-tunnel-title">
      <div className="program-about-activity-card">
        <div className="program-about-activity-shade" />
        <div className="program-about-activity-content">
          <p>לומדים בתוך המרחב</p>
          <span className="program-about-activity-icon"><KeyRound size={24}/></span>
          <h2 id="time-tunnel-title">מנהרת הזמן – חדר בריחה</h2>
          <span className="program-about-activity-text">מסע קבוצתי בן שבע תחנות שהופך את המרחב המוזיאלי לזירת חקר פעילה: מחפשים רמזים, מפענחים קודים ופוגשים דמויות, אירועים, שירים וסמלים מתוך הסיפור הישראלי.</span>
          <Link href="/escape-room" className="program-about-activity-link">כניסה למנהרת הזמן <ArrowLeft size={18}/></Link>
        </div>
      </div>
    </section>

    <section className="pedagogy program-about-pedagogy">
      <div className="pedagogy-heading" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:0,width:"100%",marginBottom:"2px"}}>
        <img className="pedagogy-logo" src="/maof-logo.png" alt="צוות מעו״ף" style={{width:"96px",height:"96px",objectFit:"contain",background:"transparent",flex:"0 0 auto",marginBottom:"-8px"}}/>
        <p className="pedagogy-title" style={{margin:0,color:"var(--teal)",fontSize:"clamp(1.25rem,2.8vw,1.5rem)",fontWeight:800,lineHeight:1.15}}>פיתוח פדגוגי</p>
      </div>
      <p className="names" style={{justifyContent:"center",textAlign:"center",fontSize:"clamp(.98rem,2vw,1.08rem)",lineHeight:1.65}}>
        <span className="person">ענת ברון לוביש - סגנית פדגוגית</span><span className="separator" aria-hidden="true">•</span><span className="person">אתי נייברג - רכזת פדגוגית חט״ב</span><span className="separator" aria-hidden="true">•</span><span className="person">נטלי בן חמו - רכזת חינוך חברתי</span>
      </p>
      <p className="team" style={{textAlign:"center",marginTop:"4px"}}>צוות מעו״ף | מקיף ז׳ אשדוד</p>
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
    .program-about-intro>p:last-child{margin:24px 0 0;max-width:780px;font-size:clamp(1.05rem,1.6vw,1.25rem);line-height:1.95;color:#3c5968}
    .program-about-grid{max-width:1180px;margin:0 auto;padding:20px clamp(22px,5vw,52px) clamp(50px,7vw,76px);display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
    .program-about-card{position:relative;min-height:290px;padding:32px 32px 30px;border:1px solid #dbe5e2;background:#fff}
    .program-about-number{display:block;margin-bottom:26px;color:#82a6a8;font-size:.78rem;font-weight:700;letter-spacing:.12em}
    .program-about-card h2{margin:0 0 16px;color:var(--navy);font-size:clamp(1.45rem,2.2vw,2rem);line-height:1.25}
    .program-about-card p{margin:0;max-width:52ch;color:#526d79;font-size:1rem;line-height:1.9}
    .program-about-card:nth-child(1){border-top:5px solid #102d40}.program-about-card:nth-child(2){border-top:5px solid #17495e}.program-about-card:nth-child(3){border-top:5px solid #2b6078}.program-about-card:nth-child(4){border-top:5px solid #247f82}

    .program-about-video-section{max-width:1180px;margin:0 auto;padding:0 clamp(22px,5vw,52px) clamp(54px,6vw,72px);text-align:right}
    .program-about-video-copy{max-width:820px;margin:0 0 24px auto}
    .program-about-video-kicker{margin:0 0 8px;color:var(--teal);font-size:.86rem;font-weight:800;letter-spacing:.035em}
    .program-about-video-copy h2{margin:0;color:var(--navy);font-size:clamp(2rem,3.5vw,3.45rem);line-height:1.08;letter-spacing:-.035em}
    .program-about-video-copy>p:last-child{max-width:760px;margin:17px 0 0;color:#526d79;font-size:1.02rem;line-height:1.8}
    .program-about-video-frame{overflow:hidden;border:1px solid #d5e1df;border-radius:22px;background:#071e2c;box-shadow:0 22px 55px rgba(16,45,64,.16)}
    .program-about-video-frame video{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;background:#071e2c}

    .program-about-activity-section{max-width:1180px;margin:0 auto;padding:0 clamp(22px,5vw,52px) clamp(64px,7vw,88px)}
    .program-about-activity-card{position:relative;min-height:330px;overflow:hidden;border-radius:22px;background-image:url('/file_000000001f34820aa8188af788222a31.png');background-size:cover;background-position:center 44%;box-shadow:0 20px 48px rgba(16,45,64,.14)}
    .program-about-activity-shade{position:absolute;inset:0;background:linear-gradient(90deg,#071e2cee 0%,#0a2c3bd8 48%,#0a2c3b70 100%)}
    .program-about-activity-content{position:relative;z-index:1;max-width:650px;padding:clamp(28px,5vw,48px);color:#fff}
    .program-about-activity-content>p{margin:0 0 12px;color:#9fd8d4;font-size:.84rem;font-weight:800;letter-spacing:.04em}
    .program-about-activity-icon{display:grid;width:48px;height:48px;place-items:center;margin-bottom:18px;border:1px solid #ffffff2d;border-radius:14px;background:#ffffff10;color:#d8eee8}
    .program-about-activity-content h2{margin:0;font-size:clamp(2rem,4vw,3.3rem);line-height:1.08;letter-spacing:-.035em;color:#fff}
    .program-about-activity-text{display:block;max-width:610px;margin-top:16px;color:#dbe8e8;font-size:1rem;line-height:1.75}
    .program-about-activity-link{display:inline-flex;align-items:center;gap:8px;min-height:46px;margin-top:24px;padding:0 17px;border-radius:12px;background:#f4e0a9;color:#163442;font-weight:800;transition:transform .2s ease,background-color .2s ease}
    .program-about-activity-link:hover{transform:translateY(-1px);background:#fff0c6}

    .program-about-pedagogy{max-width:980px;margin:0 auto 48px;padding:18px clamp(22px,5vw,52px) 0;text-align:center}
    .program-about-pedagogy .names{max-width:920px;margin:8px auto 0;row-gap:2px}
    .program-about-pedagogy .team{font-size:.86rem!important}
    .program-about-back{text-align:center;padding:0 20px 62px}.program-about-back a{display:inline-flex;padding:12px 22px;border:1px solid #cadcdd;border-radius:999px;color:var(--deep);font-weight:700;background:#fff}

    .site-dark .program-about-video-copy h2{color:#edf5f5}
    .site-dark .program-about-video-copy>p:last-child{color:#b4c5ca}
    .site-dark .program-about-video-frame{border-color:#314852;background:#07161d;box-shadow:0 24px 58px rgba(0,0,0,.3)}
    .site-dark .program-about-activity-card{box-shadow:0 22px 52px rgba(0,0,0,.28)}

    @media(max-width:700px){
      .program-about-hero{height:390px}.program-about-hero>img{object-position:center center}.program-about-title{right:22px;left:22px;bottom:32px}.program-about-title p{margin-bottom:8px}.program-about-title h1{font-size:3.15rem}.program-about-title span{font-size:1rem;line-height:1.55;margin-top:12px}
      .program-about-intro{padding:46px 20px 32px}.program-about-intro h2{font-size:2.25rem}.program-about-intro>p:last-child{max-width:none;font-size:1.02rem;line-height:1.85;margin-top:20px}
      .program-about-grid{grid-template-columns:1fr;padding:8px 18px 44px;gap:14px}.program-about-card{min-height:0;padding:24px 22px}.program-about-card h2{font-size:1.45rem;line-height:1.3;margin-bottom:13px}.program-about-card p{max-width:none;line-height:1.82}.program-about-number{margin-bottom:15px}
      .program-about-video-section{padding:0 18px 46px}
      .program-about-video-copy{margin-bottom:16px}
      .program-about-video-copy h2{font-size:1.9rem;line-height:1.14}
      .program-about-video-copy>p:last-child{font-size:.98rem;line-height:1.7;margin-top:12px}
      .program-about-video-frame{border-radius:14px;box-shadow:0 15px 34px rgba(16,45,64,.14)}
      .program-about-activity-section{padding:0 18px 58px}.program-about-activity-card{min-height:390px;border-radius:14px;background-position:56% center}.program-about-activity-shade{background:linear-gradient(90deg,#071e2cf5,#0a2c3bdc)}.program-about-activity-content{padding:28px 22px}.program-about-activity-content h2{font-size:2.15rem}.program-about-activity-text{font-size:.96rem;line-height:1.68}.program-about-activity-link{width:100%;justify-content:center;min-height:48px}
      .program-about-pedagogy{margin:0 18px 38px;padding:12px 0 0}
      .program-about-pedagogy .pedagogy-logo{width:84px!important;height:84px!important}
      .program-about-pedagogy .names{flex-direction:column;align-items:center;margin-top:7px;line-height:1.55!important;row-gap:2px}
      .program-about-pedagogy .names .person{display:block;width:100%}
      .program-about-pedagogy .names .separator{display:none}
      .program-about-back{padding:0 18px 52px}.program-about-back a{align-items:center;justify-content:center;min-height:48px;padding:10px 20px}
    }
    @media(prefers-reduced-motion:reduce){.program-about-activity-link{transition:none}.program-about-activity-link:hover{transform:none}}
  `}</style></>;
}
