"use client";

import { Copy, ExternalLink, KeyRound, Link2, LockKeyhole, MapPin, MonitorSmartphone, RefreshCw, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { Footer, Header } from "../../components";

const answers = [
  ["תחנה 1", "643"],
  ["תחנה 2", "496"],
  ["תחנה 3", "126"],
  ["תחנה 4", "5713"],
  ["תחנה 5", "אילן רמון"],
  ["סימן דרך", "מנחם בגין"],
  ["תחנה 6", "יצחק רבין"],
  ["תחנה 7", "האוניברסיטה העברית"],
  ["קו הסיום", "פלא"],
];

function makeRoomCode() {
  return `${Date.now().toString(36).slice(-4)}${Math.random().toString(36).slice(2, 5)}`.toUpperCase();
}

export default function TimeTunnelTeacherPage() {
  const [className, setClassName] = useState("");
  const [studentLink, setStudentLink] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [copied, setCopied] = useState(false);

  const createLink = () => {
    const cleanClass = className.trim();
    if (!cleanClass) return;
    const code = makeRoomCode();
    const link = `${window.location.origin}/escape-room/play?room=${encodeURIComponent(code)}&class=${encodeURIComponent(cleanClass)}`;
    setRoomCode(code);
    setStudentLink(link);
    setCopied(false);
  };

  const copyLink = async () => {
    if (!studentLink) return;
    try {
      await navigator.clipboard.writeText(studentLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("העתיקו את הקישור:", studentLink);
    }
  };

  return <><Header/><main className="time-tunnel-teacher">
    <section className="tt-hero">
      <img src="/file_0000000003a88210a371a05ea412fa06.png" alt="מנהרת הזמן – אני ישראלי"/>
      <div className="tt-hero-shade"/>
      <div className="tt-hero-copy">
        <p>שיעור פתיחה | למידה במרחב</p>
        <h1>מנהרת הזמן</h1>
        <h2>חדר בריחה במרחב המוזיאלי</h2>
        <span>פעילות קבוצתית פיזית־דיגיטלית שבה המרחב עצמו הופך לחלק מהחידה.</span>
      </div>
    </section>

    <section className="tt-meta">
      <span><b>שכבה</b> י׳</span>
      <span><b>מבנה</b> עבודה בקבוצות</span>
      <span><b>תחנות</b> 7 + קו סיום</span>
      <span><b>משך</b> גמיש לפי קצב הכיתה</span>
    </section>

    <section className="tt-content">
      <div className="tt-main">
        <section className="tt-section">
          <p className="tt-kicker">על הפעילות</p>
          <h2>המרחב הופך למגרש משחק</h2>
          <p>„מנהרת הזמן” היא פעילות חקר קבוצתית המשלבת בין אפליקציית תלמידים לבין המרחב המוזיאלי. התלמידים מתקדמים בתחנות לפי סדר, מפענחים קודים ורמזים, מחפשים דמויות ותצוגות במרחב ומחברים בין אירועים, אנשים, תרבות, מורשת וזהות ישראלית.</p>
          <p>הפעילות נבנתה כך שהטלפון אינו מחליף את המרחב: בחלק מהתחנות התלמידים חייבים לקום, לחפש, להתבונן ולהיעזר במה שנמצא סביבם כדי להמשיך.</p>
        </section>

        <section className="tt-section tt-video-section">
          <p className="tt-kicker">הצצה למנהרת הזמן</p>
          <h2>כך נראית החוויה במרחב</h2>
          <p>סרטון קצר שממחיש את האווירה, החיבור בין המרחב הפיזי לאפליקציה ואת אופי המסע שהתלמידים עוברים לאורך הפעילות.</p>
          <div className="tt-video-wrap">
            <video controls preload="metadata" playsInline poster="/file_000000001f34820aa8188af788222a31.png">
              <source src="/escape-room/time-tunnel-teacher-video.mp4" type="video/mp4"/>
              הדפדפן אינו תומך בניגון וידאו.
            </video>
          </div>
        </section>

        <section className="tt-section">
          <p className="tt-kicker">מטרות</p>
          <h2>מה התלמידים מתרגלים?</h2>
          <div className="tt-objectives">
            <article><MapPin size={22}/><h3>למידה מתוך המרחב</h3><p>שימוש בתצוגות, בדמויות וברמזים כמקור מידע פעיל.</p></article>
            <article><Sparkles size={22}/><h3>חיבור בין סיפורים</h3><p>זיהוי קשרים בין דמויות, אירועים, סמלים, תרבות וזיכרון.</p></article>
            <article><Users size={22}/><h3>עבודת צוות</h3><p>שיתוף פעולה, חלוקת משימות, קבלת החלטות ופתרון בעיות.</p></article>
            <article><MonitorSmartphone size={22}/><h3>פיזי + דיגיטלי</h3><p>מעבר רציף בין חידה על המסך לבין חיפוש ופעולה במרחב.</p></article>
          </div>
        </section>

        <section className="tt-section">
          <p className="tt-kicker">לפני שמתחילים</p>
          <h2>היערכות למורה</h2>
          <div className="tt-prep">
            <span>חלקו את הכיתה לקבוצות קטנות, עם טלפון אחד לפחות לכל קבוצה.</span>
            <span>ודאו שכל הדמויות, התצוגות והרמזים במרחב נגישים וברורים.</span>
            <span>פתחו קישור כיתתי חדש לכל כיתה. כל קישור מקבל מזהה הפעלה נפרד.</span>
            <span>בתחנה 3, קבוצה שמבקשת רמז מהמורה ממתינה חמש דקות לפני קבלת הרמז.</span>
          </div>
        </section>

        <section className="tt-section">
          <p className="tt-kicker">מהלך הפעילות</p>
          <h2>רצף המשחק</h2>
          <div className="tt-flow">
            <article><b>01</b><div><h3>פתיחה וחלוקה לקבוצות</h3><p>כל קבוצה נכנסת דרך הקישור הכיתתי, מזינה את שמות חבריה ומתחילה את הטיימר.</p></div></article>
            <article><b>02</b><div><h3>שבע תחנות</h3><p>התחנות נפתחות בזו אחר זו. אי אפשר לדלג קדימה ללא פתרון נכון.</p></div></article>
            <article><b>03</b><div><h3>סימן דרך במרחב</h3><p>לאחר תחנה 5 התלמידים ניגשים לדמות שזיהו, מקשיבים וממשיכים דרך מנחם בגין אל תחנה 6.</p></div></article>
            <article><b>04</b><div><h3>בדרך לקו הסיום</h3><p>לאחר תחנה 7 נפתחת החידה האחרונה, שמובילה את הקבוצות לחדר „פלא”.</p></div></article>
          </div>
        </section>

        <section className="tt-section teacher-only">
          <p className="tt-kicker"><LockKeyhole size={16}/> למורה בלבד</p>
          <h2>פתרונות ובקרה</h2>
          <p>מומלץ להשאיר את האזור הזה סגור בזמן הקרנת העמוד בכיתה.</p>
          <details>
            <summary>הצגת הפתרונות</summary>
            <div className="answer-grid">
              {answers.map(([label,value])=><div key={label}><span>{label}</span><strong>{value}</strong></div>)}
            </div>
          </details>
        </section>
      </div>

      <aside className="tt-launch" aria-labelledby="launch-title">
        <span className="tt-launch-icon"><KeyRound size={27}/></span>
        <p className="tt-kicker">הפעלת הכיתה</p>
        <h2 id="launch-title">פתיחת מנהרת הזמן לתלמידים</h2>
        <p>צרו קישור חדש לכל כיתה. ההתקדמות נשמרת לפי מזהה ההפעלה, ולכן פעילות של כיתה אחת אינה מתערבבת בזו של כיתה אחרת.</p>
        <label>שם הכיתה
          <input value={className} onChange={e=>setClassName(e.target.value)} placeholder="לדוגמה: י׳1"/>
        </label>
        <button className="tt-generate" type="button" onClick={createLink} disabled={!className.trim()}>
          {studentLink ? <><RefreshCw size={18}/> יצירת קישור חדש</> : <><Link2 size={18}/> יצירת קישור לכיתה</>}
        </button>

        {studentLink && <div className="tt-link-result">
          <div className="tt-room-code"><span>מזהה הפעלה</span><strong>{roomCode}</strong></div>
          <div className="tt-url" dir="ltr">{studentLink}</div>
          <div className="tt-link-actions">
            <button type="button" onClick={copyLink}><Copy size={17}/>{copied?"הועתק":"העתקת קישור"}</button>
            <a href={studentLink} target="_blank" rel="noreferrer"><ExternalLink size={17}/> פתיחת פעילות</a>
          </div>
          <small>שלחו את אותו קישור לכל הקבוצות בכיתה זו. לכיתה אחרת צרו קישור חדש.</small>
        </div>}
      </aside>
    </section>
  </main><Footer/>
  <style jsx global>{`
    .time-tunnel-teacher{background:#f7f9f8;color:var(--text)}
    .tt-hero{position:relative;height:clamp(360px,47vw,600px);overflow:hidden;color:#fff}
    .tt-hero>img{width:100%;height:100%;object-fit:cover;object-position:center 44%}
    .tt-hero-shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(24,24,24,.84) 0%,rgba(42,42,42,.56) 54%,rgba(58,58,58,.18) 100%),linear-gradient(0deg,rgba(22,22,22,.58),transparent 65%)}
    .tt-hero-copy{position:absolute;right:clamp(24px,7vw,120px);bottom:clamp(38px,6vw,70px);max-width:840px;text-align:right}
    .tt-hero-copy p{margin:0 0 9px;color:#b9dfdb;font-size:.9rem;font-weight:800}.tt-hero-copy h1{margin:0;font-size:clamp(3.8rem,8vw,7rem);line-height:.92;letter-spacing:-.055em}.tt-hero-copy h2{margin:13px 0 0;font-size:clamp(1.45rem,3vw,2.4rem);font-weight:700}.tt-hero-copy span{display:block;max-width:700px;margin-top:14px;color:#e2efef;font-size:clamp(1rem,1.5vw,1.18rem);line-height:1.65}
    .tt-meta{max-width:1180px;margin:0 auto;padding:20px clamp(22px,5vw,52px);display:flex;flex-wrap:wrap;gap:10px;border-bottom:1px solid #dce5e3}.tt-meta span{padding:8px 12px;border:1px solid #d7e2e0;border-radius:999px;background:#fff;color:#526d79;font-size:.86rem}.tt-meta b{color:#173b4c;margin-left:5px}
    .tt-content{max-width:1180px;margin:0 auto;padding:clamp(44px,6vw,72px) clamp(22px,5vw,52px) 78px;display:grid;grid-template-columns:minmax(0,1fr) 350px;gap:46px;align-items:start}
    .tt-main{display:grid;gap:58px}.tt-section{text-align:right}.tt-kicker{display:flex;align-items:center;gap:7px;margin:0 0 9px;color:var(--teal);font-size:.84rem;font-weight:800;letter-spacing:.035em}.tt-section h2,.tt-launch h2{margin:0;color:var(--navy);font-size:clamp(2rem,3.4vw,3.2rem);line-height:1.08;letter-spacing:-.035em}.tt-section>p:not(.tt-kicker){max-width:760px;color:#526d79;font-size:1rem;line-height:1.86}
    .tt-video-wrap{margin-top:22px;overflow:hidden;border:1px solid #d7e2e0;border-radius:18px;background:#081a23;box-shadow:0 18px 44px rgba(16,45,64,.12);aspect-ratio:16/9}.tt-video-wrap video{display:block;width:100%;height:100%;object-fit:cover;background:#081a23}
    .tt-objectives{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:24px}.tt-objectives article{padding:22px;border:1px solid #dbe5e2;border-radius:16px;background:#fff}.tt-objectives svg{color:#247f82}.tt-objectives h3{margin:12px 0 7px;color:#173b4c;font-size:1.1rem}.tt-objectives p{margin:0;color:#627983;line-height:1.7;font-size:.92rem}
    .tt-prep{display:grid;gap:10px;margin-top:22px}.tt-prep span{position:relative;padding:14px 44px 14px 16px;border:1px solid #dbe5e2;border-radius:13px;background:#fff;color:#526d79;line-height:1.7}.tt-prep span::before{content:"✓";position:absolute;right:16px;top:14px;color:#247f82;font-weight:900}
    .tt-flow{display:grid;gap:14px;margin-top:22px}.tt-flow article{display:grid;grid-template-columns:46px 1fr;gap:15px;padding:18px 0;border-bottom:1px solid #dce5e3}.tt-flow article>b{width:42px;height:42px;display:grid;place-items:center;border-radius:50%;background:#173b4c;color:#fff;font-size:.8rem}.tt-flow h3{margin:0 0 5px;color:#173b4c;font-size:1.08rem}.tt-flow p{margin:0;color:#627983;line-height:1.7;font-size:.94rem}
    .teacher-only{padding:24px;border:1px solid #dccb9d;border-radius:18px;background:#fffaf0}.teacher-only details{margin-top:18px}.teacher-only summary{cursor:pointer;font-weight:900;color:#173b4c}.answer-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-top:16px}.answer-grid>div{padding:11px;border:1px solid #e7dcc1;border-radius:11px;background:#fff;display:flex;flex-direction:column;gap:3px}.answer-grid span{color:#7a7d78;font-size:.74rem}.answer-grid strong{color:#173b4c}
    .tt-launch{position:sticky;top:92px;padding:25px;border:1px solid #d5e2df;border-radius:20px;background:#fff;box-shadow:0 18px 48px rgba(16,45,64,.1);text-align:right}.tt-launch-icon{display:grid;width:52px;height:52px;place-items:center;margin-bottom:16px;border-radius:15px;background:#e8f4f2;color:#247f82}.tt-launch h2{font-size:1.8rem}.tt-launch>p:not(.tt-kicker){color:#627983;line-height:1.75;font-size:.93rem}.tt-launch label{display:grid;gap:7px;margin-top:18px;color:#173b4c;font-size:.86rem;font-weight:800}.tt-launch input{min-height:48px;padding:0 13px;border:1px solid #ccd9d7;border-radius:11px;background:#fff;font:inherit;outline:none}.tt-launch input:focus{border-color:#247f82;box-shadow:0 0 0 3px #247f8218}
    .tt-generate{width:100%;min-height:49px;margin-top:11px;display:flex;align-items:center;justify-content:center;gap:7px;border:0;border-radius:11px;background:#173b4c;color:#fff;font-weight:900;cursor:pointer}.tt-generate:disabled{opacity:.45;cursor:not-allowed}
    .tt-link-result{margin-top:16px;padding:15px;border:1px solid #d8e4e1;border-radius:13px;background:#f7fbfa}.tt-room-code{display:flex;justify-content:space-between;align-items:center}.tt-room-code span{color:#73868d;font-size:.76rem}.tt-room-code strong{color:#173b4c;letter-spacing:.09em}.tt-url{margin-top:10px;padding:9px;border-radius:8px;background:#fff;border:1px solid #e0e8e6;color:#5c7178;font-size:.72rem;word-break:break-all}.tt-link-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}.tt-link-actions button,.tt-link-actions a{min-height:42px;display:flex;align-items:center;justify-content:center;gap:6px;border-radius:9px;font:inherit;font-size:.8rem;font-weight:800;cursor:pointer}.tt-link-actions button{border:1px solid #c9d8d5;background:#fff;color:#173b4c}.tt-link-actions a{background:#247f82;color:#fff}.tt-link-result small{display:block;margin-top:10px;color:#72858b;line-height:1.5}
    .site-dark .time-tunnel-teacher{background:#102129}.site-dark .tt-meta{border-color:#263e48}.site-dark .tt-meta span,.site-dark .tt-objectives article,.site-dark .tt-prep span,.site-dark .tt-launch{background:#172c35;border-color:#314852}.site-dark .tt-meta span,.site-dark .tt-section>p:not(.tt-kicker),.site-dark .tt-objectives p,.site-dark .tt-prep span,.site-dark .tt-flow p,.site-dark .tt-launch>p:not(.tt-kicker){color:#b4c5ca}.site-dark .tt-meta b,.site-dark .tt-section h2,.site-dark .tt-launch h2,.site-dark .tt-objectives h3,.site-dark .tt-flow h3{color:#edf5f5}.site-dark .tt-video-wrap{border-color:#314852;box-shadow:none}.site-dark .teacher-only{background:#2c2a22;border-color:#5b5135}.site-dark .teacher-only summary,.site-dark .answer-grid strong{color:#f0f4f3}.site-dark .answer-grid>div{background:#172c35;border-color:#4c4636}.site-dark .tt-launch input,.site-dark .tt-url,.site-dark .tt-link-actions button{background:#102129;border-color:#314852;color:#e6efee}.site-dark .tt-link-result{background:#11262f;border-color:#314852}
    @media(max-width:850px){.tt-content{grid-template-columns:1fr;gap:42px}.tt-launch{position:static;order:-1}.tt-objectives{grid-template-columns:1fr 1fr}}
    @media(max-width:700px){.tt-hero{height:430px}.tt-hero>img{object-position:56% center}.tt-hero-copy{right:20px;left:20px;bottom:34px}.tt-hero-copy h1{font-size:4rem}.tt-hero-copy h2{font-size:1.45rem}.tt-meta{padding:15px 18px;gap:7px}.tt-meta span{font-size:.79rem}.tt-content{padding:38px 18px 58px}.tt-main{gap:46px}.tt-section h2{font-size:2rem}.tt-objectives{grid-template-columns:1fr}.tt-objectives article{padding:19px}.tt-video-wrap{border-radius:14px}.answer-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.tt-launch{padding:21px;border-radius:16px}.tt-link-actions{grid-template-columns:1fr}}
  `}</style></>;
}
