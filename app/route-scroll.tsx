"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RouteScroll(){
  const pathname=usePathname();

  useEffect(()=>{
    if(typeof window==="undefined") return;
    if(window.location.hash) return;
    window.scrollTo({top:0,left:0,behavior:"auto"});
  },[pathname]);

  return null;
}
