"use client";

import { ArrowLeft, Users } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

const STORAGE_PREFIX = "ani-yisraeli-time-tunnel-v2";
const AUDIO_PREF_KEY = "ani-yisraeli-audio-muted";
const BUNDLE_URL = "/escape-room/escape-room-opening-assets.zip";

type Team = { names: string; className: string };
type OpeningPhase = "team" | "image";

async function extractZipEntry(buffer: ArrayBuffer, entryName: string, mime: string) {
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  const decoder = new TextDecoder();
  let eocd = -1;
  const minOffset = Math.max(0, bytes.length - 65557);
  for (let offset = bytes.length - 22; offset >= minOffset; offset--) {
    if (view.getUint32(offset, true) === 0x06054b50) { eocd = offset; break; }
  }
  if (eocd < 0) throw new Error("ZIP end record not found");
  const entryCount = view.getUint16(eocd + 10, true);
  let cursor = view.getUint32(eocd + 16, true);
  for (let index = 0; index < entryCount; index++) {
    if (view.getUint32(cursor, true) !== 0x02014b50) throw new Error("Invalid ZIP directory");
    const method = view.getUint16(cursor + 10, true);
    const compressedSize = view.getUint32(cursor + 20, true);
    const nameLength = view.getUint16(cursor + 28, true);
    const extraLength = view.getUint16(cursor + 30, true);
    const commentLength = view.getUint16(cursor + 32, true);
    const localOffset = view.getUint32(cursor + 42, true);
    const name = decoder.decode(bytes.subarray(cursor + 46, cursor + 46 + nameLength));
    if (name === entryName) {
      if (view.getUint32(localOffset, true) !== 0x04034b50) throw new Error("Invalid ZIP local header");
      const localNameLength = view.getUint16(localOffset + 26, true);
      const localExtraLength = view.getUint16(localOffset + 28, true);
      const dataStart = localOffset + 30 + localNameLength + localExtraLength;
      const compressed = bytes.slice(dataStart, dataStart + compressedSize);
      if (method === 0) return new Blob([compressed], { type: mime });
      if (method !== 8) throw new Error("Unsupported ZIP compression");
      const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
      const decompressed = await new Response(stream).arrayBuffer();
      return new Blob([decompressed], { type: mime });
    }
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  throw new Error(`ZIP entry not found: ${entryName}`);
}

export default function OpeningGate() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const objectUrlsRef = useRef<string[]>([]);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [phase, setPhase] = useState<OpeningPhase>("team");
  const [roomId, setRoomId] = useState("");
  const [team, setTeam] = useState<Team>({ names: "", className: "" });
  const [imageSrc, setImageSrc] = useState("");
  const [audioSrc, setAudioSrc] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = (params.get("room") ?? "").trim().toUpperCase();
    const classFromLink = (params.get("class") ?? "").trim();
    setRoomId(room);
    setTeam({ names: "", className: classFromLink });
    if (!room) { setReady(true); return; }

    let shouldShow = true;
    try {
      const saved = window.localStorage.getItem(`${STORAGE_PREFIX}:${room}`);
      if (saved) {
        const parsed = JSON.parse(saved) as { stage?: number; team?: Team };
        if ((parsed.stage ?? 0) >= 2) shouldShow = false;
        if ((parsed.stage ?? 0) < 2 && parsed.team) {
          setTeam({ names: parsed.team.names ?? "", className: parsed.team.className || classFromLink });
        }
      }
    } catch {}
    setVisible(shouldShow);
    setReady(true);

    const syncMute = (event: Event) => {
      const detail = (event as CustomEvent<{ muted?: boolean }>).detail;
      if (audioRef.current) audioRef.current.muted = Boolean(detail?.muted);
    };

    const showGate = () => {
      const freshParams = new URLSearchParams(window.location.search);
      const freshClass = (freshParams.get("class") ?? "").trim();
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
      setTeam({ names: "", className: freshClass });
      setPhase("team");
      setLeaving(false);
      setVisible(true);
    };

    window.addEventListener("escape-audio-muted", syncMute);
    window.addEventListener("time-tunnel-show-gate", showGate);

    if (shouldShow) {
      void (async () => {
        try {
          const response = await fetch(BUNDLE_URL, { cache: "force-cache" });
          if (!response.ok) throw new Error("Opening bundle unavailable");
          const zip = await response.arrayBuffer();
          const [imageBlob, audioBlob] = await Promise.all([
            extractZipEntry(zip, "tunnel-opening.webp", "image/webp"),
            extractZipEntry(zip, "time-tunnel-intro.mp3", "audio/mpeg"),
          ]);
          const imageUrl = URL.createObjectURL(imageBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          objectUrlsRef.current.push(imageUrl, audioUrl);
          setImageSrc(imageUrl);
          setAudioSrc(audioUrl);
        } catch {
          setImageSrc("");
          setAudioSrc("");
        }
      })();
    }

    return () => {
      window.removeEventListener("escape-audio-muted", syncMute);
      window.removeEventListener("time-tunnel-show-gate", showGate);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      audioRef.current?.pause();
      objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
      objectUrlsRef.current = [];
    };
  }, []);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;
    audio.volume = 0.12;
    try { audio.muted = window.localStorage.getItem(AUDIO_PREF_KEY) === "1"; } catch { audio.muted = false; }
    try { await audio.play(); } catch {}
  };

  const openCinematicScreen = (event: FormEvent) => {
    event.preventDefault();
    if (!team.names.trim() || !team.className.trim()) return;

    try {
      const root = document.documentElement;
      if (!document.fullscreenElement && root.requestFullscreen) {
        void root.requestFullscreen().catch(() => undefined);
      }
    } catch {}

    window.scrollTo({ top: 0, behavior: "auto" });
    void startMusic();
    setPhase("image");
  };

  const enterTunnel = () => {
    if (!roomId) return;
    const startedAt = Date.now();
    const cleanTeam = { names: team.names.trim(), className: team.className.trim() };
    try {
      window.localStorage.setItem(`${STORAGE_PREFIX}:${roomId}`, JSON.stringify({ stage: 2, team: cleanTeam, startedAt }));
    } catch {}

    window.dispatchEvent(new CustomEvent("time-tunnel-start", { detail: { team: cleanTeam, startedAt } }));
    setLeaving(true);
    hideTimerRef.current = window.setTimeout(() => setVisible(false), 760);
  };

  if (!ready || !roomId) return null;

  return <>
    <audio ref={audioRef} src={audioSrc || undefined} preload="auto" aria-hidden="true" />
    {visible && <section className={`tunnel-opening-gate phase-${phase}${leaving ? " leaving" : ""}`} aria-label="פתיחת מנהרת הזמן" dir="rtl">
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
        <div className={`tunnel-opening-image${imageSrc ? " loaded" : ""}`} style={imageSrc ? { backgroundImage: `url(${imageSrc})` } : undefined} aria-hidden="true" />
        <div className="tunnel-opening-shade" aria-hidden="true" />
        <div className="tunnel-opening-copy">
          <p>עבר • הווה • עתיד</p>
          <strong>המסע מתחיל כאן</strong>
          <button type="button" onClick={enterTunnel}>כניסה למנהרת הזמן <ArrowLeft size={20}/></button>
        </div>
      </>}
    </section>}
  </>;
}
