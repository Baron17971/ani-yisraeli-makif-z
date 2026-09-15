"use client";

import { CheckCircle2, Lightbulb, Sparkles, Trophy, Volume2, VolumeX, XCircle } from "lucide-react";
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
      "אל תחפשו קשר נושאי — חשבו כרונולוגית: מה קרה קודם ומה אחר כך?",
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

  const notes = kind === "victory" ? [392, 523, 659, 784, 1046] : [523, 659, 784];
  master.gain.value = kind === "victory" ? 0.055 : 0.045;
  notes.forEach((frequency, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = now + index * (kind === "victory" ? 0.11 : 0.09);
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
  window.setTimeout(() => void ctx.close(), kind === "victory" ? 1200 : 900);
}

const WRONG_MESSAGES = [
  "עוד לא — בדקו שוב את הרמזים ונסו פעם נוספת.",
  "כמעט. משהו עדיין לא מתחבר — עכשיו ייפתח לכם רמז אם תרצו.",
  "לא מוותרים. קחו רמז נוסף ונסו לחשוב מזווית אחרת.",
];

export default function GameFeedbackV2() {
  const attemptsRef = useRef<Record<string, number>>({});
  const handledVictoryRef = useRef(false);
  const toastTimerRef = useRef<number | null>(null);
  const celebrationTimerRef = useRef<number | null>(null);
  const [available, setAvailable] = useState(false);
  const [muted, setMuted] = useState(false);
  const [title, setTitle] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [toast, setToast] = useState<{ kind: "wrong" | "success"; text: string } | null>(null);
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
      if (!nextTitle || nextTitle === "victory") return;
      setTitle(previous => {
        if (previous !== nextTitle) {
          setAttempts(attemptsRef.current[nextTitle] || 0);
          setHintCount(0);
        }
        return nextTitle;
      });
    };

    const showToast = (kind: "wrong" | "success", text: string, duration = 1800) => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      setToast({ kind, text });
      toastTimerRef.current = window.setTimeout(() => setToast(null), duration);
    };

    const flash = (kind: "success" | "victory") => {
      if (!muted) tone(kind);
      if (celebrationTimerRef.current) window.clearTimeout(celebrationTimerRef.current);
      setCelebration(kind);
      celebrationTimerRef.current = window.setTimeout(() => setCelebration(null), kind === "victory" ? 1800 : 1250);
    };

    const handleWrong = () => {
      const key = puzzleTitle();
      if (!key || key === "victory") return;
      const next = (attemptsRef.current[key] || 0) + 1;
      attemptsRef.current[key] = next;
      setTitle(key);
      setAttempts(next);
      setHintCount(current => Math.min(current, HINTS[key]?.hints.length || 0));
      showToast("wrong", WRONG_MESSAGES[Math.min(next - 1, WRONG_MESSAGES.length - 1)], 2200);
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

    const handleSuccess = () => {
      showToast("success", "נכון! התחנה נפתחה — אפשר להמשיך במסע.", 1700);
      flash("success");
    };

    const inspectAnswerResult = () => {
      if (document.querySelector(".answer-box .feedback.wrong")) {
        handleWrong();
        return;
      }
      if (document.querySelector(".answer-box .unlocked")) {
        handleSuccess();
      }
    };

    const onSubmit = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLFormElement) || !target.classList.contains("answer-box")) return;
      window.setTimeout(inspectAnswerResult, 80);
    };

    const victoryObserver = new MutationObserver(() => {
      syncTitle();
      if (document.querySelector(".victory-screen") && !handledVictoryRef.current) {
        handledVictoryRef.current = true;
        showToast("success", "כל הכבוד! פתחתם את מנהרת הזמן.", 2200);
        flash("victory");
      }
    });

    syncTitle();
    document.addEventListener("submit", onSubmit, true);
    victoryObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("submit", onSubmit, true);
      victoryObserver.disconnect();
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
      if (celebrationTimerRef.current) window.clearTimeout(celebrationTimerRef.current);
    };
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

  const hintSet = HINTS[title];
  const canShowHint = Boolean(hintSet && attempts >= 2 && hintCount < hintSet.hints.length && (hintCount === 0 || attempts >= 3));

  return <>
    <button className="feedback-v2-sound" type="button" onClick={toggleMute} aria-pressed={muted} aria-label={muted ? "הפעלת צלילים" : "השתקת צלילים"}>
      {muted ? <VolumeX size={16}/> : <Volume2 size={16}/>}<span>{muted ? "צלילים כבויים" : "צלילים"}</span>
    </button>

    {canShowHint && <button className="feedback-v2-hint" type="button" onClick={() => setHintCount(value => value + 1)}>
      <Lightbulb size={17}/>{hintCount ? "רמז נוסף" : "צריכים רמז?"}
    </button>}

    {hintSet && hintCount > 0 && <aside className="feedback-v2-card" aria-live="polite">
      <div><Lightbulb size={18}/><strong>{hintCount > 1 ? `רמז ${hintCount}` : "רמז קטן"}</strong></div>
      {hintSet.hints.slice(0, hintCount).map((hint, index) => <p key={index}>{hint}</p>)}
      {hintCount >= hintSet.hints.length && hintSet.teacherFallback && <p className="feedback-v2-teacher">{hintSet.teacherFallback}</p>}
      <button type="button" onClick={() => setHintCount(0)}>סגור</button>
    </aside>}

    {toast && <div className={`feedback-v2-toast ${toast.kind}`} role="status" aria-live="polite">
      {toast.kind === "success" ? <CheckCircle2 size={22}/> : <XCircle size={22}/>}<span>{toast.text}</span>
    </div>}

    {celebration && <div className={`feedback-v2-celebration ${celebration}`} aria-hidden="true">
      <span>{celebration === "victory" ? <Sparkles size={44}/> : <Trophy size={68} strokeWidth={1.8}/>}</span>
      {celebration === "victory" && <div className="feedback-v2-confetti">{Array.from({ length: 16 }, (_, index) => <i key={index}/>)}</div>}
    </div>}

    <style jsx global>{`
      .feedback-v2-sound,.feedback-v2-hint{position:fixed;left:12px;z-index:92;display:inline-flex;align-items:center;gap:7px;min-height:40px;padding:0 12px;border:1px solid rgba(147,197,253,.25);border-radius:999px;background:rgba(6,24,58,.92);color:#dbeafe;box-shadow:0 10px 28px rgba(0,0,0,.35);backdrop-filter:blur(10px);font:800 .76rem/1 "Varela Round",Arial,sans-serif;cursor:pointer}
      .feedback-v2-sound{bottom:calc(12px + env(safe-area-inset-bottom))}.feedback-v2-hint{bottom:calc(62px + env(safe-area-inset-bottom));color:#f6d98f;border-color:rgba(246,217,143,.42);animation:feedback-v2-hint-pulse 1.5s ease-in-out infinite}
      .feedback-v2-card{position:fixed;left:12px;bottom:calc(112px + env(safe-area-inset-bottom));z-index:96;width:min(390px,calc(100vw - 24px));box-sizing:border-box;padding:16px 17px;border:1px solid rgba(125,211,252,.3);border-radius:16px;background:rgba(8,36,83,.98);color:#eaf4ff;box-shadow:0 22px 60px rgba(0,0,0,.5);font-family:"Varela Round",Arial,sans-serif}.feedback-v2-card>div{display:flex;align-items:center;gap:8px;color:#f6d98f;margin-bottom:8px}.feedback-v2-card p{margin:7px 0;line-height:1.65;font-size:.9rem}.feedback-v2-card .feedback-v2-teacher{padding-top:9px;margin-top:11px;border-top:1px solid rgba(246,217,143,.22);color:#f6d98f;font-weight:800}.feedback-v2-card>button{margin-top:8px;padding:7px 10px;border:0;border-radius:9px;background:rgba(255,255,255,.08);color:#dbeafe;font:inherit;cursor:pointer}
      .feedback-v2-toast{position:fixed;z-index:98;right:50%;top:calc(82px + env(safe-area-inset-top));transform:translateX(50%);width:min(520px,calc(100vw - 28px));box-sizing:border-box;display:flex;align-items:center;gap:10px;padding:13px 16px;border-radius:14px;color:#fff;box-shadow:0 18px 42px rgba(0,0,0,.38);backdrop-filter:blur(12px);font:800 .9rem/1.5 "Varela Round",Arial,sans-serif;animation:feedback-v2-toast-in .24s ease both}.feedback-v2-toast.wrong{background:rgba(89,25,36,.96);border:1px solid rgba(255,180,173,.35);color:#ffd9d5}.feedback-v2-toast.success{background:rgba(10,77,68,.96);border:1px solid rgba(132,238,205,.34);color:#d7fff2}
      .feedback-v2-shake{animation:feedback-v2-shake .36s ease}.feedback-v2-celebration{position:fixed;inset:0;z-index:95;pointer-events:none;display:grid;place-items:center;background:radial-gradient(circle at 50% 50%,rgba(246,217,143,.3),rgba(96,165,250,.12) 22%,transparent 42%);animation:feedback-v2-fade 1.25s ease both}.feedback-v2-celebration>span{width:132px;height:132px;display:grid;place-items:center;border-radius:50%;border:1px solid rgba(246,217,143,.68);background:radial-gradient(circle at 35% 28%,rgba(255,250,220,.2),rgba(8,36,83,.97) 62%);color:#f6d98f;box-shadow:0 0 24px rgba(246,217,143,.28),0 0 72px rgba(246,217,143,.38);animation:feedback-v2-trophy-pop .82s cubic-bezier(.16,.84,.28,1.25) both}.feedback-v2-celebration.victory{background:radial-gradient(circle at 50% 48%,rgba(246,217,143,.28),transparent 36%);animation-duration:1.8s}.feedback-v2-celebration.victory>span{width:96px;height:96px;color:#f6d98f;border-color:rgba(246,217,143,.55)}
      .feedback-v2-confetti{position:absolute;inset:0;overflow:hidden}.feedback-v2-confetti i{position:absolute;top:-8%;left:50%;width:8px;height:18px;border-radius:3px;background:#f6d98f;opacity:.9;animation:feedback-v2-confetti 1.6s ease-out both}.feedback-v2-confetti i:nth-child(2n){background:#7dd3fc}.feedback-v2-confetti i:nth-child(3n){background:#fff}.feedback-v2-confetti i:nth-child(1){left:10%;animation-delay:.02s}.feedback-v2-confetti i:nth-child(2){left:18%;animation-delay:.14s}.feedback-v2-confetti i:nth-child(3){left:26%;animation-delay:.06s}.feedback-v2-confetti i:nth-child(4){left:34%;animation-delay:.2s}.feedback-v2-confetti i:nth-child(5){left:42%;animation-delay:.1s}.feedback-v2-confetti i:nth-child(6){left:50%;animation-delay:.18s}.feedback-v2-confetti i:nth-child(7){left:58%;animation-delay:.04s}.feedback-v2-confetti i:nth-child(8){left:66%;animation-delay:.16s}.feedback-v2-confetti i:nth-child(9){left:74%;animation-delay:.08s}.feedback-v2-confetti i:nth-child(10){left:82%;animation-delay:.22s}.feedback-v2-confetti i:nth-child(11){left:90%;animation-delay:.12s}.feedback-v2-confetti i:nth-child(n+12){left:50%;animation-delay:.24s}
      @keyframes feedback-v2-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(5px)}50%{transform:translateX(-5px)}75%{transform:translateX(3px)}}
      @keyframes feedback-v2-trophy-pop{0%{opacity:0;transform:scale(.35) rotate(-8deg)}58%{opacity:1;transform:scale(1.14) rotate(3deg)}78%{transform:scale(.96) rotate(-1deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
      @keyframes feedback-v2-pop{from{opacity:0;transform:scale(.6)}60%{opacity:1;transform:scale(1.12)}to{opacity:1;transform:scale(1)}}
      @keyframes feedback-v2-fade{0%{opacity:0}16%,76%{opacity:1}100%{opacity:0}}
      @keyframes feedback-v2-toast-in{from{opacity:0;transform:translate(50%,-8px)}to{opacity:1;transform:translate(50%,0)}}
      @keyframes feedback-v2-hint-pulse{0%,100%{box-shadow:0 10px 28px rgba(0,0,0,.35)}50%{box-shadow:0 10px 34px rgba(246,217,143,.24)}}
      @keyframes feedback-v2-confetti{0%{transform:translateY(-10vh) rotate(0deg)}100%{transform:translateY(110vh) rotate(560deg)}}
      @media(max-width:700px){.feedback-v2-sound,.feedback-v2-hint{left:10px}.feedback-v2-card{left:10px;width:calc(100vw - 20px)}.feedback-v2-toast{top:calc(72px + env(safe-area-inset-top));font-size:.84rem}.feedback-v2-celebration>span{width:118px;height:118px}}
      @media(prefers-reduced-motion:reduce){.feedback-v2-shake,.feedback-v2-celebration,.feedback-v2-celebration>span,.feedback-v2-toast,.feedback-v2-hint,.feedback-v2-confetti i{animation:none!important}}
    `}</style>
  </>;
}
