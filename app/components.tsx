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
    <div className="nav-shell"><Link className="brand" href="/#home"><span aria-hidden="true">✡</span>אני ישראלי</Link><nav className="desktop-nav" aria-label="ניווט ראשי">{links.map(([l,h])=><Link key={h} href={h}>{l}</Link>)}</nav><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?"סגירת תפריט":"פתיחת תפריט"}>{open?<X/>:<Menu/>}</button></div>
    {open&&<nav className="mobile-nav" aria-label="ניווט במובייל">{links.map(([l,h])=><Link key={h} href={h} onClick={()=>setOpen(false)}>{l}</Link>)}</nav>}
  </header>
}

export function LessonCard({lesson,index}:{lesson:Lesson;index?:number}) {
  return <article className="lesson-card" style={{"--accent":lesson.accentColor} as React.CSSProperties}>
    <Link href={`/lessons/${lesson.slug}`} className="lesson-card-link" aria-label={`למערך השיעור: ${lesson.title}`}>
      <div className="card-visual"><img src={lesson.coverImage} alt={`שקף הפתיחה של השיעור ${lesson.title}`}/><span className="lesson-number">{String((index??0)+1).padStart(2,"0")}</span></div>
      <div className="card-content"><span className="category">{lesson.category}</span><h3>{lesson.title}</h3><p>{lesson.description}</p><span className="text-link">למערך השיעור <ArrowLeft size={18}/></span></div>
    </Link>
  </article>
}

export function Footer() {return <footer id="contact" className="footer"><p>© תשפ״ז | „אני ישראלי” | מקיף ז׳ אשדוד</p></footer>}
