"use client";

import { ArrowLeft, Users } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import GameFeedbackV2 from "./game-feedback-v2";

const STORAGE_PREFIX = "ani-yisraeli-time-tunnel-v2";
const FLOW_VERSION = "unified-v4";

type Team = { names: string; className: string };
type OpeningPhase = "intro" | "team" | "image";
type Draft = { phase?: OpeningPhase; team?: Team };

export default function GameShell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [classFromLink, setClassFromLink] = useState("");
  const [phase, setPhase] = useState<OpeningPhase | "game">("intro");
  const [team, setTeam] = useState<Team>({ names: "", className: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = (params.get("room") || "").trim().toUpperCase();
    const className = (params.get("class") || "").trim();
    setRoomId(room);
    setClassFromLink(className);

    if (!room) {
      setPhase("game");
      setReady(true);
      return;
    }

    let savedStage = 0;
    let savedTeam: Team | null = null;
    let version = "";
    let draft: Draft | null = null;

    try {
      const saved = window.localStorage.getItem(`${STORAGE_PREFIX}:${room}`);
      if (saved) {
        const parsed = JSON.parse(saved) as { stage?: number; team?: Team };
        savedStage = parsed.stage || 0;
        savedTeam = parsed.team || null;
      }
      version = window.localStorage.getItem(`ani-yisraeli-flow-version:${room}`) || "";
      const rawDraft = window.sessionStorage.getItem(`ani-yisraeli-opening-draft:${room}`);
      if (rawDraft) draft = JSON.parse(rawDraft) as Draft;
    } catch {}

    if (savedStage >= 2 && version === FLOW_VERSION) {
      setTeam(savedTeam || { names: "", className });
      setPhase("game");
    } else {
      const restored = draft?.team || savedTeam || { names: "", className };
      setTeam({ names: restored.names || "", className: restored.className || className });
      setPhase(draft?.phase || "intro");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !roomId || phase === "game") return;
    try {
      window.sessionStorage.setItem(
        `ani-yisraeli-opening-draft:${roomId}`,
        JSON.stringify({ phase, team })
      );
    } catch {}
  }, [ready, roomId, phase, team]);

  useEffect(() => {
    if (!ready || phase !== "game" || !roomId) return;

    const handleReset = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest(".reset-button")) return;

      window.setTimeout(() => {
        let resetOccurred = false;
        try {
          const saved = window.localStorage.getItem(`${STORAGE_PREFIX}:${roomId}`);
          if (!saved) resetOccurred = true;
          else {
            const parsed = JSON.parse(saved) as { stage?: number };
            resetOccurred = (parsed.stage || 0) < 2;
          }
        } catch {
          resetOccurred = true;
        }

        if (!resetOccurred) return;
        try {
          window.localStorage.removeItem(`ani-yisraeli-flow-version:${roomId}`);
          window.sessionStorage.removeItem(`ani-yisraeli-opening-draft:${roomId}`);
        } catch {}
        setTeam({ names: "", className: classFromLink });
        setPhase("intro");
        window.scrollTo({ top: 0, behavior: "auto" });
      }, 50);
    };

    document.addEventListener("click", handleReset);
    return () => document.removeEventListener("click", handleReset);
  }, [ready, phase, roomId, classFromLink]);

  const goToTeam = () => {
    setPhase("team");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const goToImage = (event: FormEvent) => {
    event.preventDefault();
    if (!team.names.trim() || !team.className.trim()) return;
    setPhase("image");
    window.scrollTo({ top: 0, behavior: "auto" });

    try {
      const audio = new Audio("/escape-room/time-tunnel-intro.mp3");
      audio.volume = 0.12;
      audio.muted = window.localStorage.getItem("ani-yisraeli-audio-muted") === "1";
      void audio.play().catch(() => undefined);
    } catch {}
  };

  const enterGame = () => {
    if (!roomId) return;
    const cleanTeam = { names: team.names.trim(), className: team.className.trim() };
    if (!cleanTeam.names || !cleanTeam.className) return;

    try {
      window.localStorage.setItem(
        `${STORAGE_PREFIX}:${roomId}`,
        JSON.stringify({ stage: 2, team: cleanTeam, startedAt: Date.now() })
      );
      window.localStorage.setItem(`ani-yisraeli-flow-version:${roomId}`, FLOW_VERSION);
      window.sessionStorage.removeItem(`ani-yisraeli-opening-draft:${roomId}`);
    } catch {}

    setPhase("game");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  if (!ready) {
    return <div className="unified-loading">טוענים את מנהרת הזמן...</div>;
  }

  if (!roomId || phase === "game") {
    return <>{children}{roomId ? <GameFeedbackV2 /> : null}</>;
  }

  if (phase === "intro") {
    return <>
      <section className="unified-intro" dir="rtl">
        <div className="unified-intro-bg" />
        <div className="unified-intro-card">
          <p className="unified-kicker">חדר בריחה במרחב המוזיאלי</p>
          <h1>מנהרת הזמן</h1>
          <h2>„אני ישראלי”</h2>
          {team.className ? <span className="unified-class">כיתה {team.className}</span> : null}
          <p className="unified-lead">מסע בין רגעים שעיצבו זהות, בין החלטות גורליות, שברים, הצלה ועמידה איתנה.</p>
          <p>כאן אין רק תאריכים ושמות, אלא סיפורים, סמלים ובחירות אנושיות. במהלך הדרך תפגשו ציר זמן שנשבר ונבנה מחדש, רמזים חזותיים ומספריים, ודמויות שלא תמיד נראות — אך השפעתן עצומה.</p>
          <p className="unified-quote">„הסיפור עוד נכתב — ואתם חלק בלתי נפרד ממנו.”</p>
          <button type="button" onClick={goToTeam}>יוצאים למסע <ArrowLeft size={19}/></button>
        </div>
      </section>
      <style jsx global>{introStyles}</style>
    </>;
  }

  if (phase === "team") {
    return <section className="tunnel-opening-gate phase-team" aria-label="פתיחת מנהרת הזמן" dir="rtl">
      <div className="tunnel-preflight">
        <div className="preflight-glow" aria-hidden="true" />
        <div className="preflight-content">
          <p className="preflight-kicker">אני ישראלי • מנהרת הזמן</p>
          <h1>מוכנים?</h1>
          <h2>מי יוצא לדרך?</h2>
          <form className="preflight-form" onSubmit={goToImage}>
            <label>
              <span><Users size={17}/> שמות חברי הצוות</span>
              <input value={team.names} onChange={event => setTeam(current => ({ ...current, names: event.target.value }))} placeholder="לדוגמה: נועה, אדם, מאיה" autoFocus required />
            </label>
            {team.className ? <div className="preflight-class"><span>הכיתה שלכם</span><strong>{team.className}</strong></div> : <label>
              <span>כיתה</span>
              <input value={team.className} onChange={event => setTeam(current => ({ ...current, className: event.target.value }))} placeholder="י׳1" required />
            </label>}
            <button type="submit" disabled={!team.names.trim() || !team.className.trim()}>
              אנחנו מוכנים — יוצאים לדרך <ArrowLeft size={20}/>
            </button>
          </form>
        </div>
      </div>
    </section>;
  }

  return <section className="tunnel-opening-gate phase-image" aria-label="המסע מתחיל כאן" dir="rtl">
    <div className="tunnel-opening-image loaded" style={{ backgroundImage: "url('/escape-room/tunnel-opening.webp')" }} aria-hidden="true" />
    <div className="tunnel-opening-shade" aria-hidden="true" />
    <div className="tunnel-opening-copy">
      <p>עבר • הווה • עתיד</p>
      <strong>המסע מתחיל כאן</strong>
      <button type="button" onClick={enterGame}>כניסה למנהרת הזמן <ArrowLeft size={20}/></button>
    </div>
  </section>;
}

const introStyles = `
  .unified-loading{min-height:100svh;display:grid;place-items:center;background:#071821;color:#fff;font-family:"Varela Round",Arial,sans-serif}
  .unified-intro{position:fixed;inset:0;z-index:260;display:grid;place-items:center;overflow:auto;padding:28px 18px;box-sizing:border-box;background:#071a3a;color:#fff;font-family:"Varela Round",Arial,sans-serif}
  .unified-intro-bg{position:absolute;inset:0;background:radial-gradient(circle at 78% 12%,rgba(58,150,255,.18),transparent 32%),linear-gradient(180deg,#0a2b62 0%,#071a3a 100%)}
  .unified-intro-card{position:relative;z-index:1;width:min(760px,100%);box-sizing:border-box;padding:42px clamp(24px,5vw,54px);border:1px solid rgba(255,255,255,.12);border-radius:26px;background:rgba(5,24,57,.72);box-shadow:0 28px 90px rgba(0,0,0,.3);text-align:right}
  .unified-kicker{margin:0 0 10px;color:#8fd3ff;font-size:.86rem;font-weight:900;letter-spacing:.04em}.unified-intro-card h1{margin:0;font-size:clamp(3.5rem,10vw,6.6rem);line-height:.92;letter-spacing:-.055em}.unified-intro-card h2{margin:10px 0 0;color:#dbeafe;font-size:clamp(1.5rem,4vw,2.2rem)}
  .unified-class{display:inline-flex;margin-top:18px;padding:7px 12px;border:1px solid rgba(255,255,255,.16);border-radius:999px;color:#f6d98f;background:rgba(255,255,255,.05);font-weight:800}.unified-lead{margin-top:28px!important;color:#fff!important;font-size:1.08rem!important}.unified-intro-card>p:not(.unified-kicker):not(.unified-quote){color:#d4e2ed;line-height:1.85}.unified-quote{margin:24px 0;color:#f6d98f;font-size:1.08rem;font-weight:800;line-height:1.7}
  .unified-intro-card>button{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:54px;padding:0 22px;border:0;border-radius:14px;background:#f5d990;color:#0b2453;font:900 1rem/1 "Varela Round",Arial,sans-serif;cursor:pointer}
  @media(max-width:700px){.unified-intro{place-items:end center;padding:0}.unified-intro-card{width:100%;border:0;border-radius:24px 24px 0 0;padding:34px 20px 30px;background:rgba(5,24,57,.93)}.unified-intro-card h1{font-size:4rem}.unified-intro-card h2{font-size:1.55rem}}
`;
