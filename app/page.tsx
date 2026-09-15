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
        {pillars.map(({title,icon:Icon})=><article className="home-program-card" key={title}><span className="home-program-icon"><Icon size={31} strokeWidth={1.75}/></span><h2>{title}</h2></article>)}
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
    .home-program-section{padding:clamp(48px,6vw,72px) clamp(22px,5vw,84px) clamp(48px,6vw,68px);background:linear-gradient(180deg,#fff 0%,#f7faf9 100%)}
    .home-program-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;max-width:1180px;margin:0 auto}
    .home-program-card{position:relative;min-height:180px;padding:28px 22px;border:1px solid transparent;border-radius:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:17px;text-align:center;overflow:hidden;box-shadow:0 10px 28px rgba(19,55,67,.07);transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease,background-color .34s ease}
    .home-program-card::after{content:"";position:absolute;inset:auto -28px -52px auto;width:112px;height:112px;border-radius:50%;background:currentColor;opacity:.045;pointer-events:none}
    .home-program-card:nth-child(1){background:linear-gradient(145deg,#edf8f6 0%,#f9fcfb 100%);border-color:#d4ebe7;color:#247f82}
    .home-program-card:nth-child(2){background:linear-gradient(145deg,#f0f5f9 0%,#fafcfd 100%);border-color:#dce6ec;color:#416b7f}
    .home-program-card:nth-child(3){background:linear-gradient(145deg,#fbf5ea 0%,#fffaf3 100%);border-color:#eee1c9;color:#8a6e43}
    .home-program-card:nth-child(4){background:linear-gradient(145deg,#f5f0f8 0%,#fcf9fd 100%);border-color:#e5daec;color:#78628a}
    .home-program-card:hover{transform:translateY(-4px);box-shadow:0 16px 36px rgba(19,55,67,.12)}
    .home-program-icon{width:68px;height:68px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.74);box-shadow:inset 0 0 0 1px rgba(255,255,255,.82),0 6px 18px rgba(26,66,78,.08);color:inherit}
    .home-program-card h2{position:relative;z-index:1;margin:0;color:#17394b;font-size:clamp(1.04rem,1.45vw,1.24rem);line-height:1.5;font-weight:700}
    .home-program-actions{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-top:32px}
    .home-program-button{display:inline-flex;align-items:center;justify-content:center;min-width:158px;padding:12px 23px;border-radius:999px;font-weight:700;border:1px solid var(--deep);transition:background-color .2s ease,color .2s ease,border-color .2s ease,transform .2s ease}
    .home-program-button.primary{background:var(--deep);color:#fff}
    .home-program-button.secondary{background:rgba(255,255,255,.72);color:var(--deep)}
    .home-program-button:hover{background:var(--teal);border-color:var(--teal);color:#fff;transform:translateY(-1px)}
    .home-pedagogy-section{padding-top:26px}
    .home-pedagogy-section .pedagogy{margin-top:0}

    .site-dark .home-program-section{background:linear-gradient(180deg,#102129 0%,#0d1c23 100%)}
    .site-dark .home-program-card{box-shadow:0 12px 30px rgba(0,0,0,.17)}
    .site-dark .home-program-card:nth-child(1){background:linear-gradient(145deg,#17343b 0%,#132b33 100%);border-color:#2c565d;color:#79c7c4}
    .site-dark .home-program-card:nth-child(2){background:linear-gradient(145deg,#192f3e 0%,#142833 100%);border-color:#304b5c;color:#84b7c7}
    .site-dark .home-program-card:nth-child(3){background:linear-gradient(145deg,#302d27 0%,#26251f 100%);border-color:#4b4639;color:#d0b27e}
    .site-dark .home-program-card:nth-child(4){background:linear-gradient(145deg,#2b2835 0%,#24222d 100%);border-color:#484153;color:#b9a0ca}
    .site-dark .home-program-card h2{color:#eef5f5}
    .site-dark .home-program-icon{background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px rgba(255,255,255,.06),0 7px 18px rgba(0,0,0,.13)}
    .site-dark .home-program-card:hover{box-shadow:0 18px 38px rgba(0,0,0,.25)}
    .site-dark .home-program-button.primary{background:#247f82;border-color:#247f82;color:#fff}
    .site-dark .home-program-button.secondary{background:rgba(255,255,255,.035);color:#dce8ea;border-color:#58717b}

    @media(max-width:900px){.home-program-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:600px){
      .home-program-section{padding:36px 20px 42px}
      .home-program-grid{grid-template-columns:1fr 1fr;gap:12px}
      .home-program-card{min-height:154px;padding:20px 12px;gap:13px;border-radius:20px}
      .home-program-icon{width:58px;height:58px}
      .home-program-icon svg{width:28px;height:28px}
      .home-program-card h2{font-size:.96rem;line-height:1.45}
      .home-program-actions{margin-top:26px}
      .home-program-button{min-width:138px}
      .home-pedagogy-section{padding-top:18px}
    }
  `}</style></>;
}
