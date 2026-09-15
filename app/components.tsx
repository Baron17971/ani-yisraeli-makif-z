"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Menu, X } from "lucide-react";
import type { Lesson } from "./data";

export function Header({showLogo=true}:{showLogo?:boolean}={}) {
  const [open,setOpen]=useState(false);
  const pathname=usePathname();
  const links=[["ראשי","/"],["על התוכנית","/about"],["המרחב","/museum-space"],["השיעורים","/lessons"]];
  const isActive=(href:string)=>href==="/"?pathname==="/":href==="/museum-space"?(pathname===href||pathname.startsWith(`${href}/`)||pathname.startsWith("/escape-room")):(pathname===href||pathname.startsWith(`${href}/`));
  return <header className={`site-header${showLogo?"":" no-logo"}`}>
    {showLogo&&<Link className="corner-logo" href="/" scroll={true} aria-label="מקיף ז׳ אשדוד, עמוד הבית"><img src="/makif-z-logo.png" alt="מקיף ז׳ אשדוד"/></Link>}
    <div className="nav-shell"><span className="header-logo-spacer" aria-hidden="true"/><nav className="desktop-nav" aria-label="ניווט ראשי">{links.map(([l,h])=>{const active=isActive(h);return <Link key={h} href={h} className={active?"nav-active":undefined} aria-current={active?"page":undefined}>{l}</Link>})}</nav><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?"סגירת תפריט":"פתיחת תפריט"}>{open?<X/>:<Menu/>}</button></div>
    {open&&<nav className="mobile-nav" aria-label="ניווט במובייל">{links.map(([l,h])=>{const active=isActive(h);return <Link key={h} href={h} className={active?"nav-active":undefined} aria-current={active?"page":undefined} onClick={()=>setOpen(false)}>{l}</Link>})}</nav>}
    <style jsx global>{`
      :root{--navy:#03045e;--deep:#0077b6;--teal:#00b4d8;--mist:#f4fbfd;--line:#cbe7f0;--text:#173b57;--muted:#668399}
      .site-dark{--navy:#caf0f8;--deep:#90e0ef;--teal:#48cae4;--mist:#081f33;--line:#214d67;--text:#e7f8fc;--muted:#a9c9d8}
      .site-header{border-bottom:0!important}
      .site-header .corner-logo{width:116px!important;height:116px!important;top:12px!important}
      .site-header .header-logo-spacer{display:block;width:122px;flex:0 0 122px}
      .site-header .desktop-nav,.site-header .menu-button,.site-header .mobile-nav{pointer-events:auto}
      .site-header .desktop-nav,.site-header .menu-button{position:relative;z-index:20}
      .site-header .mobile-nav{z-index:20;background:linear-gradient(135deg,#03045e 0%,#0077b6 58%,#00b4d8 100%)!important;color:#fff}
      .site-header.no-logo .header-logo-spacer{visibility:hidden}
      .site-header .desktop-nav a.nav-active{color:#fff;border-bottom-color:#90e0ef;font-weight:700}
      .site-header .mobile-nav a.nav-active{position:relative;color:#caf0f8;font-weight:700;padding-right:13px}
      .site-header .mobile-nav a.nav-active::before{content:"";position:absolute;right:0;top:50%;width:3px;height:18px;border-radius:99px;background:#90e0ef;transform:translateY(-50%)}
      .site-header .menu-button{color:#fff}
      .hero-shade{background:linear-gradient(90deg,rgba(3,4,94,.72) 0%,rgba(0,119,182,.46) 48%,rgba(0,180,216,.10) 80%),linear-gradient(0deg,rgba(3,4,94,.42),transparent 65%)!important}
      .program-about-shade{background:linear-gradient(90deg,rgba(3,4,94,.74) 0%,rgba(0,119,182,.40) 50%,rgba(0,180,216,.08) 100%),linear-gradient(0deg,rgba(3,4,94,.40),transparent 65%)!important}
      .museum-space-shade{background:linear-gradient(90deg,rgba(3,4,94,.84) 0%,rgba(0,119,182,.54) 50%,rgba(0,180,216,.16) 84%),linear-gradient(0deg,rgba(3,4,94,.46),transparent 64%)!important}
      .program-about-page,.museum-space-page{background:#f7fcfe!important}
      .lesson-page{background:linear-gradient(#e9f8fc 0,#fff 430px)!important}
      @media(max-width:700px){
        .site-header .corner-logo{width:100px!important;height:100px!important;right:10px!important;top:10px!important}
        .site-header .header-logo-spacer{width:106px;flex-basis:106px}
        .site-header .menu-button{display:grid;width:44px;height:44px;padding:0!important;place-items:center;border-radius:12px}
        .site-header .mobile-nav{padding:8px 18px 12px;gap:0;box-shadow:0 12px 26px rgba(3,4,94,.24)}
        .site-header .mobile-nav a{display:flex;align-items:center;min-height:46px;padding:0;border-bottom:1px solid rgba(255,255,255,.14)}
        .site-header .mobile-nav a:last-child{border-bottom:0}
        .site-header .mobile-nav a.nav-active{padding-right:16px}
      }
    `}</style>
  </header>
}

export function LessonCard({lesson,index}:{lesson:Lesson;index?:number}) {
  const lessonHref=`/lessons/${lesson.slug}`;
  return <article className="lesson-card" style={{"--accent":lesson.accentColor} as React.CSSProperties}>
    <Link href={lessonHref} className="lesson-card-link" aria-label={`למערך השיעור: ${lesson.title}`}>
      <div className="card-visual"><img src={lesson.coverImage} alt={`שקף הפתיחה של השיעור ${lesson.title}`}/><span className="lesson-number">{String((index??0)+1).padStart(2,"0")}</span></div>
      <div className="card-content"><span className="category">{lesson.category}</span><h3>{lesson.title}</h3><p>{lesson.hook}</p><span className="text-link">למערך השיעור <ArrowLeft size={18}/></span></div>
    </Link>
  </article>
}

export function Footer() {
  return <footer id="contact" className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <strong>„אני ישראלי”</strong>
        <span>תוכנית השכלה כללית | שכבה י׳ | מקיף ז׳ אשדוד</span>
      </div>
      <nav className="footer-nav" aria-label="ניווט תחתון">
        <Link href="/">ראשי</Link>
        <Link href="/about">על התוכנית</Link>
        <Link href="/museum-space">המרחב המוזיאלי</Link>
        <Link href="/lessons">ספריית השיעורים</Link>
      </nav>
      <p className="footer-credit">© תשפ״ז | פיתוח פדגוגי: צוות מעו״ף</p>
    </div>
    <style jsx global>{`
      .footer{padding:0!important;text-align:initial!important;background:#f8fcfe!important;border-top-color:#cbe7f0!important}
      .footer-inner{max-width:1180px;margin:0 auto;padding:30px clamp(22px,5vw,52px) 24px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:20px 42px;align-items:center}
      .footer-brand{display:flex;flex-direction:column;gap:2px;text-align:right}
      .footer-brand strong{color:var(--navy);font-size:1rem;font-weight:800}
      .footer-brand span{color:var(--muted);font-size:.82rem;line-height:1.55}
      .footer-nav{display:flex;align-items:center;gap:24px;font-size:.84rem;font-weight:700;color:var(--deep)}
      .footer-nav a{position:relative;padding:3px 0;transition:color .2s ease}
      .footer-nav a::after{content:"";position:absolute;right:0;bottom:0;width:0;height:1px;background:var(--teal);transition:width .2s ease}
      .footer-nav a:hover{color:var(--teal)}
      .footer-nav a:hover::after{width:100%}
      .footer-credit{grid-column:1/-1;margin:0!important;padding-top:14px;border-top:1px solid var(--line);color:var(--muted);font-size:.76rem;text-align:right}
      .site-dark .footer{background:#081f33!important;border-top-color:#214d67!important}
      .site-dark .footer-brand strong{color:#caf0f8}
      .site-dark .footer-brand span,.site-dark .footer-credit{color:#a9c9d8}
      .site-dark .footer-nav{color:#90e0ef}
      .site-dark .footer-credit{border-color:#214d67}
      .site-dark .footer-nav a::after{background:#48cae4}
      @media(max-width:700px){
        .footer-inner{grid-template-columns:1fr;padding:24px 20px 20px;gap:13px}
        .footer-brand{text-align:center}
        .footer-brand span{line-height:1.6}
        .footer-nav{justify-content:center;flex-wrap:wrap;gap:2px 18px}
        .footer-nav a{display:inline-flex;align-items:center;min-height:44px;padding:0 2px}
        .footer-credit{grid-column:auto;padding-top:12px;text-align:center}
      }
      @media(prefers-reduced-motion:reduce){.footer-nav a,.footer-nav a::after{transition:none}}
    `}</style>
  </footer>
}