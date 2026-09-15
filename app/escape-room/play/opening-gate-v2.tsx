"use client";

import { ArrowLeft, Users } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

const STORAGE_PREFIX = "ani-yisraeli-time-tunnel-v2";
const AUDIO_PREF_KEY = "ani-yisraeli-audio-muted";
const OPENING_VERSION = "blue-v2";

type Team = { names: string; className: string };
type OpeningPhase = "team" | "image";

export default function OpeningGateV2() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [phase, setPhase] = useState<OpeningPhase>("team");
  const [roomId, setRoomId] = useState("");
  const [team, setTeam] = useState<Team>({ names: "", className: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = (params.get("room") || "").trim().toUpperCase();
    const classFromLink = (params.get("class") || "").trim();
    setRoomId(room);

    if (!room) {
      setReady(true);
      return;
    }

    let savedStage = 0;
    let savedTeam: Team | null = null;
    let seenVersion = "";
    try {
      const saved = window.localStorage.getItem(`${STORAGE_PREFIX}:${room}`);
      if (saved) {
        const parsed = JSON.parse(saved) as { stage?: number; team?: Team };
        savedStage = parsed.stage || 0;
        savedTeam = parsed.team || null;
      }
      seenVersion = window.localStorage.getItem(`ani-yisraeli-opening-version:${room}`) || "";
    } catch {}

    setTeam({
      names: savedTeam?.names || "",
      className: savedTeam?.className || classFromLink,
    });

    setVisible(savedStage < 2 || seenVersion !== OPENING_VERSION);
    setReady(true);

    const syncMute = (event: Event) => {
      const detail = (event as CustomEvent<{ muted?: boolean }>).detail;
      if (audioRef.current) audioRef.current.muted = Boolean(detail?.muted);
    };
    window.addEventListener("escape-audio-muted", syncMute);
    return () => {
      window.removeEventListener("escape-audio-muted", syncMute);
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
      audioRef.current?.pause();
    };
  }, []);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.12;
    try {
      audio.muted = window.localStorage.getItem(AUDIO_PREF_KEY) === "1";
    } catch {
      audio.muted = false;
    }
    try {
      await audio.play();
    } catch {}
  };

  const openCinematicScreen = (event: FormEvent) => {
    event.preventDefault();
    if (!team.names.trim() || !team.className.trim()) return;

    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      void document.documentElement.requestFullscreen().catch(() => undefined);
    }

    window.scrollTo({ top: 0, behavior: "auto" });
    void startMusic();
    setPhase("image");
  };

  const enterTunnel = () => {
    if (!roomId) return;
    const cleanTeam = { names: team.names.trim(), className: team.className.trim() };
    const startedAt = Date.now();

    try {
      window.localStorage.setItem(`${STORAGE_PREFIX}:${roomId}`, JSON.stringify({ stage: 2, team: cleanTeam, startedAt }));
      window.localStorage.setItem(`ani-yisraeli-opening-version:${roomId}`, OPENING_VERSION);
    } catch {}

    setLeaving(true);
    transitionTimerRef.current = window.setTimeout(() => window.location.reload(), 620);
  };

  if (!ready || !roomId || !visible) return null;

  return <>
    <audio ref={audioRef} src="/escape-room/time-tunnel-intro.mp3" preload="auto" aria-hidden="true" />
    <section className={`tunnel-opening-gate phase-${phase}${leaving ? " leaving" : ""}`} aria-label="פתיחת מנהרת הזמן" dir="rtl">
      {phase === "team" ? <div className="tunnel-preflight">
        <div className="preflight-glow" aria-hidden="true" />
        <div className="preflight-content">
          <p className="preflight-kicker">אני ישראלי • מנהרת הזמן</p>
          <h1>מוכנים?</h1>
          <h2>מי יוצא לדרך?</h2>
          <form className="preflight-form" onSubmit={openCinematicScreen}>
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
      </div> : <>
        <div className="tunnel-opening-image loaded" style={{ backgroundImage: "url('/escape-room/tunnel-opening.webp')" }} aria-hidden="true" />
        <div className="tunnel-opening-shade" aria-hidden="true" />
        <div className="tunnel-opening-copy">
          <p>עבר • הווה • עתיד</p>
          <strong>המסע מתחיל כאן</strong>
          <button type="button" onClick={enterTunnel}>כניסה למנהרת הזמן <ArrowLeft size={20}/></button>
        </div>
      </>}
    </section>
  </>;
}
