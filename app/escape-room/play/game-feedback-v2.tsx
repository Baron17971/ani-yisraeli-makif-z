"use client";

import { CheckCircle2, Lightbulb, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AUDIO_PREF_KEY = "ani-yisraeli-audio-muted";

const HINTS: Record<string, string[]> = {
  "הסוד של ישראל": [
    "התחילו ממקרא הצופן ועבדו לפי סדר הסמלים.",
    "אחרי שפענחתם את הדמות, חפשו אותה במרחב — הקוד נמצא אצלה.",
  ],
  "חידת זהות המדינה": [
    "חפשו בתמונה שלושה מספרים — אחד לכל מבט על זהות המדינה.",
    "סדרו את הספרות לפי הרצף: קיום ומקלט, מוסר וערכים, תקווה וחזון.",
  ],
  "בין ספרים, שירים ושפה": [
    "חפשו קודם את הרמזים שאתם מזהים בוודאות.",
    "עדיין תקועים? אפשר לפנות למורה. בתחנה הזו רמז מהמורה כרוך בחמש דקות המתנה.",
  ],
  "מנהרת הזמן": [
    "חשבו כרונולוגית: מה קרה קודם ומה אחר כך?",
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

function puzzleTitle() {
  if (document.querySelector(".victory-screen")) return "victory";
  return document.querySelector<HTMLElement>(".game-heading h1")?.innerText.trim() || "";
}

function tone(kind: "wrong" | "success" | "victory") {
  const AudioContextCtor = window.AudioContext;
  if (!AudioContextCtor) return;
  const ctx = new AudioContextCtor();
  const master = ctx.createGain();
  master.connect(ctx.destination);
  const now = ctx.currentTime;

  if (kind === "wrong") {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(170, now);
    osc.frequency.exponentialRampToValueAtTime(105, now + 0.18);
    master.gain.setValueAtTime(0.05, now);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
    osc.connect(master);
    osc.start(now);
    osc.stop(now + 0.21);
    window.setTimeout(() => void ctx.close(), 300);
    return;
  }

  const notes = kind === "victory" ? [392, 523, 659, 784] : [523, 659, 784];
  master.gain.value = 0.045;
  notes.forEach((frequency, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = now + index * 0.09;
    osc.frequency.value = frequency;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.8, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);
    osc.connect(gain);
    gain.connect(master);
    osc.start(start);
    osc.stop(start + 0.32);
  });
  window.setTimeout(() => void ctx.close(), 900);
}

export default function GameFeedbackV2() {
  const attemptsRef = useRef<Record<string, number>>({});
  const seenRef = useRef(new WeakSet<Element>());
  const [available, setAvailable] = useState(false);
  const [muted, setMuted] = useState(false);
  const [title, setTitle] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [celebration, setCelebration] = useState<"success" | "victory" | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAvailable(Boolean(params.get("room")));
    try {
      setMuted(window.localStorage.getItem(AUDIO_PREF_KEY) === "1");
    } catch {}
  }, []);

  useEffect(() => {
    if (!available) return;

    const syncTitle = () => {
      const nextTitle = puzzleTitle();
      setTitle(previous => {
        if (previous !== nextTitle) {
          setAttempts(attemptsRef.current[nextTitle] || 0);
          setHintCount(0);
        }
        return nextTitle;
      });
    };

    const flash = (kind: "success" | "victory") => {
      if (!muted) tone(kind);
      setCelebration(kind);
      window.setTimeout(() => setCelebration(null), kind === "victory" ? 1600 : 850);
    };

    const markWrong = (element: Element) => {
      if (seenRef.current.has(element)) return;
      seenRef.current.add(element);
      const key = puzzleTitle();
      const next = (attemptsRef.current[key] || 0) + 1;
      attemptsRef.current[key] = next;
      setTitle(key);
      setAttempts(next);
      if (!muted) tone("wrong");
      if (navigator.vibrate) navigator.vibrate(45);
      const box = document.querySelector<HTMLElement>(".answer-box");
      if (box) {
        box.classList.remove("feedback-v2-shake");
        void box.offsetWidth;
        box.classList.add("feedback-v2-shake");
        window.setTimeout(() => box.classList.remove("feedback-v2-shake"), 450);
      }
    };

    const markSuccess = (element: Element, kind: "success" | "victory") => {
      if (seenRef.current.has(element)) return;
      seenRef.current.add(element);
      flash(kind);
    };

    const scan = (root: Document | Element) => {
      syncTitle();
      root.querySelectorAll(".feedback.wrong").forEach(markWrong);
      root.querySelectorAll(".unlocked").forEach(element => markSuccess(element, "success"));
      root.querySelectorAll(".victory-screen").forEach(element => markSuccess(element, "victory"));
    };

    scan(document);
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node instanceof Element) scan(node);
        });
      });
      syncTitle();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [available, muted]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    try {
      window.localStorage.setItem(AUDIO_PREF_KEY, next ? "1" : "0");
    } catch {}
    window.dispatchEvent(new CustomEvent("escape-audio-muted", { detail: { muted: next } }));
  };

  if (!available) return null;
  const hints = HINTS[title] || [];
  const canShowHint = attempts >= 2 && hintCount < hints.length && (hintCount === 0 || attempts >= 3);

  return <>
    <button className="feedback-v2-sound" type="button" onClick={toggleMute} aria-label={muted ? "הפעלת צלילים" : "השתקת צלילים"}>
      {muted ? <VolumeX size={16}/> : <Volume2 size={16}/>}<span>{muted ? "צלילים כבויים" : "צלילים"}</span>
    </button>

    {canShowHint && <button className="feedback-v2-hint" type="button" onClick={() => setHintCount(value => value + 1)}>
      <Lightbulb size={17}/>{hintCount ? "רמז נוסף" : "צריכים רמז?"}
    </button>}

    {hintCount > 0 && hints.length > 0 && <aside className="feedback-v2-card" aria-live="polite">
      <div><Lightbulb size={18}/><strong>{hintCount > 1 ? `רמז ${hintCount}` : "רמז קטן"}</strong></div>
      {hints.slice(0, hintCount).map((hint, index) => <p key={index}>{hint}</p>)}
      <button type="button" onClick={() => setHintCount(0)}>סגור</button>
    </aside>}

    {celebration && <div className={`feedback-v2-celebration ${celebration}`} aria-hidden="true">
      <span>{celebration === "victory" ? <Sparkles size={42}/> : <CheckCircle2 size={40}/>}</span>
    </div>}

    <style jsx global>{`
      .feedback-v2-sound,.feedback-v2-hint{position:fixed;left:12px;z-index:92;display:inline-flex;align-items:center;gap:7px;min-height:40px;padding:0 12px;border:1px solid rgba(147,197,253,.25);border-radius:999px;background:rgba(6,24,58,.9);color:#dbeafe;box-shadow:0 10px 28px rgba(0,0,0,.35);backdrop-filter:blur(10px);font:800 .76rem/1 "Varela Round",Arial,sans-serif;cursor:pointer}
      .feedback-v2-sound{bottom:calc(12px + env(safe-area-inset-bottom))}.feedback-v2-hint{bottom:calc(62px + env(safe-area-inset-bottom));color:#f6d98f;border-color:rgba(246,217,143,.35)}
      .feedback-v2-card{position:fixed;left:12px;bottom:calc(112px + env(safe-area-inset-bottom));z-index:94;width:min(390px,calc(100vw - 24px));box-sizing:border-box;padding:16px 17px;border:1px solid rgba(125,211,252,.3);border-radius:16px;background:rgba(8,36,83,.97);color:#eaf4ff;box-shadow:0 22px 60px rgba(0,0,0,.5);font-family:"Varela Round",Arial,sans-serif}.feedback-v2-card>div{display:flex;align-items:center;gap:8px;color:#f6d98f;margin-bottom:8px}.feedback-v2-card p{margin:7px 0;line-height:1.65;font-size:.9rem}.feedback-v2-card>button{margin-top:8px;padding:7px 10px;border:0;border-radius:9px;background:rgba(255,255,255,.08);color:#dbeafe;font:inherit;cursor:pointer}
      .feedback-v2-shake{animation:feedback-v2-shake .36s ease}.feedback-v2-celebration{position:fixed;inset:0;z-index:89;pointer-events:none;display:grid;place-items:center;background:radial-gradient(circle at 50% 50%,rgba(96,165,250,.22),transparent 30%);animation:feedback-v2-fade .9s ease both}.feedback-v2-celebration span{width:92px;height:92px;display:grid;place-items:center;border-radius:50%;border:1px solid rgba(125,211,252,.5);background:rgba(8,36,83,.94);color:#bfe8ff;box-shadow:0 0 50px rgba(96,165,250,.35);animation:feedback-v2-pop .7s ease both}.feedback-v2-celebration.victory{background:radial-gradient(circle at 50% 48%,rgba(246,217,143,.25),transparent 35%);animation-duration:1.6s}.feedback-v2-celebration.victory span{color:#f6d98f;border-color:rgba(246,217,143,.5)}
      @keyframes feedback-v2-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(5px)}50%{transform:translateX(-5px)}75%{transform:translateX(3px)}}
      @keyframes feedback-v2-pop{from{opacity:0;transform:scale(.6)}60%{opacity:1;transform:scale(1.12)}to{opacity:1;transform:scale(1)}}
      @keyframes feedback-v2-fade{0%{opacity:0}18%,72%{opacity:1}100%{opacity:0}}
      @media(max-width:700px){.feedback-v2-sound,.feedback-v2-hint{left:10px}.feedback-v2-card{left:10px;width:calc(100vw - 20px)}}
      @media(prefers-reduced-motion:reduce){.feedback-v2-shake,.feedback-v2-celebration,.feedback-v2-celebration span{animation:none!important}}
    `}</style>
  </>;
}
