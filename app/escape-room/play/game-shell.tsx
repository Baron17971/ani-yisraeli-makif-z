"use client";

import { ArrowLeft, CheckCircle2, Lightbulb, Sparkles, Users, Volume2, VolumeX, X } from "lucide-react";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";

const STORAGE_PREFIX = "ani-yisraeli-time-tunnel-v2";
const AUDIO_PREF_KEY = "ani-yisraeli-audio-muted";
const FLOW_VERSION = "unified-v3";

type Team = { names: string; className: string };
type Phase = "intro" | "team" | "image" | "game";
type Draft = { phase?: Exclude<Phase, "game">; team?: Team };

const HINTS: Record<string, string[]> = {
  "הסוד של ישראל": [
    "התחילו ממקרא הצופן ועבדו לפי סדר הסמלים — לא צריך לנחש.",
    "אחרי שפענחתם את הדמות, חפשו אותה במרחב. הקוד נמצא אצלה.",
  ],
  "חידת זהות המדינה": [
    "חפשו בתמונה שלושה מספרים — אחד לכל מבט על זהות המדינה.",
    "סדרו את הספרות לפי הרצף: קיום ומקלט, מוסר וערכים, תקווה וחזון.",
  ],
  "בין ספרים, שירים ושפה": [
    "המספרים בתמונה קשורים לשירים. התחילו מן הרמזים שאתם מזהים בוודאות.",
    "עדיין תקועים? אפשר לפנות למורה. בתחנה הזו רמז מהמורה כרוך בחמש דקות המתנה.",
  ],
  "מנהרת הזמן": [
    "אל תחפשו קשר נושאי — חשבו כרונולוגית: מה קרה קודם ומה אחר כך?",
    "הכרזת העצמאות היא האירוע המוקדם ביותר מבין האירועים שבתמונה.",
  ],
  "בין אדמה לשמים": [
    "חפשו אדם ישראלי שסיפורו מחבר בין חיל האוויר, מדע וחלל.",
    "הרמז המרכזי הוא מסע שהתחיל בישראל והגיע אל מחוץ לכדור הארץ.",
  ],
  "עוצרים לרגע במרחב": [
    "חזרו לדמות של אילן רמון והקשיבו שוב לרמז שקיבלתם ממנה.",
    "אתם מחפשים מנהיג ישראלי מן העבר.",
  ],
  "צומת של החלטות": [
    "חזרו לסרטון וחפשו מנהיג שסיפורו נע בין מלחמה, הנהגה ושאיפה לשלום.",
    "שימו לב במיוחד לצמתים של ביטחון, אחריות והסכמי שלום.",
  ],
  "כתב עתיק, רעיון חדש": [
    "חפשו את החיבור בין עברית, ספר, ידע וירושלים.",
    "הר הצופים הוא רמז מרכזי לפתרון.",
  ],
  "החידה האחרונה": [
    "חפשו רק את האותיות המסומנות.",
    "אספו את האותיות לפי הסדר שבו מופיעות שלוש החידות.",
  ],
};

function currentPuzzleKey() {
  if (document.querySelector(".victory-screen")) return "victory";
  return document.querySelector<HTMLElement>(".game-heading h1")?.innerText.trim() || "";
}

function playTone(kind: "wrong" | "success" | "victory") {
  const AudioContextCtor = window.AudioContext;
  if (!AudioContextCtor) return;
  const ctx = new AudioContextCtor();
  const master = ctx.createGain();
  master.connect(ctx.destination);
  const now = ctx.currentTime;

  if (kind === "wrong") {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(165, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
    master.gain.setValueAtTime(0.055, now);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    osc.connect(master);
    osc.start(now);
    osc.stop(now + 0.23);
    window.setTimeout(() => void ctx.close(), 320);
    return;
  }

  const notes = kind === "victory" ? [392, 523, 659, 784, 1046] : [523, 659, 784];
  master.gain.value = kind === "victory" ? 0.055 : 0.045;
  notes.forEach((frequency, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = now + index * 0.09;
    osc.type = "sine";
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.85, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);
    osc.connect(gain);
    gain.connect(master);
    osc.start(start);
    osc.stop(start + 0.32);
  });
  window.setTimeout(() => void ctx.close(), kind === "victory" ? 1200 : 800);
}

export default function GameShell({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const attemptsRef = useRef<Record<string, number>>({});
  const seenRef = useRef(new WeakSet<Element>());
  const celebrationTimerRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [classFromLink, setClassFromLink] = useState("");
  const [phase, setPhase] = useState<Phase>("intro");
  const [team, setTeam] = useState<Team>({ names: "", className: "" });
  const [muted, setMuted] = useState(false);
  const [puzzleKey, setPuzzleKey] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [toast, setToast] = useState<"wrong" | "success" | null>(null);
  const [celebration, setCelebration] = useState<"success" | "victory" | null>(null);

  const markerKey = roomId ? `ani-yisraeli-flow-version:${roomId}` : "";
  const draftKey = roomId ? `ani-yisraeli-opening-draft:${roomId}` : "";

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
    let flowVersion = "";
    let draft: Draft | null = null;
    try {
      const saved = window.localStorage.getItem(`${STORAGE_PREFIX}:${room}`);
      if (saved) {
        const parsed = JSON.parse(saved) as { stage?: number; team?: Team };
        savedStage = parsed.stage || 0;
        savedTeam = parsed.team || null;
      }
      flowVersion = window.localStorage.getItem(`ani-yisraeli-flow-version:${room}`) || "";
      const rawDraft = window.sessionStorage.getItem(`ani-yisraeli-opening-draft:${room}`);
      if (rawDraft) draft = JSON.parse(rawDraft) as Draft;
      setMuted(window.localStorage.getItem(AUDIO_PREF_KEY) === "1");
    } catch {}

    if (savedStage >= 2 && flowVersion === FLOW_VERSION) {
      setTeam(savedTeam || { names: "", className });
      setPhase("game");
    } else {
      const restoredTeam = draft?.team || savedTeam || { names: "", className };
      setTeam({ names: restoredTeam.names || "", className: restoredTeam.className || className });
      setPhase(draft?.phase || "intro");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !roomId || phase === "game") return;
    try {
      window.sessionStorage.setItem(`ani-yisraeli-opening-draft:${roomId}`, JSON.stringify({ phase, team }));
    } catch {}
  }, [ready, roomId, phase, team]);

  useEffect(() => {
    if (!ready || phase !== "game" || !roomId) return;

    const reopenAfterReset = (event: MouseEvent) => {
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
        attemptsRef.current = {};
        seenRef.current = new WeakSet<Element>();
        setPuzzleKey("");
        setAttempts(0);
        setHintCount(0);
        setToast(null);
        setCelebration(null);
        setTeam({ names: "", className: classFromLink });
        setPhase("intro");
        window.scrollTo({ top: 0, behavior: "auto" });
      }, 30);
    };

    document.addEventListener("click", reopenAfterReset, false);
    return () => document.removeEventListener("click", reopenAfterReset, false);
  }, [ready, phase, roomId, classFromLink]);

  useEffect(() => {
    if (!ready || phase !== "game" || !roomId) return;

    const syncPuzzle = () => {
      const key = currentPuzzleKey();
      setPuzzleKey(previous => {
        if (previous !== key) {
          setAttempts(attemptsRef.current[key] || 0);
          setHintCount(0);
        }
        return key;
      });
    };

    const showCelebration = (kind: "success" | "victory") => {
      if (!muted) playTone(kind);
      setToast("success");
      setCelebration(kind);
      if (celebrationTimerRef.current) window.clearTimeout(celebrationTimerRef.current);
      celebrationTimerRef.current = window.setTimeout(() => {
        setToast(null);
        setCelebration(null);
      }, kind === "victory" ? 1700 : 900);
    };

    const markWrong = (element: Element) => {
      if (seenRef.current.has(element)) return;
      seenRef.current.add(element);
      const key = currentPuzzleKey();
      const next = (attemptsRef.current[key] || 0) + 1;
      attemptsRef.current[key] = next;
      setPuzzleKey(key);
      setAttempts(next);
      setToast("wrong");
      window.setTimeout(() => setToast(null), 1100);
      if (!muted) playTone("wrong");
      if (navigator.vibrate) navigator.vibrate(45);
      const box = document.querySelector<HTMLElement>(".answer-box");
      if (box) {
        box.classList.remove("shell-feedback-shake");
        void box.offsetWidth;
        box.classList.add("shell-feedback-shake");
        window.setTimeout(() => box.classList.remove("shell-feedback-shake"), 430);
      }
    };

    const markSuccess = (element: Element, kind: "success" | "victory") => {
      if (seenRef.current.has(element)) return;
      seenRef.current.add(element);
      showCelebration(kind);
    };

    const scan = (root: ParentNode) => {
      syncPuzzle();
      root.querySelectorAll?.(".feedback.wrong").forEach(markWrong);
      root.querySelectorAll?.(".unlocked").forEach(element => markSuccess(element, "success"));
      root.querySelectorAll?.(".victory-screen").forEach(element => markSuccess(element, "victory"));
    };

    scan(document);
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
        if (!(node instanceof Element)) return;
        if (node.matches(".feedback.wrong")) markWrong(node);
        if (node.matches(".unlocked")) markSuccess(node, "success");
        if (node.matches(".victory-screen")) markSuccess(node, "victory");
        scan(node);
      }));
      syncPuzzle();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (celebrationTimerRef.current) window.clearTimeout(celebrationTimerRef.current);
    };
  }, [ready, phase, roomId, muted]);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.12;
    audio.muted = muted;
    try { await audio.play(); } catch {}
  };

  const goToTeam = () => {
    setPhase("team");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const goToImage = (event: FormEvent) => {
    event.preventDefault();
    if (!team.names.trim() || !team.className.trim()) return;
    void startMusic();
    setPhase("image");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const enterGame = () => {
    if (!roomId) return;
    const cleanTeam = { names: team.names.trim(), className: team.className.trim() };
    if (!cleanTeam.names || !cleanTeam.className) return;
    try {
      window.localStorage.setItem(`${STORAGE_PREFIX}:${roomId}`, JSON.stringify({ stage: 2, team: cleanTeam, startedAt: Date.now() }));
      window.localStorage.setItem(`ani-yisraeli-flow-version:${roomId}`, FLOW_VERSION);
      window.sessionStorage.removeItem(`ani-yisraeli-opening-draft:${roomId}`);
    } catch {}
    audioRef.current?.pause();
    setPhase("game");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    try { window.localStorage.setItem(AUDIO_PREF_KEY, next ? "1" : "0"); } catch {}
    if (audioRef.current) audioRef.current.muted = next;
  };

  if (!ready) return <div className="shell-loading">טוענים את מנהרת הזמן...</div>;
  if (!roomId) return <>{children}</>;

  if (phase === "intro") return <>
    <section className="unified-opening-intro" dir="rtl">
      <div className="unified-opening-shade" />
      <div className="unified-opening-card">
        <p className="unified-opening-kicker">חדר בריחה במרחב המוזיאלי</p>
        <h1>מנהרת הזמן</h1>
        <h2>„אני ישראלי”</h2>
        {team.className && <span className="unified-class-chip">כיתה {team.className}</span>}
        <p className="unified-opening-lead">מסע בין רגעים שעיצבו זהות, בין החלטות גורליות, שברים, הצלה ועמידה איתנה.</p>
        <p>כאן אין רק תאריכים ושמות, אלא סיפורים, סמלים ובחירות אנושיות. במהלך הדרך תפגשו ציר זמן שנשבר ונבנה מחדש, רמזים חזותיים ומספריים, ודמויות שלא תמיד נראות — אך השפעתן עצומה.</p>
        <p className="unified-opening-quote">„הסיפור עוד נכתב — ואתם חלק בלתי נפרד ממנו.”</p>
        <button type="button" onClick={goToTeam}>יוצאים למסע <ArrowLeft size={19}/></button>
      </div>
    </section>
    <style jsx global>{shellStyles}</style>
  </>;

  if (phase === "team") return <>
    <audio ref={audioRef} src="/escape-room/time-tunnel-intro.mp3" preload="auto" aria-hidden="true" />
    <section className="tunnel-opening-gate phase-team" aria-label="פתיחת מנהרת הזמן" dir="rtl">
      <div className="tunnel-preflight">
        <div className="preflight-glow" aria-hidden="true" />
        <div className="preflight-content">
          <p className="preflight-kicker">אני ישראלי • מנהרת הזמן</p>
          <h1>מוכנים?</h1>
          <h2>מי יוצא לדרך?</h2>
          <form className="preflight-form" onSubmit={goToImage}>
            <label><span><Users size={17}/> שמות חברי הצוות</span><input value={team.names} onChange={event => setTeam(current => ({ ...current, names: event.target.value }))} placeholder="לדוגמה: נועה, אדם, מאיה" autoFocus required /></label>
            {team.className ? <div className="preflight-class"><span>הכיתה שלכם</span><strong>{team.className}</strong></div> : <label><span>כיתה</span><input value={team.className} onChange={event => setTeam(current => ({ ...current, className: event.target.value }))} placeholder="י׳1" required /></label>}
            <button type="submit" disabled={!team.names.trim() || !team.className.trim()}>אנחנו מוכנים — יוצאים לדרך <ArrowLeft size={20}/></button>
          </form>
        </div>
      </div>
    </section>
    <style jsx global>{shellStyles}</style>
  </>;

  if (phase === "image") return <>
    <audio ref={audioRef} src="/escape-room/time-tunnel-intro.mp3" preload="auto" aria-hidden="true" />
    <section className="tunnel-opening-gate phase-image" aria-label="המסע מתחיל כאן" dir="rtl">
      <div className="tunnel-opening-image loaded" style={{ backgroundImage: "url('/escape-room/tunnel-opening.webp')" }} aria-hidden="true" />
      <div className="tunnel-opening-shade" aria-hidden="true" />
      <div className="tunnel-opening-copy">
        <p>עבר • הווה • עתיד</p>
        <strong>המסע מתחיל כאן</strong>
        <button type="button" onClick={enterGame}>כניסה למנהרת הזמן <ArrowLeft size={20}/></button>
      </div>
    </section>
    <style jsx global>{shellStyles}</style>
  </>;

  const hints = HINTS[puzzleKey] || [];
  const canHint = attempts >= 2 && hintCount < hints.length && (hintCount === 0 || attempts >= 3);

  return <>
    {children}
    <div className="shell-feedback-controls" dir="rtl">
      <button type="button" onClick={toggleMute} aria-label={muted ? "הפעלת צלילים" : "השתקת צלילים"}>{muted ? <VolumeX size={17}/> : <Volume2 size={17}/>}<span>{muted ? "צלילים כבויים" : "צלילים"}</span></button>
      {canHint && <button className="shell-hint-trigger" type="button" onClick={() => setHintCount(value => value + 1)}><Lightbulb size={17}/><span>{hintCount ? "רמז נוסף" : "צריכים רמז?"}</span></button>}
    </div>

    {hintCount > 0 && hints.length > 0 && <aside className="shell-hint-card" dir="rtl" aria-live="polite">
      <div><Lightbulb size={19}/><strong>{hintCount > 1 ? `רמז ${hintCount}` : "רמז קטן"}</strong><button type="button" onClick={() => setHintCount(0)} aria-label="סגירת הרמז"><X size={18}/></button></div>
      {hints.slice(0, hintCount).map((hint, index) => <p key={index}>{hint}</p>)}
    </aside>}

    {toast && <div className={`shell-feedback-toast ${toast}`} dir="rtl" aria-live="polite">{toast === "wrong" ? "עוד לא — בדקו שוב את הרמזים" : "נכון! התחנה נפתחה"}</div>}

    {celebration && <div className={`shell-celebration ${celebration}`} aria-hidden="true"><span>{celebration === "victory" ? <Sparkles size={44}/> : <CheckCircle2 size={42}/>}</span></div>}
    <style jsx global>{shellStyles}</style>
  </>;
}

const shellStyles = `
  .shell-loading{min-height:100svh;display:grid;place-items:center;background:#071821;color:#fff;font-family:"Varela Round",Arial,sans-serif}
  .unified-opening-intro{position:fixed;inset:0;z-index:260;display:grid;place-items:center;overflow:auto;padding:28px 18px;background:#071a3a;color:#fff;font-family:"Varela Round",Arial,sans-serif;box-sizing:border-box}
  .unified-opening-shade{position:absolute;inset:0;background:radial-gradient(circle at 78% 12%,rgba(58,150,255,.18),transparent 32%),linear-gradient(180deg,#0a2b62 0%,#071a3a 100%)}
  .unified-opening-card{position:relative;z-index:1;width:min(760px,100%);box-sizing:border-box;padding:42px clamp(24px,5vw,54px);border:1px solid rgba(255,255,255,.12);border-radius:26px;background:rgba(5,24,57,.72);box-shadow:0 28px 90px rgba(0,0,0,.3);text-align:right}
  .unified-opening-kicker{margin:0 0 10px;color:#8fd3ff;font-size:.86rem;font-weight:900;letter-spacing:.04em}.unified-opening-card h1{margin:0;font-size:clamp(3.5rem,10vw,6.6rem);line-height:.92;letter-spacing:-.055em}.unified-opening-card h2{margin:10px 0 0;color:#dbeafe;font-size:clamp(1.5rem,4vw,2.2rem)}
  .unified-class-chip{display:inline-flex;margin-top:18px;padding:7px 12px;border:1px solid rgba(255,255,255,.16);border-radius:999px;color:#f6d98f;background:rgba(255,255,255,.05);font-weight:800}.unified-opening-lead{margin-top:28px!important;color:#fff!important;font-size:1.08rem!important}.unified-opening-card>p:not(.unified-opening-kicker):not(.unified-opening-quote){color:#d4e2ed;line-height:1.85}.unified-opening-quote{margin:24px 0;color:#f6d98f;font-size:1.08rem;font-weight:800;line-height:1.7}
  .unified-opening-card>button{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:54px;padding:0 22px;border:0;border-radius:14px;background:#f5d990;color:#0b2453;font:900 1rem/1 "Varela Round",Arial,sans-serif;cursor:pointer}
  .shell-feedback-controls{position:fixed;left:12px;top:128px;z-index:145;display:flex;flex-direction:column;gap:8px;align-items:flex-start}.shell-feedback-controls>button{min-height:40px;padding:0 12px;display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(147,197,253,.28);border-radius:999px;background:rgba(6,24,58,.94);color:#dbeafe;box-shadow:0 9px 26px rgba(0,0,0,.28);backdrop-filter:blur(10px);font:800 .78rem/1 "Varela Round",Arial,sans-serif;cursor:pointer}.shell-feedback-controls .shell-hint-trigger{color:#f6d98f;border-color:rgba(246,217,143,.38)}
  .shell-hint-card{position:fixed;left:12px;top:220px;z-index:150;width:min(390px,calc(100vw - 24px));box-sizing:border-box;padding:16px 17px;border:1px solid rgba(125,211,252,.3);border-radius:16px;background:rgba(8,36,83,.98);color:#eaf4ff;box-shadow:0 22px 60px rgba(0,0,0,.48);font-family:"Varela Round",Arial,sans-serif}.shell-hint-card>div{display:flex;align-items:center;gap:8px;color:#f6d98f;margin-bottom:8px}.shell-hint-card>div>button{margin-right:auto;border:0;background:transparent;color:#b9d2e8;cursor:pointer}.shell-hint-card p{margin:7px 0;line-height:1.65;font-size:.92rem}
  .shell-feedback-toast{position:fixed;left:50%;bottom:26px;z-index:155;transform:translateX(-50%);width:max-content;max-width:calc(100vw - 28px);padding:12px 18px;border-radius:999px;background:#102f3d;color:#fff;box-shadow:0 14px 38px rgba(0,0,0,.38);font:800 .9rem/1.3 "Varela Round",Arial,sans-serif}.shell-feedback-toast.wrong{border:1px solid rgba(255,180,173,.45);color:#ffd2cc}.shell-feedback-toast.success{border:1px solid rgba(115,217,184,.42);color:#b9f3df}
  .shell-feedback-shake{animation:shell-shake .36s ease}.shell-celebration{position:fixed;inset:0;z-index:140;pointer-events:none;display:grid;place-items:center;background:radial-gradient(circle at 50% 50%,rgba(96,165,250,.2),transparent 32%);animation:shell-fade .9s ease both}.shell-celebration span{width:96px;height:96px;display:grid;place-items:center;border-radius:50%;border:1px solid rgba(125,211,252,.5);background:rgba(8,36,83,.95);color:#bfe8ff;box-shadow:0 0 52px rgba(96,165,250,.35);animation:shell-pop .72s ease both}.shell-celebration.victory{background:radial-gradient(circle at 50% 48%,rgba(246,217,143,.24),transparent 36%);animation-duration:1.7s}.shell-celebration.victory span{color:#f6d98f;border-color:rgba(246,217,143,.5)}
  @keyframes shell-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(5px)}50%{transform:translateX(-5px)}75%{transform:translateX(3px)}}@keyframes shell-pop{from{opacity:0;transform:scale(.6)}60%{opacity:1;transform:scale(1.12)}to{opacity:1;transform:scale(1)}}@keyframes shell-fade{0%{opacity:0}18%,72%{opacity:1}100%{opacity:0}}
  @media(max-width:700px){.unified-opening-intro{place-items:end center;padding:0}.unified-opening-card{width:100%;border:0;border-radius:24px 24px 0 0;padding:34px 20px 30px;background:rgba(5,24,57,.93)}.unified-opening-card h1{font-size:4rem}.unified-opening-card h2{font-size:1.55rem}.shell-feedback-controls{left:10px;top:126px}.shell-hint-card{left:10px;top:218px;width:calc(100vw - 20px)}.shell-feedback-toast{bottom:18px}}
  @media(prefers-reduced-motion:reduce){.shell-feedback-shake,.shell-celebration,.shell-celebration span{animation:none!important}}
`;
