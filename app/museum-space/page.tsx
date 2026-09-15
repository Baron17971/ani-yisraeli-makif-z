import { MapPin } from "lucide-react";
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
      <p>המרחב המוזיאלי נבנה כחלק מתוכנית „אני ישראלי” ומרחיב את הלמידה מעבר לכיתה. תצוגות, ציטוטים, דימויים ותחנות תוכן הופכים את המרחב עצמו לכלי למידה: מקום שבו מתבוננים, מחפשים, שואלים ומחברים בין אנשים, אירועים, תרבות, מורשת וזהות.</p>
      <p>הפעילויות הפדגוגיות המופעלות במרחב מופיעות בספריית השיעורים למורים, לצד מערכי השיעור האחרים של התוכנית.</p>
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
    .museum-space-intro>p:not(.museum-space-kicker){max-width:790px;margin:22px 0 0;color:#3c5968;font-size:clamp(1.02rem,1.5vw,1.18rem);line-height:1.9}
    .museum-space-video{max-width:1180px;margin:0 auto;padding:0 clamp(22px,5vw,52px) clamp(66px,8vw,96px);text-align:right}
    .museum-space-section-heading{max-width:820px;margin:0 0 24px auto}
    .museum-space-section-heading>p{margin:0 0 8px;color:var(--teal);font-size:.86rem;font-weight:800;letter-spacing:.035em}
    .museum-space-section-heading>span{display:block;max-width:720px;margin-top:14px;color:#526d79;font-size:1rem;line-height:1.75}
    .museum-space-video-frame{overflow:hidden;border:1px solid #d5e1df;border-radius:22px;background:#071e2c;box-shadow:0 22px 55px rgba(16,45,64,.16)}
    .museum-space-video-frame video{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;background:#071e2c}
    .site-dark .museum-space-page{background:#102129}
    .site-dark .museum-space-intro h2,.site-dark .museum-space-section-heading h2{color:#edf5f5}
    .site-dark .museum-space-intro>p:not(.museum-space-kicker),.site-dark .museum-space-section-heading>span{color:#b4c5ca}
    .site-dark .museum-space-video-frame{border-color:#314852;background:#07161d;box-shadow:0 24px 58px rgba(0,0,0,.3)}
    @media(max-width:700px){
      .museum-space-hero{height:430px}.museum-space-hero>img{object-position:55% center}.museum-space-hero-copy{right:20px;left:20px;bottom:34px}.museum-space-hero-copy h1{font-size:3.35rem}.museum-space-hero-copy span{font-size:1rem;margin-top:12px}
      .museum-space-intro{padding:46px 20px 42px}.museum-space-intro h2,.museum-space-section-heading h2{font-size:2.1rem}.museum-space-intro>p:not(.museum-space-kicker){font-size:1rem;line-height:1.82;margin-top:18px}
      .museum-space-video{padding:0 18px 58px}.museum-space-section-heading{margin-bottom:16px}.museum-space-section-heading>span{font-size:.96rem;line-height:1.68;margin-top:11px}
      .museum-space-video-frame{border-radius:14px;box-shadow:0 15px 34px rgba(16,45,64,.14)}
    }
  `}</style></>;
}
