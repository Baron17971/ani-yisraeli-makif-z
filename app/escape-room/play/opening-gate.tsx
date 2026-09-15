"use client";

import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STORAGE_PREFIX = "ani-yisraeli-time-tunnel-v2";
const GATE_PREFIX = "ani-yisraeli-opening-seen";

export default function OpeningGate() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = (params.get("room") ?? "").trim().toUpperCase();
    setRoomId(room);

    if (!room) {
      setReady(true);
      return;
    }

    let shouldShow = true;
    try {
      const saved = window.localStorage.getItem(`${STORAGE_PREFIX}:${room}`);
      const seen = window.sessionStorage.getItem(`${GATE_PREFIX}:${room}`);
      if (saved) {
        const parsed = JSON.parse(saved) as { stage?: number };
        if ((parsed.stage ?? 0) >= 1) shouldShow = false;
      }
      if (seen === "1") shouldShow = false;
    } catch {}

    setVisible(shouldShow);
    setReady(true);

    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      audioRef.current?.pause();
    };
  }, []);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.14;
    audio.muted = false;
    setMuted(false);
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const enterTunnel = async () => {
    if (roomId) {
      try { window.sessionStorage.setItem(`${GATE_PREFIX}:${roomId}`, "1"); } catch {}
    }
    await startMusic();
    setLeaving(true);
    hideTimerRef.current = window.setTimeout(() => setVisible(false), 850);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await startMusic();
      return;
    }
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  if (!ready || !roomId) return null;

  return <>
    <audio
      ref={audioRef}
      src="/escape-room/time-tunnel-intro.mp3"
      preload="auto"
      onEnded={() => setPlaying(false)}
      aria-hidden="true"
    />

    {visible && <section className={`tunnel-opening-gate${leaving ? " leaving" : ""}`} aria-label="פתיחת מנהרת הזמן">
      <div className="tunnel-opening-image" aria-hidden="true" />
      <div className="tunnel-opening-shade" aria-hidden="true" />
      <div className="tunnel-opening-copy">
        <p>עבר • הווה • עתיד</p>
        <strong>המסע מתחיל כאן</strong>
        <button type="button" onClick={enterTunnel}>
          כניסה למנהרת הזמן <ArrowLeft size={20}/>
        </button>
        <span>הלחיצה תפעיל מוזיקת פתיחה בעוצמה נמוכה</span>
      </div>
    </section>}

    {playing && !visible && <button
      type="button"
      className="intro-music-control"
      onClick={toggleMusic}
      aria-label={muted ? "הפעלת מוזיקת הפתיחה" : "השתקת מוזיקת הפתיחה"}
      aria-pressed={!muted}
    >
      {muted ? <VolumeX size={16}/> : <Volume2 size={16}/>}
      <span>{muted ? "מוזיקה" : "השתקה"}</span>
    </button>}
  </>;
}
