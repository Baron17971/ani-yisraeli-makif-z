"use client";

import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STORAGE_PREFIX = "ani-yisraeli-time-tunnel-v2";
const GATE_PREFIX = "ani-yisraeli-opening-seen";
const BUNDLE_URL = "/escape-room/escape-room-opening-assets.zip";

async function extractZipEntry(buffer: ArrayBuffer, entryName: string, mime: string) {
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  const decoder = new TextDecoder();

  let eocd = -1;
  const minOffset = Math.max(0, bytes.length - 65557);
  for (let offset = bytes.length - 22; offset >= minOffset; offset--) {
    if (view.getUint32(offset, true) === 0x06054b50) {
      eocd = offset;
      break;
    }
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
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [audioSrc, setAudioSrc] = useState("");

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
    if (!audio || !audioSrc) return;
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
      src={audioSrc || undefined}
      preload="auto"
      onEnded={() => setPlaying(false)}
      aria-hidden="true"
    />

    {visible && <section className={`tunnel-opening-gate${leaving ? " leaving" : ""}`} aria-label="פתיחת מנהרת הזמן">
      <div
        className={`tunnel-opening-image${imageSrc ? " loaded" : ""}`}
        style={imageSrc ? { backgroundImage: `url(${imageSrc})` } : undefined}
        aria-hidden="true"
      />
      <div className="tunnel-opening-shade" aria-hidden="true" />
      <div className="tunnel-opening-copy">
        <p>עבר • הווה • עתיד</p>
        <strong>המסע מתחיל כאן</strong>
        <button type="button" onClick={enterTunnel}>
          כניסה למנהרת הזמן <ArrowLeft size={20}/>
        </button>
        <span>{audioSrc ? "הלחיצה תפעיל מוזיקת פתיחה בעוצמה נמוכה" : "המדיה נטענת — אפשר להיכנס למסע"}</span>
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
