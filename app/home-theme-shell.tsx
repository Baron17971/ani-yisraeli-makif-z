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
  </div>;
}
