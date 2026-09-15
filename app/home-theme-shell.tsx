"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY="ani-yisraeli-theme";
const LEGACY_STORAGE_KEY="ani-yisraeli-home-theme";

type SiteTheme="light"|"dark";

export function HomeThemeShell({children}:{children:React.ReactNode}){
  const [theme,setTheme]=useState<SiteTheme>("light");
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    const saved=(window.localStorage.getItem(STORAGE_KEY)??window.localStorage.getItem(LEGACY_STORAGE_KEY)) as SiteTheme|null;
    if(saved==="light"||saved==="dark"){
      setTheme(saved);
      window.localStorage.setItem(STORAGE_KEY,saved);
    }else if(window.matchMedia?.("(prefers-color-scheme: dark)").matches){
      setTheme("dark");
    }
    setReady(true);
  },[]);

  const toggleTheme=()=>{
    const next=theme==="dark"?"light":"dark";
    setTheme(next);
    window.localStorage.setItem(STORAGE_KEY,next);
  };

  const dark=theme==="dark";

  return <div className={`site-theme-shell ${dark?"site-dark":"site-light"}`} data-theme={theme}>
    {children}
    <button
      className="site-theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={dark?"מעבר למצב בהיר":"מעבר למצב כהה"}
      title={dark?"מצב בהיר":"מצב כהה"}
      style={{opacity:ready?1:0}}
    >
      {dark?<Sun size={20}/>:<Moon size={20}/>}<span>{dark?"בהיר":"כהה"}</span>
    </button>
    <style jsx global>{`
      .site-theme-shell{
        min-height:100vh;
        background:#fff;
        color:var(--text);
        transition:background-color .34s ease,color .34s ease;
      }
      .site-theme-shell .quote-section,
      .site-theme-shell .lessons-section,
      .site-theme-shell .about-section,
      .site-theme-shell .lesson-card,
      .site-theme-shell .card-content,
      .site-theme-shell .footer,
      .site-theme-shell .program-about-page,
      .site-theme-shell .program-about-card,
      .site-theme-shell .program-about-back a,
      .site-theme-shell .legacy-lesson-page,
      .site-theme-shell .legacy-lesson-page .action,
      .site-theme-shell .legacy-lesson-page .small-card,
      .site-theme-shell .legacy-lesson-page .pdf-card,
      .site-theme-shell .legacy-lesson-page .presentation,
      .site-theme-shell .legacy-lesson-page .question{
        transition:background-color .34s ease,border-color .34s ease,color .34s ease;
      }
      .site-theme-toggle{
        position:fixed;
        left:24px;
        bottom:24px;
        z-index:70;
        display:inline-flex;
        align-items:center;
        gap:8px;
        min-height:44px;
        padding:9px 13px;
        border:1px solid rgba(255,255,255,.3);
        border-radius:999px;
        background:rgba(12,40,53,.82);
        color:#fff;
        font-family:inherit;
        font-size:.83rem;
        font-weight:700;
        cursor:pointer;
        box-shadow:0 8px 26px rgba(2,20,28,.2);
        backdrop-filter:blur(10px);
        transition:opacity .2s ease,background-color .25s ease,transform .2s ease,border-color .25s ease;
      }
      .site-theme-toggle:hover{transform:translateY(-1px);background:rgba(21,73,94,.94)}
      .site-theme-toggle svg{flex:0 0 auto}

      /* Home */
      .site-dark{background:#102129;color:#dce8ea}
      .site-dark .quote-section{background:#142932}
      .site-dark .quote-section blockquote footer{color:#9fb2b8;border-color:#36505a}
      .site-dark .lessons-section{background:#102129}
      .site-dark .section-heading h2{color:#edf5f5}
      .site-dark .lesson-card{background:#172c35;border-color:#2d4650}
      .site-dark .card-content{background:#172c35}
      .site-dark .card-content h3{color:#f0f6f6}
      .site-dark .card-content p{color:#afc1c7}
      .site-dark .text-link{color:#82c8c4}
      .site-dark .lesson-card:hover .text-link{color:#a4ddd9}
      .site-dark .card-visual{background:#e8eeec}
      .site-dark .about-section{background:#0d1c23}
      .site-dark .focus-grid{border-color:#314852}
      .site-dark .focus-item{border-color:#ffffff20}
      .site-dark .pedagogy{border-color:#314852}
      .site-dark .pedagogy-title{color:#79c7c4!important}
      .site-dark .pedagogy .names,
      .site-dark .names .person{color:#e7f0f1}
      .site-dark .names .separator{color:#667d85}
      .site-dark .pedagogy .team{color:#9eb1b8}

      /* About */
      .site-dark .program-about-page{background:#102129;color:#dce8ea}
      .site-dark .program-about-intro h2{color:#edf5f5}
      .site-dark .program-about-kicker{color:#79c7c4}
      .site-dark .program-about-intro>p:last-child{color:#b8c9cd}
      .site-dark .program-about-card{background:#172c35;border-color:#2d4650}
      .site-dark .program-about-card h2{color:#f0f6f6}
      .site-dark .program-about-card p{color:#b4c5ca}
      .site-dark .program-about-number{color:#86a6ad}
      .site-dark .program-about-pedagogy{border-color:#314852}
      .site-dark .program-about-back a{background:#172c35;border-color:#35505a;color:#bfe0de}

      /* Lesson pages */
      .site-dark .legacy-lesson-page{background:#102129;color:#dce8ea;min-height:100vh}
      .site-dark .legacy-lesson-page .top{background:#0b1d25;color:#f2f7f7}
      .site-dark .legacy-lesson-page .shell{color:#dce8ea}
      .site-dark .legacy-lesson-page .crumbs{color:#92a8af}
      .site-dark .legacy-lesson-page .crumbs a,
      .site-dark .legacy-lesson-page .tag{color:#82c8c4}
      .site-dark .legacy-lesson-page h1,
      .site-dark .legacy-lesson-page h2,
      .site-dark .legacy-lesson-page .flow-title b,
      .site-dark .legacy-lesson-page summary{color:#eef5f5}
      .site-dark .legacy-lesson-page .hook,
      .site-dark .legacy-lesson-page .empty,
      .site-dark .legacy-lesson-page details p,
      .site-dark .legacy-lesson-page .presentation p,
      .site-dark .legacy-lesson-page #about p{color:#aebfc5!important}
      .site-dark .legacy-lesson-page .meta span{border-color:#36505a;color:#aebfc5;background:#142932}
      .site-dark .legacy-lesson-page .lesson-hero{border-color:#314852!important}
      .site-dark .legacy-lesson-page .cover{background:#e8eeec}
      .site-dark .legacy-lesson-page .actions{color:#dce8ea}
      .site-dark .legacy-lesson-page .action{background:#172c35;border-color:#314852;color:#dbe8ea}
      .site-dark .legacy-lesson-page .action:hover{border-color:#79c7c4;color:#9ed8d4}
      .site-dark .legacy-lesson-page section{border-color:#314852}
      .site-dark .legacy-lesson-page .small-card{background:#172c35;border-color:#314852}
      .site-dark .legacy-lesson-page .small-card p{color:#b8c8cd}
      .site-dark .legacy-lesson-page .prep-item{border-color:#314852;color:#c6d3d6}
      .site-dark .legacy-lesson-page .prep-item b{color:#edf5f5}
      .site-dark .legacy-lesson-page .flow,
      .site-dark .legacy-lesson-page .flow-item{border-color:#314852}
      .site-dark .legacy-lesson-page .flow-title span{color:#92a8af}
      .site-dark .legacy-lesson-page .flow-item p{color:#b8c8cd}
      .site-dark .legacy-lesson-page .pdf-card,
      .site-dark .legacy-lesson-page .presentation{background:#142932;border-color:#314852}
      .site-dark .legacy-lesson-page .question{background:#172c35;color:#dbe7e9}
      .site-dark .legacy-lesson-page details{border-color:#314852}
      .site-dark .legacy-lesson-page .nav-bottom{border-color:#314852}
      .site-dark .legacy-lesson-page .nav-bottom a{color:#dce8ea}
      .site-dark .legacy-lesson-page .nav-bottom .all{border-color:#35505a;background:#142932}
      .site-dark .legacy-lesson-page .footer{background:#09181f;color:#91a6ae}

      .site-dark .footer{background:#09181f;border-color:#263e48;color:#91a6ae}
      .site-dark .site-theme-toggle{
        background:rgba(239,246,245,.12);
        border-color:rgba(226,240,238,.24);
        color:#f0f7f6;
      }
      .site-dark .site-theme-toggle:hover{background:rgba(239,246,245,.2)}

      @media(max-width:700px){
        .site-theme-toggle{left:14px;bottom:16px;min-height:42px;padding:8px 11px}
        .site-theme-toggle span{display:none}
      }
      @media(prefers-reduced-motion:reduce){
        .site-theme-shell,
        .site-theme-shell .quote-section,
        .site-theme-shell .lessons-section,
        .site-theme-shell .about-section,
        .site-theme-shell .lesson-card,
        .site-theme-shell .card-content,
        .site-theme-shell .footer,
        .site-theme-shell .program-about-page,
        .site-theme-shell .program-about-card,
        .site-theme-shell .program-about-back a,
        .site-theme-shell .legacy-lesson-page,
        .site-theme-shell .legacy-lesson-page .action,
        .site-theme-shell .legacy-lesson-page .small-card,
        .site-theme-shell .legacy-lesson-page .pdf-card,
        .site-theme-shell .legacy-lesson-page .presentation,
        .site-theme-shell .legacy-lesson-page .question,
        .site-theme-toggle{transition:none}
      }
    `}</style>
  </div>;
}
