import Link from "next/link";
import { ArrowLeft, BookOpen, Building2, Sparkles, Users } from "lucide-react";
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
        {pillars.map(({title,icon:Icon},index)=><article className="home-program-card" key={title}><span className="home-program-signature" aria-hidden="true">{String(index+1).padStart(2,"0")}</span><span className="home-program-icon"><Icon size={31} strokeWidth={1.75}/></span><h2>{title}</h2></article>)}
      </div>
      <div className="home-program-actions">
        <Link className="home-program-button primary" href="/about"><span>על התוכנית</span><ArrowLeft size={17} strokeWidth={1.8}/></Link>
        <Link className="home-program-button secondary" href="/lessons"><span>לכל השיעורים</span><ArrowLeft size={17} strokeWidth={1.8}/></Link>
      </div>
    </section>

    <section className="about-section home-pedagogy-section">
      <div className="pedagogy"><div className="pedagogy-heading" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:0,width:"100%",marginBottom:"2px"}}><img className="pedagogy-logo" src="/maof-logo.png" alt="צוות מעו״ף" style={{width:"96px",height:"96px",objectFit:"contain",background:"transparent",flex:"0 0 auto",marginBottom:"-8px"}}/><p className="pedagogy-title" style={{margin:0,color:"var(--teal)",fontSize:"clamp(1.25rem,2.8vw,1.5rem)",fontWeight:800,lineHeight:1.15}}>פיתוח פדגוגי</p></div><p className="names" style={{justifyContent:"center",textAlign:"center",fontSize:"clamp(.98rem,2vw,1.08rem)",lineHeight:1.65}}><span className="person">ענת ברון לוביש - סגנית פדגוגית</span><span className="separator" aria-hidden="true">•</span><span className="person">אתי נייברג - רכזת פדגוגית חט״ב</span><span className="separator" aria-hidden="true">•</span><span className="person">נטלי בן חמו - רכזת חינוך חברתי</span></p><p className="team" style={{textAlign:"center",marginTop:"4px"}}>צוות מעו״ף | מקיף ז׳ אשדוד</p></div>
    </section>
  </main><Footer/>
  <style>{`
    .quote-section{padding-top:clamp(20px,2.2vw,28px)!important;padding-bottom:clamp(24px,3vw,36px)!important;border-bottom:1px solid #e3ecef}
    .home-program-section{position:relative;padding:clamp(42px,5.2vw,62px) clamp(22px,5vw,84px) clamp(42px,5.4vw,62px);background:linear-gradient(180deg,#f8fcfd 0%,#f3f9fb 100%);border-bottom:1px solid #dce9ed}
    .home-program-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;max-width:1180px;margin:0 auto}
    .home-program-card{position:relative;min-height:190px;padding:26px 22px;border:1px solid transparent;border-radius:24px;display:grid;grid-template-rows:68px 4.5em;align-content:center;justify-items:center;gap:16px;text-align:center;overflow:hidden;box-shadow:0 12px 30px rgba(15,48,62,.15);transition:transform .24s ease,box-shadow .24s ease,border-color .24s ease,background-color .24s ease}
    .home-program-card::before{content:"";position:absolute;top:0;right:26px;left:26px;height:1px;background:currentColor;opacity:.28}
    .home-program-card::after{content:"";position:absolute;inset:auto -28px -52px auto;width:112px;height:112px;border-radius:50%;background:currentColor;opacity:.08;pointer-events:none}
    .home-program-signature{position:absolute;top:14px;right:17px;z-index:2;color:currentColor;opacity:.66;font-size:.7rem;font-weight:700;letter-spacing:.12em;line-height:1}
    .home-program-card:nth-child(1){background:linear-gradient(145deg,#03045e 0%,#0077b6 100%);border-color:#03045e;color:#caf0f8}
    .home-program-card:nth-child(2){background:linear-gradient(145deg,#0077b6 0%,#00b4d8 100%);border-color:#0077b6;color:#caf0f8}
    .home-program-card:nth-child(3){background:linear-gradient(145deg,#00b4d8 0%,#90e0ef 100%);border-color:#00b4d8;color:#03045e}
    .home-program-card:nth-child(4){background:linear-gradient(145deg,#90e0ef 0%,#caf0f8 100%);border-color:#90e0ef;color:#03045e}
    .home-program-card:hover{transform:translateY(-4px);box-shadow:0 18px 40px rgba(14,48,62,.22)}
    .home-program-icon{width:68px;height:68px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.14);box-shadow:inset 0 0 0 1px rgba(255,255,255,.16),0 7px 18px rgba(5,25,34,.13);color:inherit;align-self:start}
    .home-program-card:nth-child(3) .home-program-icon,.home-program-card:nth-child(4) .home-program-icon{background:rgba(255,255,255,.42);box-shadow:inset 0 0 0 1px rgba(3,4,94,.07),0 7px 18px rgba(3,4,94,.08)}
    .home-program-card h2{position:relative;z-index:1;margin:0;color:#f7fbfb;font-size:clamp(1.04rem,1.45vw,1.24rem);line-height:1.5;font-weight:700;height:4.5em;display:flex;align-items:center;justify-content:center}
    .home-program-card:nth-child(3) h2,.home-program-card:nth-child(4) h2{color:#03045e}
    .home-program-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:30px;padding-top:2px}
    .home-program-button{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-width:164px;height:46px;padding:0 20px;border-radius:14px;font-weight:700;border:1px solid #0077b6;box-shadow:0 5px 14px rgba(3,4,94,.1);transition:background .2s ease,color .2s ease,border-color .2s ease,transform .2s ease,box-shadow .2s ease}
    .home-program-button svg{flex:0 0 auto;transition:transform .2s ease}
    .home-program-button.primary{background:linear-gradient(145deg,#03045e 0%,#0077b6 100%);color:#fff;border-color:#03045e;box-shadow:0 8px 18px rgba(3,4,94,.2)}
    .home-program-button.secondary{background:linear-gradient(145deg,#90e0ef 0%,#caf0f8 100%);color:#03045e;border-color:#90e0ef;box-shadow:0 8px 18px rgba(0,119,182,.12)}
    .home-program-button:hover{transform:translateY(-1px);box-shadow:0 9px 20px rgba(3,4,94,.16)}
    .home-program-button.primary:hover{background:linear-gradient(145deg,#0077b6 0%,#00b4d8 100%);border-color:#0077b6;color:#fff}
    .home-program-button.secondary:hover{background:linear-gradient(145deg,#00b4d8 0%,#90e0ef 100%);border-color:#00b4d8;color:#03045e}
    .home-program-button:hover svg{transform:translateX(-2px)}
    .home-pedagogy-section{padding:clamp(24px,3.4vw,36px) clamp(22px,5vw,84px) clamp(28px,3.8vw,40px)!important;background:#f6f8f8!important;border-top:0}
    .home-pedagogy-section .pedagogy{max-width:980px;margin:0 auto;padding-top:0;border-top:0}
    .home-pedagogy-section .names{max-width:920px;margin:8px auto 0;row-gap:2px}
    .home-pedagogy-section .team{font-size:.86rem!important}

    .site-dark .quote-section{border-bottom-color:#29424c}
    .site-dark .home-program-section{background:linear-gradient(180deg,#102129 0%,#0d1c23 100%);border-bottom-color:#29424c}
    .site-dark .home-program-card{box-shadow:0 12px 30px rgba(0,0,0,.17)}
    .site-dark .home-program-card:nth-child(1){background:linear-gradient(145deg,#17343b 0%,#132b33 100%);border-color:#2c565d;color:#79c7c4}
    .site-dark .home-program-card:nth-child(2){background:linear-gradient(145deg,#192f3e 0%,#142833 100%);border-color:#304b5c;color:#84b7c7}
    .site-dark .home-program-card:nth-child(3){background:linear-gradient(145deg,#302d27 0%,#26251f 100%);border-color:#4b4639;color:#d0b27e}
    .site-dark .home-program-card:nth-child(4){background:linear-gradient(145deg,#2b2835 0%,#24222d 100%);border-color:#484153;color:#b9a0ca}
    .site-dark .home-program-card h2{color:#eef5f5}
    .site-dark .home-program-icon,.site-dark .home-program-card:nth-child(3) .home-program-icon,.site-dark .home-program-card:nth-child(4) .home-program-icon{background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1px rgba(255,255,255,.06),0 7px 18px rgba(0,0,0,.13)}
    .site-dark .home-program-card:hover{box-shadow:0 18px 38px rgba(0,0,0,.25)}
    .site-dark .home-program-button{box-shadow:none}
    .site-dark .home-program-button.primary{background:#247f82;border-color:#247f82;color:#fff}
    .site-dark .home-program-button.secondary{background:rgba(255,255,255,.035);color:#dce8ea;border-color:#58717b}
    .site-dark .home-pedagogy-section{background:#0a1920!important}

    @media(max-width:900px){.home-program-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:600px){
      .quote-section{padding-bottom:24px!important}
      .home-program-section{padding:30px 18px 34px}
      .home-program-grid{grid-template-columns:1fr 1fr;gap:10px}
      .home-program-card{min-height:168px;padding:18px 11px;border-radius:20px;grid-template-rows:58px 4.35em;gap:10px}
      .home-program-card::before{right:18px;left:18px}
      .home-program-signature{top:11px;right:12px;font-size:.64rem}
      .home-program-icon{width:58px;height:58px}
      .home-program-icon svg{width:28px;height:28px}
      .home-program-card h2{font-size:.95rem;line-height:1.45;height:4.35em}
      .home-program-actions{display:grid;grid-template-columns:1fr 1fr;width:100%;max-width:420px;margin:24px auto 0;gap:9px}
      .home-program-button{width:100%;min-width:0;height:48px;padding:0 12px;border-radius:12px;gap:7px}
      .home-pedagogy-section{padding:22px 20px 28px!important}
      .home-pedagogy-section .pedagogy-logo{width:84px!important;height:84px!important}
      .home-pedagogy-section .names{flex-direction:column;align-items:center;margin-top:7px;line-height:1.55!important;row-gap:2px}
      .home-pedagogy-section .names .person{display:block;width:100%}
      .home-pedagogy-section .names .separator{display:none}
    }
    @media(max-width:360px){.home-program-actions{grid-template-columns:1fr}}
  `}</style></>;
}
