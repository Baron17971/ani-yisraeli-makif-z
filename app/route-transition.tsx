"use client";

import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";

export function RouteTransition({children}:{children:ReactNode}){
  const router=useRouter();
  const pathname=usePathname();
  const [leaving,setLeaving]=useState(false);
  const navigating=useRef(false);

  useEffect(()=>{
    setLeaving(false);
    navigating.current=false;
  },[pathname]);

  function handleClick(event:MouseEvent<HTMLDivElement>){
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey) return;
    const target=event.target as Element|null;
    const anchor=target?.closest("a[href]") as HTMLAnchorElement|null;
    if(!anchor||anchor.target==="_blank"||anchor.hasAttribute("download")) return;

    const href=anchor.getAttribute("href");
    if(!href||href.startsWith("#")||href.startsWith("mailto:")||href.startsWith("tel:")) return;

    const url=new URL(anchor.href,window.location.href);
    if(url.origin!==window.location.origin) return;

    const sameDocument=url.pathname===window.location.pathname&&url.search===window.location.search;
    if(sameDocument&&url.hash) return;
    if(sameDocument&&!url.hash) return;
    if(navigating.current) return;

    event.preventDefault();
    navigating.current=true;
    setLeaving(true);

    window.setTimeout(()=>{
      router.push(`${url.pathname}${url.search}${url.hash}`);
    },220);
  }

  return <div className={`route-transition${leaving?" route-transition-leaving":""}`} onClickCapture={handleClick}>
    {children}
    <style jsx global>{`
      .route-transition{animation:routeEnter .34s ease-in-out both;will-change:opacity;min-height:100vh}
      .route-transition.route-transition-leaving{animation:none;opacity:.58;transition:opacity .22s ease-in-out;pointer-events:none}
      @keyframes routeEnter{from{opacity:.58}to{opacity:1}}
      @media(prefers-reduced-motion:reduce){.route-transition{animation:none!important;transition:none!important;opacity:1!important}}
    `}</style>
  </div>;
}
