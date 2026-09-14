"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Menu, X } from "lucide-react";
import type { Lesson } from "./data";

export function Header() {
  const [open,setOpen]=useState(false);
  const links=[["ראשי","/#home"],["השיעורים","/#lessons"],["על התוכנית","/#about"]];
  return <header className="site-header">
    <Link className="corner-logo" href="/#home" aria-label="מקיף ז׳ אשדוד, עמוד הבית"><img src="/makif-z-logo.png" alt="מקיף ז׳ אשדוד"/></Link>
    <div className="nav-shell"><span className="header-logo-spacer" aria-hidden="true"/><nav className="desktop-nav" aria-label="ניווט ראשי">{links.map(([l,h])=><Link key={h} href={h}>{l}</Link>)}</nav><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?"סגירת תפריט":"פתיחת תפריט"}>{open?<X/>:<Menu/>}</button></div>
    {open&&<nav className="mobile-nav" aria-label="ניווט במובייל">{links.map(([l,h])=><Link key={h} href={h} onClick={()=>setOpen(false)}>{l}</Link>)}</nav>}
    <style jsx global>{`.site-header .corner-logo{width:112px!important;height:112px!important;top:3px!important}.site-header .header-logo-spacer{display:block;width:118px;flex:0 0 118px}@media(max-width:700px){.site-header .corner-logo{width:88px!important;height:88px!important;right:8px!important;top:2px!important}.site-header .header-logo-spacer{width:92px;flex-basis:92px}}`}</style>
  </header>
}

export function LessonCard({lesson,index}:{lesson:Lesson;index?:number}) {
  const lessonHref=`/lessons/${lesson.slug}.html`;
  return <article className="lesson-card" style={{"--accent":lesson.accentColor} as React.CSSProperties}>
    <Link href={lessonHref} className="lesson-card-link" aria-label={`למערך השיעור: ${lesson.title}`}>
      <div className="card-visual"><img src={lesson.coverImage} alt={`שקף הפתיחה של השיעור ${lesson.title}`}/><span className="lesson-number">{String((index??0)+1).padStart(2,"0")}</span></div>
      <div className="card-content"><span className="category">{lesson.category}</span><h3>{lesson.title}</h3><p>{lesson.description}</p><span className="text-link">למערך השיעור <ArrowLeft size={18}/></span></div>
    </Link>
  </article>
}

export function Footer() {return <footer id="contact" className="footer"><p>© תשפ״ז | „אני ישראלי” | מקיף ז׳ אשדוד</p></footer>}
