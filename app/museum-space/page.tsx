import Link from "next/link";
import { ArrowLeft, KeyRound, MapPin } from "lucide-react";
import { Footer, Header } from "../components";

export default function MuseumSpacePage(){
  return <><Header/><main className="museum-space-page">
    <section className="museum-space-hero">
      <img src="/file_000000001f34820aa8188af788222a31.png" alt="המרחב המוזיאלי של תוכנית אני ישראלי"/>
      <div className="museum-space-shade"/>
      <div className="museum-space-hero-copy">
        <p>אני ישראלי | למידה במרחב</p>
        <h1>המרחב המוזיאלי</h1>
        <span>כשהסיפור הישראלי הופך למקום שאפשר להיכנס אליו</span>
      </div>
    </section>

    <section className="museum-space-intro">
      <p className="museum-space-kicker"><MapPin size={17}/> מרחב שכבתי פעיל</p>
      <h2>לא רק לראות את הסיפור — לנוע בתוכו</h2>
      <p>המרחב המוזיאלי נבנה כחלק מתוכנית „אני ישראלי” ומרחיב את הלמידה מעבר לכיתה. תצוגות, ציטוטים, דימויים, תחנות תוכן ופעילויות חקר הופכים את המרחב עצמו לכלי למידה: מקום שבו מתבוננים, מחפשים, שואלים, מפענחים ומחברים בין אנשים, אירועים, תרבות, מורשת וזהות.</p>
    </section>

    <section className="museum-space-video" aria-labelledby="museum-video-title">
      <div className="museum-space-section-heading">
        <p>הצצה למרחב</p>
        <h2 id="museum-video-title">המרחב בפעולה</h2>
        <span>סיור קצר במרחב שנבנה עבור תלמידי שכבה י׳.</span>
      </div>
      <div className="museum-space-video-frame">
        <video controls preload="metadata" playsInline aria-label="סרטון הצצה למרחב המוזיאלי של תוכנית אני ישראלי">
          <source src="/museum-space-compressed.mp4" type="video/mp4"/>
          הדפדפן שלך אינו תומך בניגון וידאו.
        </video>
      </div>
    </section>

    <section className="museum-space-activities" aria-labelledby="space-activities-title">
      <div className="museum-space-section-heading">
        <p>לומדים בתוך המרחב</p>
        <h2 id="space-activities-title">פעילויות במרחב</h2>
        <span>פעילויות שנבנו במיוחד כדי להפוך את התצוגות לחלק מהמשימה עצמה.</span>
      </div>
      <article className="museum-space-escape-card">
        <div className="museum-space-escape-shade"/>
        <div className="museum-space-escape-content">
          <span className="museum-space-escape-icon"><KeyRound size={25}/></span>
          <p>חדר בריחה | 7 תחנות</p>
          <h3>מנהרת הזמן – „אני ישראלי”</h3>
          <span>מסע קבוצתי שהופך את המרחב לזירת חקר פעילה. התלמידים נעים בין התצוגות, מחפשים רמזים, מפענחים קודים ופוגשים דמויות, אירועים, שירים וסמלים מתוך הסיפור הישראלי.</span>
          <Link href="/escape-room" className="museum-space-escape-link">כניסה למנהרת הזמן <ArrowLeft size={18}/></Link>
        </div>
      </article>
    </section>
  </main><Footer/>
  <style>{`
    .museum-space-page{min-height:100vh;background:#f7f9f8;color:var(--text)}
    .museum-space-hero{position:relative;height:clamp(360px,48vw,620px);overflow:hidden;color:#fff}
    .museum-space-hero>img{width:100%;height:100%;object-fit:cover;object-position:center 44%}
    .museum-space-shade{position:absolute;inset:0;background:linear-gradient(90deg,#071e2cd8 0%,#0a2c3b8a 48%,#0a2c3b28 82%),linear-gradient(0deg,#071e2c88 0%,transparent 64%)}
    .museum-space-hero-copy{position:absolute;right:clamp(24px,7vw,120px);bottom:clamp(40px,6vw,74px);max-width:820px;text-align:right}
    .museum-space-hero-copy p{margin:0 0 10px;color:#c9e9e6;font-size:.9rem;font-weight:800;letter-spacing:.04em}
    .museum-space-hero-copy h1{margin:0;font-size:clamp(3.4rem,7vw,6.8rem);line-height:.96;letter-spacing:-.055em}
    .museum-space-hero-copy span{display:block;margin-top:16px;color:#edf7f6;font-size:clamp(1.02rem,1.7vw,1.28rem);line-height:1.55}
    .museum-space-intro{max-width:1050px;margin:0 auto;padding:clamp(58px,7vw,88px) clamp(22px,5vw,52px) clamp(48px,6vw,70px);text-align:right}
    .museum-space-kicker{display:flex;align-items:center;gap:8px;margin:0 0 10px;color:var(--teal);font-size:.9rem;font-weight:800}
    .museum-space-intro h2,.museum-space-section-heading h2{margin:0;color:var(--navy);font-size:clamp(2.2rem,4vw,4rem);line-height:1.08;letter-spacing:-.04em}
    .museum-space-intro>p:last-child{max-width:790px;margin:24px 0 0;color:#3c5968;font-size:clamp(1.04rem,1.5vw,1.2rem);line-height:1.9}
    .museum-space-video,.museum-space-activities{max-width:1180px;margin:0 auto;padding:0 clamp(22px,5vw,52px) clamp(66px,8vw,96px);text-align:right}
    .museum-space-section-heading{max-width:820px;margin:0 0 24px auto}
    .museum-space-section-heading>p{margin:0 0 8px;color:var(--teal);font-size:.86rem;font-weight:800;letter-spacing:.035em}
    .museum-space-section-heading>span{display:block;max-width:720px;margin-top:14px;color:#526d79;font-size:1rem;line-height:1.75}
    .museum-space-video-frame{overflow:hidden;border:1px solid #d5e1df;border-radius:22px;background:#071e2c;box-shadow:0 22px 55px rgba(16,45,64,.16)}
    .museum-space-video-frame video{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;background:#071e2c}
    .museum-space-escape-card{position:relative;min-height:360px;overflow:hidden;border-radius:22px;background-image:url('/file_000000001f34820aa8188af788222a31.png');background-size:cover;background-position:center 44%;box-shadow:0 20px 48px rgba(16,45,64,.14)}
    .museum-space-escape-shade{position:absolute;inset:0;background:linear-gradient(90deg,#071e2cf2 0%,#0a2c3bdd 48%,#0a2c3b68 100%)}
    .museum-space-escape-content{position:relative;z-index:1;max-width:690px;padding:clamp(30px,5vw,52px);color:#fff}
    .museum-space-escape-icon{display:grid;width:50px;height:50px;place-items:center;margin-bottom:18px;border:1px solid #ffffff2d;border-radius:14px;background:#ffffff10;color:#e8f3ed}
    .museum-space-escape-content>p{margin:0 0 10px;color:#9fd8d4;font-size:.84rem;font-weight:800;letter-spacing:.04em}
    .museum-space-escape-content h3{margin:0;color:#fff;font-size:clamp(2.1rem,4vw,3.6rem);line-height:1.08;letter-spacing:-.04em}
    .museum-space-escape-content>span:not(.museum-space-escape-icon){display:block;max-width:620px;margin-top:17px;color:#dbe8e8;font-size:1rem;line-height:1.75}
    .museum-space-escape-link{display:inline-flex;align-items:center;gap:8px;min-height:48px;margin-top:26px;padding:0 18px;border-radius:12px;background:#f4e0a9;color:#163442;font-weight:800;transition:transform .2s ease,background-color .2s ease}
    .museum-space-escape-link:hover{transform:translateY(-1px);background:#fff0c6}
    .site-dark .museum-space-page{background:#102129}
    .site-dark .museum-space-intro h2,.site-dark .museum-space-section-heading h2{color:#edf5f5}
    .site-dark .museum-space-intro>p:last-child,.site-dark .museum-space-section-heading>span{color:#b4c5ca}
    .site-dark .museum-space-video-frame{border-color:#314852;background:#07161d;box-shadow:0 24px 58px rgba(0,0,0,.3)}
    .site-dark .museum-space-escape-card{box-shadow:0 22px 52px rgba(0,0,0,.28)}
    @media(max-width:700px){
      .museum-space-hero{height:430px}.museum-space-hero>img{object-position:55% center}.museum-space-hero-copy{right:20px;left:20px;bottom:34px}.museum-space-hero-copy h1{font-size:3.35rem}.museum-space-hero-copy span{font-size:1rem;margin-top:12px}
      .museum-space-intro{padding:46px 20px 42px}.museum-space-intro h2,.museum-space-section-heading h2{font-size:2.1rem}.museum-space-intro>p:last-child{font-size:1rem;line-height:1.82;margin-top:18px}
      .museum-space-video,.museum-space-activities{padding:0 18px 58px}.museum-space-section-heading{margin-bottom:16px}.museum-space-section-heading>span{font-size:.96rem;line-height:1.68;margin-top:11px}
      .museum-space-video-frame{border-radius:14px;box-shadow:0 15px 34px rgba(16,45,64,.14)}
      .museum-space-escape-card{min-height:410px;border-radius:14px;background-position:56% center}.museum-space-escape-shade{background:linear-gradient(90deg,#071e2cf7,#0a2c3be4)}.museum-space-escape-content{padding:30px 22px}.museum-space-escape-content h3{font-size:2.25rem}.museum-space-escape-content>span:not(.museum-space-escape-icon){font-size:.96rem;line-height:1.68}.museum-space-escape-link{width:100%;justify-content:center}
    }
    @media(prefers-reduced-motion:reduce){.museum-space-escape-link{transition:none}.museum-space-escape-link:hover{transform:none}}
  `}</style></>;
}
