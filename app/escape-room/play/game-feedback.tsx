"use client";

import { CheckCircle2, Lightbulb, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AUDIO_PREF_KEY = "ani-yisraeli-audio-muted";

type HintSet = { hints: string[]; teacherFallback?: string };

const HINTS: Record<string, HintSet> = {
  "הסוד של ישראל": {
    hints: [
      "התחילו ממקרא הצופן ועבדו לפי סדר הסמלים — לא צריך לנחש.",
      "אחרי שפענחתם את הדמות, חפשו אותה במרחב. הקוד נמצא אצלה.",
    ],
  },
  "חידת זהות המדינה": {
    hints: [
      "חפשו בתמונה שלושה מספרים — אחד לכל מבט על זהות המדינה.",
      "סדרו את הספרות לפי הרצף: קיום ומקלט, מוסר וערכים, תקווה וחזון.",
    ],
  },
  "בין ספרים, שירים ושפה": {
    hints: [
      "המספרים בתמונה קשורים לשירים. חפשו קודם את הרמזים שאתם מזהים בוודאות.",
      "אל תנסו לפתור הכול בבת אחת — שלושה מן הרמזים יספיקו כדי לבנות את הקוד.",
    ],
    teacherFallback: "עדיין תקועים? גשו למורה. בתחנה הזו רמז מהמורה כרוך בחמש דקות המתנה.",
  },
  "מנהרת הזמן": {
    hints: [
      "אל תחפשו קשר נושאי — חשבו רק כרונולוגית: מה קרה קודם ומה אחר כך?",
      "הכרזת העצמאות היא האירוע המוקדם ביותר מבין האירועים שבתמונה.",
    ],
  },
  "בין אדמה לשמים": {
    hints: [
      "חפשו אדם ישראלי שסיפורו מחבר בין חיל האוויר, מדע וחלל.",
      "הרמז המרכזי הוא המסע שהתחיל בישראל והגיע אל מחוץ לכדור הארץ.",
    ],
  },
  "עוצרים לרגע במרחב": {
    hints: [
      "חזרו לדמות של אילן רמון והקשיבו שוב לרמז שקיבלתם ממנה.",
      "אתם מחפשים מנהיג ישראלי מן העבר, לא איש מדע או תרבות.",
    ],
  },
  "צומת של החלטות": {
    hints: [
      "חזרו לסרטון וחפשו מנהיג שסיפורו נע בין מלחמה, הנהגה ושאיפה לשלום.",
      "שימו לב במיוחד לצמתים של ביטחון, אחריות והסכמי שלום.",
    ],
  },
  "כתב עתיק, רעיון חדש": {
    hints: [
      "חפשו את החיבור בין עברית, ספר, ידע וירושלים.",
      "הר הצופים הוא רמז מרכזי לפתרון.",
    ],
  },
  "החידה האחרונה": {
    hints: [
      "אל תפתרו מחדש את כל הטקסט — חפשו רק את האותיות המסומנות.",
      "אספו את האותיות לפי הסדר שבו מופיעות שלוש החידות.",
    ],
  },
};

function currentPuzzleKey() {
  if (document.querySelector(".victory-screen")) return "victory";
  return document.querySelector<HTMLElement>(".game-heading h1")?.innerText.trim() ?? "";
}

function audioContext() {
  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  return AudioContextClass ? new AudioContextClass() : null;
}

function playSound(kind: "wrong" | "success" | "victory") {
  const context = audioContext();
  if (!context) return;
  const master = context.createGain();
  master.connect(context.destination);
  const now = context.currentTime;

  if (kind === "wrong") {
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.075, now + 0.015);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    const oscillator = context.createOscillator();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(155, now);
    oscillator.frequency.exponentialRampToValueAtTime(92, now + 0.2);
    oscillator.connect(master);
    oscillator.start(now);
    oscillator.stop(now + 0.23);
    window.setTimeout(() => void context.close(), 350);
    return;
  }

  const notes = kind === "victory" ? [392, 523.25, 659.25, 783.99, 1046.5] : [523.25, 659.25, 783.99];
  master.gain.value = kind === "victory" ? 0.055 : 0.045;
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = now + index * (kind === "victory" ? 0.11 : 0.085);
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.9, start + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.34);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(start);
    oscillator.stop(start + 0.36);
  });
  window.setTimeout(() => void context.close(), kind === "victory" ? 1200 : 800);
}

export default function GameFeedback() {
  const attemptsRef = useRef<Record<string, number>>({});
  const seenRef = useRef<WeakSet<Element>>(new WeakSet());
  const celebrationTimer = useRef<number | null>(null);
  const [available, setAvailable] = useState(false);
  const [muted, setMuted] = useState(false);
  const [puzzleKey, setPuzzleKey] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [revealedHints, setRevealedHints] = useState(0);
  const [celebration, setCelebration] = useState<"success" | "victory" | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setAvailable(Boolean(params.get("room")));
    try { setMuted(window.localStorage.getItem(AUDIO_PREF_KEY) === "1"); } catch {}
  }, []);

  useEffect(() => {
    if (!available) return;

    const syncPuzzle = () => {
      const key = currentPuzzleKey();
      setPuzzleKey(previous => {
        if (previous !== key) {
          setAttempts(attemptsRef.current[key] ?? 0);
          setRevealedHints(0);
        }
        return key;
      });
    };

    const celebrate = (kind: "success" | "victory") => {
      if (!muted) playSound(kind);
      setCelebration(kind);
      if (celebrationTimer.current) window.clearTimeout(celebrationTimer.current);
      celebrationTimer.current = window.setTimeout(() => setCelebration(null), kind === "victory" ? 1800 : 900);
    };

    const mark = (element: Element, kind: "wrong" | "success" | "victory") => {
      if (seenRef.current.has(element)) return;
      seenRef.current.add(element);
      const key = currentPuzzleKey();

      if (kind === "wrong") {
        const next = (attemptsRef.current[key] ?? 0) + 1;
        attemptsRef.current[key] = next;
        setPuzzleKey(key);
        setAttempts(next);
        if (!muted) playSound("wrong");
        if ("vibrate" in navigator) navigator.vibrate?.(45);
        const box = document.querySelector<HTMLElement>(".answer-box");
        if (box) {
          box.classList.remove("feedback-shake");
          void box.offsetWidth;
          box.classList.add("feedback-shake");
          window.setTimeout(() => box.classList.remove("feedback-shake"), 480);
        }
      } else {
        celebrate(kind);
      }
    };

    const scan = (root: ParentNode) => {
      syncPuzzle();
      root.querySelectorAll?.(".feedback.wrong").forEach(element => mark(element, "wrong"));
      root.querySelectorAll?.(".unlocked").forEach(element => mark(element, "success"));
      root.querySelectorAll?.(".victory-screen").forEach(element => mark(element, "victory"));
    };

    scan(document);
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
        if (node instanceof Element) {
          if (node.matches(".feedback.wrong")) mark(node, "wrong");
          if (node.matches(".unlocked")) mark(node, "success");
          if (node.matches(".victory-screen")) mark(node, "victory");
          scan(node);
        }
      }));
      syncPuzzle();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      if (celebrationTimer.current) window.clearTimeout(celebrationTimer.current);
    };
  }, [available, muted]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    try { window.localStorage.setItem(AUDIO_PREF_KEY, next ? "1" : "0"); } catch {}
    window.dispatchEvent(new CustomEvent("escape-audio-muted", { detail: { muted: next } }));
  };

  const hintSet = HINTS[puzzleKey];
  const canReveal = Boolean(hintSet && attempts >= 2 && revealedHints < hintSet.hints.length && (revealedHints === 0 || attempts >= 3));

  if (!available) return null;

  return <>
    <button className="game-sound-toggle" type="button" onClick={toggleMute} aria-pressed={muted} aria-label={muted ? "הפעלת צלילי המשחק" : "השתקת צלילי המשחק"}>
      {muted ? <VolumeX size={16}/> : <Volume2 size={16}/>}
      <span>{muted ? "צלילים מושתקים" : "צלילים"}</span>
    </button>

    {canReveal && <button className="hint-trigger" type="button" onClick={() => setRevealedHints(value => value + 1)}>
      <Lightbulb size={17}/>{revealedHints ? "רמז נוסף" : "צריכים רמז?"}
    </button>}

    {hintSet && revealedHints > 0 && <aside className="hint-card" aria-live="polite">
      <div className="hint-card-title"><Lightbulb size={18}/><strong>{revealedHints > 1 ? `רמז ${revealedHints}` : "רמז קטן"}</strong></div>
      {hintSet.hints.slice(0, revealedHints).map((hint, index) => <p key={index}>{hint}</p>)}
      {revealedHints >= hintSet.hints.length && hintSet.teacherFallback && <p className="teacher-fallback">{hintSet.teacherFallback}</p>}
      <button type="button" onClick={() => setRevealedHints(0)}>סגור</button>
    </aside>}

    {celebration && <div className={`feedback-celebration ${celebration}`} aria-hidden="true">
      <div className="celebration-core">{celebration === "victory" ? <Sparkles size={42}/> : <CheckCircle2 size={40}/>}</div>
      {celebration === "victory" && <div className="confetti">{Array.from({ length: 16 }, (_, index) => <i key={index}/>)}</div>}
    </div>}
  </>;
}
