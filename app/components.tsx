"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Menu, X } from "lucide-react";
import type { Lesson } from "./data";

export function Header({showLogo=true}:{showLogo?:boolean}={}) {
  const [open,setOpen]=useState(false);
  const pathname=usePathname();
  const links=[["ראשי","/"],["על התוכנית","/about"],["השיעורים","/lessons"]];
  const isActive=(href:string)=>href==="/"?pathname==="/":pathname===href||pathname.startsWith(`${href}/`);
  return <header className={`site-header${showLogo?"":" no-logo"}`}>
    {showLogo&&<Link className="corner-logo" href="/" scroll={true} aria-label="מקיף ז׳ אשדוד, עמוד הבית"><img src="/makif-z-logo.png" alt="מקיף ז׳ אשדוד"/></Link>}
    <div className="nav-shell"><span className="header-logo-spacer" aria-hidden="true"/><nav className="desktop-nav" aria-label="ניווט ראשי">{links.map(([l,h])=>{const active=isActive(h);return <Link key={h} href={h} className={active?"nav-active":undefined} aria-current={active?"page":undefined}>{l}</Link>})}</nav><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?"סגירת תפריט":"פתיחת תפריט"}>{open?<X/>:<Menu/>}</button></div>
    {open&&<nav className="mobile-nav" aria-label="ניווט במובייל">{links.map(([l,h])=>{const active=isActive(h);return <Link key={h} href={h} className={active?"nav-active":undefined} aria-current={active?"page":undefined} onClick={()=>setOpen(false)}>{l}</Link>})}</nav>}
    <style jsx global>{`
      .site-header{border-bottom:0!important}
      .site-header .corner-logo{width:116px!important;height:116px!important;top:12px!important}
      .site-header .header-logo-spacer{display:block;width:122px;flex:0 0 122px}
      .site-header .desktop-nav,.site-header .menu-button,.site-header .mobile-nav{pointer-events:auto}
      .site-header .desktop-nav,.site-header .menu-button{position:relative;z-index:20}
      .site-header .mobile-nav{z-index:20}
      .site-header.no-logo .header-logo-spacer{visibility:hidden}
      .site-header .desktop-nav a.nav-active{color:#fff;border-bottom-color:#84ddd2;font-weight:700}
      .site-header .mobile-nav a.nav-active{position:relative;color:#9ee6dd;font-weight:700;padding-right:13px}
      .site-header .mobile-nav a.nav-active::before{content:"";position:absolute;right:0;top:50%;width:3px;height:18px;border-radius:99px;background:#84ddd2;transform:translateY(-50%)}
      @media(max-width:700px){.site-header .corner-logo{width:100px!important;height:100px!important;right:10px!important;top:10px!important}.site-header .header-logo-spacer{width:106px;flex-basis:106px}}
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

export function Footer() {return <footer id="contact" className="footer"><p>© תשפ״ז | „אני ישראלי” | מקיף ז׳ אשדוד</p></footer>}
