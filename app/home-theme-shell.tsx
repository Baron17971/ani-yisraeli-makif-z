"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY="ani-yisraeli-home-theme";

type HomeTheme="light"|"dark";

export function HomeThemeShell({children}:{children:React.ReactNode}){
  const [theme,setTheme]=useState<HomeTheme>("light");
  const [ready,setReady]=useState(false);

  useEffect(()=>{
    const saved=window.localStorage.getItem(STORAGE_KEY) as HomeTheme|null;
    if(saved==="light"||saved==="dark"){
      setTheme(saved);
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

  return <div className={`home-theme-shell ${dark?"home-dark":"home-light"}`} data-theme={theme}>
    {children}
    <button
      className="home-theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={dark?"מעבר למצב בהיר":"מעבר למצב כהה"}
      title={dark?"מצב בהיר":"מצב כהה"}
      style={{opacity:ready?1:0}}
    >
      {dark?<Sun size={20}/>:<Moon size={20}/>}<span>{dark?"בהיר":"כהה"}</span>
    </button>
    <style jsx global>{`
      .home-theme-shell{
        min-height:100vh;
        background:#fff;
        color:var(--text);
        transition:background-color .34s ease,color .34s ease;
      }
      .home-theme-shell .quote-section,
      .home-theme-shell .lessons-section,
      .home-theme-shell .about-section,
      .home-theme-shell .lesson-card,
      .home-theme-shell .card-content,
      .home-theme-shell .footer{
        transition:background-color .34s ease,border-color .34s ease,color .34s ease;
      }
      .home-theme-toggle{
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
      .home-theme-toggle:hover{transform:translateY(-1px);background:rgba(21,73,94,.94)}
      .home-theme-toggle svg{flex:0 0 auto}

      .home-theme-shell.home-dark{background:#102129;color:#dce8ea}
      .home-dark .quote-section{background:#142932}
      .home-dark .quote-section blockquote footer{color:#9fb2b8;border-color:#36505a}
      .home-dark .lessons-section{background:#102129}
      .home-dark .section-heading h2{color:#edf5f5}
      .home-dark .lesson-card{background:#172c35;border-color:#2d4650}
      .home-dark .card-content{background:#172c35}
      .home-dark .card-content h3{color:#f0f6f6}
      .home-dark .card-content p{color:#afc1c7}
      .home-dark .text-link{color:#82c8c4}
      .home-dark .lesson-card:hover .text-link{color:#a4ddd9}
      .home-dark .card-visual{background:#e8eeec}
      .home-dark .about-section{background:#0d1c23}
      .home-dark .focus-grid{border-color:#314852}
      .home-dark .focus-item{border-color:#ffffff20}
      .home-dark .pedagogy{border-color:#314852}
      .home-dark .pedagogy-title{color:#79c7c4!important}
      .home-dark .pedagogy .names,
      .home-dark .names .person{color:#e7f0f1}
      .home-dark .names .separator{color:#667d85}
      .home-dark .pedagogy .team{color:#9eb1b8}
      .home-dark .footer{background:#09181f;border-color:#263e48;color:#91a6ae}
      .home-dark .home-theme-toggle{
        background:rgba(239,246,245,.12);
        border-color:rgba(226,240,238,.24);
        color:#f0f7f6;
      }
      .home-dark .home-theme-toggle:hover{background:rgba(239,246,245,.2)}

      @media(max-width:700px){
        .home-theme-toggle{left:14px;bottom:16px;min-height:42px;padding:8px 11px}
        .home-theme-toggle span{display:none}
      }
      @media(prefers-reduced-motion:reduce){
        .home-theme-shell,
        .home-theme-shell .quote-section,
        .home-theme-shell .lessons-section,
        .home-theme-shell .about-section,
        .home-theme-shell .lesson-card,
        .home-theme-shell .card-content,
        .home-theme-shell .footer,
        .home-theme-toggle{transition:none}
      }
    `}</style>
  </div>;
}
