import Link from "next/link";
import { BookOpen, Building2, Sparkles, Users } from "lucide-react";
import { Footer, Header } from "./components";
import { HeroCarousel } from "./hero-carousel";

const pillars = [
  {title:"מרחב מוזיאלי שכבתי",icon:Building2},
  {title:"תוכנית פדגוגית במסגרת השכלה כללית",icon:BookOpen},
  {title:"ליווי והנחיה על ידי המחנכים",icon:Users},
  {title:"למידה חווייתית, ערכית ודיגיטלית",icon:Sparkles},
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

    <section className="home-program-section" aria-label="מאפייני התוכנית">
      <div className="home-program-grid">
        {pillars.map(({title,icon:Icon})=><article className="home-program-card" key={title}><Icon size={34} strokeWidth={1.7}/><h2>{title}</h2></article>)}
      </div>
      <div className="home-program-actions">
        <Link className="home-program-button primary" href="/about">על התוכנית</Link>
        <Link className="home-program-button secondary" href="/lessons">לכל השיעורים</Link>
      </div>
    </section>

    <section className="about-section home-pedagogy-section">
      <div className="pedagogy"><div className="pedagogy-heading" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:0,width:"100%",marginBottom:"4px"}}><img className="pedagogy-logo" src="/maof-logo.png" alt="צוות מעו״ף" style={{width:"128px",height:"128px",objectFit:"contain",background:"transparent",flex:"0 0 auto",marginBottom:"-10px"}}/><p className="pedagogy-title" style={{margin:0,color:"var(--teal)",fontSize:"clamp(1.2rem,3.2vw,1.5rem)",fontWeight:700,lineHeight:1.15}}>פיתוח פדגוגי</p></div><p className="names" style={{justifyContent:"center",textAlign:"center",fontSize:"clamp(1.03rem,2.3vw,1.16rem)",lineHeight:1.85}}><span className="person">ענת ברון לוביש - סגנית פדגוגית</span><span className="separator" aria-hidden="true">•</span><span className="person">אתי נייברג - רכזת פדגוגית חט״ב</span><span className="separator" aria-hidden="true">•</span><span className="person">נטלי בן חמו - רכזת חינוך חברתי</span></p><p className="team" style={{textAlign:"center",marginTop:"10px"}}>צוות מעו״ף | מקיף ז׳ אשדוד</p></div>
    </section>
  </main><Footer/>
  <style>{`
    .home-program-section{padding:clamp(50px,6vw,78px) clamp(22px,5vw,84px) clamp(48px,6vw,72px);background:#fff}
    .home-program-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;max-width:1180px;margin:0 auto}
    .home-program-card{min-height:170px;padding:28px 22px;border:1px solid var(--line);background:#f7f9f8;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;text-align:center}
    .home-program-card svg{color:var(--teal)}
    .home-program-card h2{margin:0;color:var(--navy);font-size:clamp(1.05rem,1.5vw,1.28rem);line-height:1.45}
    .home-program-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:30px}
    .home-program-button{display:inline-flex;align-items:center;justify-content:center;min-width:150px;padding:12px 22px;border-radius:999px;font-weight:700;border:1px solid var(--deep);transition:background-color .2s ease,color .2s ease,border-color .2s ease}
    .home-program-button.primary{background:var(--deep);color:#fff}
    .home-program-button.secondary{background:transparent;color:var(--deep)}
    .home-program-button:hover{background:var(--teal);border-color:var(--teal);color:#fff}
    .home-pedagogy-section{padding-top:26px}
    .home-pedagogy-section .pedagogy{margin-top:0}
    .home-dark .home-program-section{background:#102129}
    .home-dark .home-program-card{background:#172c35;border-color:#2d4650}
    .home-dark .home-program-card h2{color:#eef5f5}
    .home-dark .home-program-card svg{color:#7fc8c4}
    .home-dark .home-program-button.primary{background:#247f82;border-color:#247f82;color:#fff}
    .home-dark .home-program-button.secondary{color:#dce8ea;border-color:#58717b}
    @media(max-width:900px){.home-program-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:600px){.home-program-section{padding:38px 20px 42px}.home-program-grid{grid-template-columns:1fr 1fr;gap:10px}.home-program-card{min-height:142px;padding:22px 14px;gap:13px}.home-program-card svg{width:30px;height:30px}.home-program-card h2{font-size:.98rem}.home-program-actions{margin-top:24px}.home-program-button{min-width:135px}.home-pedagogy-section{padding-top:18px}}
  `}</style></>;
}
