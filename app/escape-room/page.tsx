"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, Expand, Flag, KeyRound, LockKeyhole, MapPin, RotateCcw, Sparkles, Users, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "ani-yisraeli-time-tunnel-v1";

type Team = { names: string; grade: string; className: string };
type SavedState = { stage: number; team: Team; startedAt: number | null };

type Challenge = {
  station: number;
  title: string;
  eyebrow: string;
  body: React.ReactNode;
  image?: string;
  imageAlt?: string;
  videoId?: string;
  prompt: string;
  answers: string[];
  inputMode?: "numeric" | "text";
  teacherNote?: string;
};

const challenges: Record<number, Challenge> = {
  2: {
    station: 1,
    title: "הסוד של ישראל",
    eyebrow: "תחנה 01",
    body: <>
      <p>הסוד של ישראל אינו טמון רק בהחלטות, גבולות או סמלים.</p>
      <p>הוא מתחיל ונשמר באנשים –<br/>באלה שנלחמו עליה,<br/>ובאלה שבנו אותה יום־יום, במעשה ובחזון.</p>
      <p>מאחורי הסמלים, מסתתר אדם אחד<br/>שסיפור חייו משקף סיפור גדול יותר.</p>
      <p>פתרו את הצופן וגלו את זהותו.</p>
      <p>חושבים שמצאתם?<br/>חפשו אותו במרחב —<br/>והוא ימסור לכם את הקוד<br/>שיוביל אתכם אל התחנה הבאה.</p>
    </>,
    image: "/escape-room/station-1-cipher.jpg",
    imageAlt: "הצופן של תחנה 1 ומקרא הסמלים",
    prompt: "הזינו את הקוד שקיבלתם",
    answers: ["643"],
    inputMode: "numeric",
  },
  3: {
    station: 2,
    title: "זהות שהופכת למעשה",
    eyebrow: "תחנה 02",
    body: <>
      <p>אם הגעתם הנה, אתם בדרך הנכונה!<br/>נמשיך במסענו...</p>
      <p>התמונה הבאה מציעה שלושה מבטים:<br/>המקום שבו אנו עומדים,<br/>הערכים שעל פיהם אנו שופטים,<br/>והחברה שבתוכה אנו חיים ופועלים.</p>
      <p>כדי להבין זהות – לא די ברעיונות. צריך אדם!<br/>אדם שנשא על גבו אחריות,<br/>שפעל בין חזון למציאות,<br/>והפך ערכים למעשים.</p>
    </>,
    image: "/escape-room/station-2-identity.jpg",
    imageAlt: "חידת זהות המדינה עם שלושה מבטים ודמויות",
    prompt: "פענחו את הרמזים והזינו את הקוד",
    answers: ["496"],
    inputMode: "numeric",
  },
  4: {
    station: 3,
    title: "בין ספרים, שירים ושפה",
    eyebrow: "תחנה 03",
    body: <>
      <p>החדר שבו אתם עומדים נראה שקט, כמעט יומיומי.<br/>שולחן כתיבה, ספרים, אור מנורה, חלון פתוח אל הלילה.<br/>אבל שום פרט כאן אינו מקרי.</p>
      <p>כל חפץ הוא רמז.<br/>כל מספר הוא שיר. אולי...<br/>המילים חבויות בין דפים, בין מדף למדף,<br/>ובין עולם ישן לעולם חדש שנכתב בשפה אחת.</p>
      <p>החידה שלפניכם עוסקת באדם<br/>שלא רק כתב שירה —<br/>אלא עיצב שפה, זהות ותרבות של עם מתחדש.</p>
      <p>התבוננו היטב בתמונה,<br/>מצאו בין הרמזים את שיריו,<br/>וגלו קוד בן שלוש ספרות.</p>
      <p>רוצים עזרה? חפשו את הדמות במרחב.</p>
      <p>רק כשתגלו את הקוד ייפתח השער אל התחנה הבאה.</p>
    </>,
    image: "/escape-room/station-3-literature.jpg",
    imageAlt: "חדר ספרות ושירה ובו שישה רמזים ממוספרים",
    prompt: "הזינו את הקוד בן שלוש הספרות",
    answers: ["126"],
    inputMode: "numeric",
    teacherNote: "מתקשים? רוצים רמז מהמורה? זה יעלה לכם בחמש דקות המתנה. גשו למורה.",
  },
  5: {
    station: 4,
    title: "מנהרת הזמן",
    eyebrow: "תחנה 04",
    body: <>
      <p>ההיסטוריה אינה אוסף של רגעים מנותקים.</p>
      <p className="escape-emphasis">היא שרשרת.</p>
      <p>כל אירוע נשען על קודמו,<br/>וכל צעד מוביל לצעד הבא<br/>גם כשבזמן אמת לא רואים את התמונה המלאה.</p>
      <p>לפניכם רצף של תחנות היסטוריות.<br/>התמונות, המספרים והסימנים אינם מסודרים במקרה.<br/>כדי להתקדם, עליכם להבין מה קדם למה,<br/>ואיך נבנה הסיפור של מדינה – שלב אחר שלב.</p>
      <p>סדרו את האירועים לפי ציר הזמן,<br/>פענחו את הקוד הסודי,<br/>ורק אז תיפתח הדרך אל התחנה הבאה.</p>
      <p>כי מי שמכיר את העבר<br/>מבין את ההווה.</p>
    </>,
    image: "/escape-room/station-4-timeline.jpg",
    imageAlt: "מנהרת הזמן – חידת סידור אירועים היסטוריים",
    prompt: "סדרו את האירועים והזינו את הקוד",
    answers: ["5713"],
    inputMode: "numeric",
  },
  6: {
    station: 5,
    title: "בין אדמה לשמים",
    eyebrow: "תחנה 05",
    body: <>
      <p>לפניכם חידה שעוסקת באדם אחד,<br/>שסיפור חייו חיבר בין עולמות שלכאורה רחוקים זה מזה:<br/>אדמה ושמים,<br/>צבא ומדע,<br/>זיכרון לאומי וחזון אנושי.</p>
      <p>הרמזים שבתמונה אינם מקריים.<br/>יש בהם מלחמה והגנה,<br/>יש בהם מדע וטכנולוגיה,<br/>ויש בהם מסע שהתחיל כאן<br/>והגיע למקום שבו מעטים בלבד היו.</p>
      <p>כדי לפתור את החידה תצטרכו לחבר בין אירועים, סמלים וערכים,<br/>ולזהות דמות שייצגה את מדינת ישראל<br/>לא רק על הקרקע – אלא גם הרבה מעבר לה.</p>
      <p>מי הוא האדם הזה?<br/>המשיכו לחפש, פענחו את הרמזים,<br/>והתשובה תוביל אתכם צעד נוסף במסע.</p>
    </>,
    image: "/escape-room/station-5-ilan-ramon.jpg",
    imageAlt: "חידה חזותית המחברת בין ישראל, צבא, מדע וחלל",
    prompt: "מי הוא האדם שמחבר בין כל הרמזים?",
    answers: ["אילן רמון", "רמון", "אילן"],
  },
  8: {
    station: 6,
    title: "צומת של החלטות",
    eyebrow: "תחנה 06",
    body: <>
      <p>צפו בסרטון הבא.</p>
      <p>מנהיג שעמד בצמתים של החלטות קשות, בין ביטחון לתקווה, בין מלחמה לשאיפה לשלום.</p>
      <p>הרמזים סביבכם יובילו אל סיפור של מנהיגות, אחריות ואומץ לבחור בדרך מורכבת.</p>
      <p>קראו, חשבו, חברו בין הפרטים.<br/>רק מי שיבין את הרמזים ויפענח את הדרך, יגלה מי עומד במרכז הסיפור.</p>
    </>,
    videoId: "Yp5sYafDHZA",
    prompt: "מי המנהיג שעומד במרכז הסיפור?",
    answers: ["יצחק רבין", "רבין"],
  },
  9: {
    station: 7,
    title: "כתב עתיק, רעיון חדש",
    eyebrow: "תחנה 07",
    body: <>
      <p>בין קירות שותקים וסימנים נסתרים,<br/>ממתינה חידה הכתובה בקודים ובסודות עתיקים.<br/>לא כל מילה נקראת כמו שהיא נראית,<br/>ולא כל אמת מיד מתגלה ומתפרשת.</p>
      <p>פתחו עיניים, חדדו מחשבה,<br/>כי רק מי שיפענח – ימשיך הלאה.<br/>הזמן דוחק, הרמזים כבר כאן...<br/>האם תצליחו לפצח את הכתב ולהבין לאן?</p>
    </>,
    image: "/escape-room/station-7-hebrew-university.jpg",
    imageAlt: "חידת כתב עברי, ספר, מנורה והר הצופים",
    prompt: "פענחו את הרמז והזינו את המקום שאליו הוא מוביל",
    answers: ["האוניברסיטה העברית", "אוניברסיטה העברית", "האוניברסיטה העברית בירושלים"],
  },
};

function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[׳'״".,!?–—-]/g, "")
    .replace(/\s+/g, " ");
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

export default function EscapeRoomPage() {
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState(0);
  const [team, setTeam] = useState<Team>({ names: "", grade: "י׳", className: "" });
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "wrong" | "correct">("idle");
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SavedState;
        setStage(parsed.stage ?? 0);
        setTeam(parsed.team ?? { names: "", grade: "י׳", className: "" });
        setStartedAt(parsed.startedAt ?? null);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const state: SavedState = { stage, team, startedAt };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [ready, stage, team, startedAt]);

  useEffect(() => {
    if (!startedAt) return;
    const tick = () => setElapsed(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [startedAt]);

  useEffect(() => {
    setAnswer("");
    setFeedback("idle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stage]);

  const activeChallenge = challenges[stage];
  const stationNumber = activeChallenge?.station ?? (stage === 7 ? 5 : stage >= 10 ? 7 : 0);
  const progress = Math.min(100, Math.max(0, (stationNumber / 7) * 100));

  const teamLabel = useMemo(() => {
    const bits = [team.className ? `כיתה ${team.className}` : "", team.names].filter(Boolean);
    return bits.join(" · ");
  }, [team]);

  const startJourney = (event: FormEvent) => {
    event.preventDefault();
    if (!team.names.trim() || !team.className.trim()) return;
    const now = Date.now();
    setStartedAt(now);
    setStage(2);
  };

  const submitChallenge = (event: FormEvent) => {
    event.preventDefault();
    if (!activeChallenge) return;
    const value = normalizeAnswer(answer);
    const ok = activeChallenge.answers.some(item => normalizeAnswer(item) === value);
    setFeedback(ok ? "correct" : "wrong");
  };

  const nextStage = () => setStage(prev => Math.min(11, prev + 1));

  const resetJourney = () => {
    if (!window.confirm("להתחיל את המסע מחדש? ההתקדמות הנוכחית תימחק.")) return;
    window.localStorage.removeItem(STORAGE_KEY);
    setStage(0);
    setTeam({ names: "", grade: "י׳", className: "" });
    setStartedAt(null);
    setElapsed(0);
  };

  if (!ready) return <main className="escape-room-page escape-loading" aria-live="polite">טוענים את מנהרת הזמן...</main>;

  return <main className="escape-room-page" dir="rtl">
    <header className="escape-topbar">
      <Link href="/about" className="escape-back"><ArrowLeft size={18}/> חזרה לאתר</Link>
      <div className="escape-brand"><img src="/makif-z-logo.png" alt=""/><span>אני ישראלי</span></div>
      {stage >= 2 && stage <= 10 && <div className="escape-timer"><Clock3 size={17}/><span>{formatTime(elapsed)}</span></div>}
    </header>

    {stage >= 2 && stage <= 10 && <div className="escape-progress-shell" aria-label={`התקדמות: תחנה ${stationNumber} מתוך 7`}>
      <div className="escape-progress-meta"><span>{teamLabel}</span><strong>תחנה {stationNumber} מתוך 7</strong></div>
      <div className="escape-progress-track"><span style={{ width: `${progress}%` }}/></div>
      <div className="escape-station-dots" aria-hidden="true">{[1,2,3,4,5,6,7].map(n => <span key={n} className={n < stationNumber ? "done" : n === stationNumber ? "current" : ""}>{n < stationNumber ? "✓" : n}</span>)}</div>
    </div>}

    {stage === 0 && <section className="escape-intro">
      <div className="escape-intro-overlay"/>
      <div className="escape-intro-content">
        <p className="escape-kicker">חדר בריחה במרחב המוזיאלי</p>
        <h1>מנהרת הזמן</h1>
        <h2>„אני ישראלי”</h2>
        <p className="escape-lead">מסע בין רגעים שעיצבו זהות, בין החלטות גורליות, שברים, הצלה ועמידה איתנה.</p>
        <p>כאן אין רק תאריכים ושמות, אלא סיפורים, סמלים ובחירות אנושיות. במהלך הדרך תפגשו ציר זמן שנשבר ונבנה מחדש, רמזים חזותיים ומספריים, ודמויות שלא תמיד נראות — אך השפעתן עצומה.</p>
        <p className="escape-quote">„הסיפור עוד נכתב — ואתם חלק בלתי נפרד ממנו.”</p>
        <button className="escape-primary" onClick={() => setStage(1)}>יוצאים למסע <ArrowLeft size={19}/></button>
      </div>
    </section>}

    {stage === 1 && <section className="escape-screen escape-team-screen">
      <div className="escape-panel escape-team-panel">
        <span className="escape-icon"><Users size={27}/></span>
        <p className="escape-kicker">לפני שיוצאים לדרך</p>
        <h1>מי בצוות?</h1>
        <p>ההתקדמות תישמר במכשיר הזה, כך שגם אם הדפדפן ייסגר תוכלו להמשיך מאותה נקודה.</p>
        <form className="escape-team-form" onSubmit={startJourney}>
          <label>שמות חברי הצוות<input value={team.names} onChange={e => setTeam({...team, names: e.target.value})} placeholder="לדוגמה: נועה, אדם, מאיה" required/></label>
          <div className="escape-form-row">
            <label>שכבה<select value={team.grade} onChange={e => setTeam({...team, grade: e.target.value})}><option>י׳</option><option>ט׳</option><option>י״א</option><option>י״ב</option></select></label>
            <label>כיתה<input value={team.className} onChange={e => setTeam({...team, className: e.target.value})} placeholder="י׳1" required/></label>
          </div>
          <button className="escape-primary" type="submit">התחלנו <KeyRound size={19}/></button>
        </form>
      </div>
    </section>}

    {activeChallenge && <section className="escape-screen">
      <article className="escape-panel escape-challenge">
        <div className="escape-heading-row">
          <div><p className="escape-kicker">{activeChallenge.eyebrow}</p><h1>{activeChallenge.title}</h1></div>
          <span className="escape-stamp"><MapPin size={18}/> מנהרת הזמן</span>
        </div>
        <div className="escape-story">{activeChallenge.body}</div>

        {activeChallenge.image && <button className="escape-media-button" type="button" onClick={() => setZoomSrc(activeChallenge.image!)} aria-label="הגדלת התמונה">
          <img src={activeChallenge.image} alt={activeChallenge.imageAlt ?? "תמונת החידה"}/>
          <span><Expand size={17}/> הגדלה</span>
        </button>}

        {activeChallenge.videoId && <div className="escape-video"><iframe src={`https://www.youtube-nocookie.com/embed/${activeChallenge.videoId}?rel=0`} title="סרטון תחנה 6" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/></div>}

        {activeChallenge.teacherNote && <div className="escape-teacher-note"><Clock3 size={19}/><span>{activeChallenge.teacherNote}</span></div>}

        <form className="escape-answer-box" onSubmit={submitChallenge}>
          <label htmlFor="escape-answer">{activeChallenge.prompt}</label>
          <div className="escape-answer-row">
            <input id="escape-answer" value={answer} onChange={e => { setAnswer(e.target.value); setFeedback("idle"); }} inputMode={activeChallenge.inputMode === "numeric" ? "numeric" : "text"} autoComplete="off" placeholder={activeChallenge.inputMode === "numeric" ? "הקוד שלכם" : "התשובה שלכם"}/>
            <button type="submit" className="escape-check" disabled={!answer.trim()}>בדיקה</button>
          </div>
          {feedback === "wrong" && <p className="escape-feedback wrong">עדיין לא. בדקו שוב את הרמזים ונסו מחדש.</p>}
          {feedback === "correct" && <div className="escape-unlocked"><CheckCircle2 size={24}/><div><strong>נכון. התחנה נפתחה.</strong><span>אפשר להמשיך במסע.</span></div><button type="button" onClick={nextStage}>לתחנה הבאה <ArrowLeft size={17}/></button></div>}
        </form>
      </article>
    </section>}

    {stage === 7 && <section className="escape-screen">
      <article className="escape-panel escape-waypoint">
        <div className="escape-heading-row"><div><p className="escape-kicker">סימן דרך</p><h1>עוצרים לרגע במרחב</h1></div><span className="escape-stamp"><Flag size={18}/> בין תחנה 5 ל־6</span></div>
        <button className="escape-media-button portrait" type="button" onClick={() => setZoomSrc("/escape-room/waypoint.jpg")} aria-label="הגדלת סימן הדרך"><img src="/escape-room/waypoint.jpg" alt="סימן דרך"/><span><Expand size={17}/> הגדלה</span></button>
        <div className="escape-story"><p>גשו לדמות שזיהיתם בתחנה מס׳ 5, הקשיבו לדבריו וקבלו ממנו את הרמז לתחנה הבאה.</p><p>בהמשך לכך...</p><p className="escape-emphasis">מיהו האדם בתמונה שהציג בפניכם אילן רמון?</p></div>
        <form className="escape-answer-box" onSubmit={e => { e.preventDefault(); const ok=["מנחם בגין","בגין"].some(v=>normalizeAnswer(v)===normalizeAnswer(answer)); setFeedback(ok?"correct":"wrong"); }}>
          <label htmlFor="waypoint-answer">הזינו את שם האדם</label>
          <div className="escape-answer-row"><input id="waypoint-answer" value={answer} onChange={e=>{setAnswer(e.target.value);setFeedback("idle")}} placeholder="שם הדמות"/><button className="escape-check" disabled={!answer.trim()}>בדיקה</button></div>
          {feedback === "wrong" && <p className="escape-feedback wrong">עדיין לא. חזרו אל הדמות במרחב ובדקו את הרמז שקיבלתם.</p>}
          {feedback === "correct" && <div className="escape-unlocked"><CheckCircle2 size={24}/><div><strong>נכון — מנחם בגין.</strong><span>תחנה 6 מחכה לכם.</span></div><button type="button" onClick={nextStage}>לתחנה 6 <ArrowLeft size={17}/></button></div>}
        </form>
      </article>
    </section>}

    {stage === 10 && <section className="escape-screen">
      <article className="escape-panel escape-final">
        <div className="escape-heading-row"><div><p className="escape-kicker">בדרך לקו הסיום</p><h1>החידה האחרונה</h1></div><span className="escape-stamp"><LockKeyhole size={18}/> שער אחרון</span></div>
        <div className="escape-story escape-poem"><p>בין דפים עתיקים ורמזים נסתרים,<br/>מתחבאים זיכרונות, קולות וסיפורים.<br/>יש כאן אדמה, רוח ונפש חיה,<br/>דמעות וצחוק – תקווה ובכייה.</p><p>שורשים עמוקים, חלום שנשמר,<br/>ילד וצופה עתיד – עבר שלא נגמר.<br/>לא רק מקום על מפה מצוירת,<br/>אלא לב פועם – ארץ מדוברת.</p></div>
        <button className="escape-media-button" type="button" onClick={() => setZoomSrc("/escape-room/final-pela.jpg")} aria-label="הגדלת חידת קו הסיום"><img src="/escape-room/final-pela.jpg" alt="של מי הארץ – חידת קו הסיום"/><span><Expand size={17}/> הגדלה</span></button>
        <form className="escape-answer-box" onSubmit={e => { e.preventDefault(); setFeedback(normalizeAnswer(answer) === normalizeAnswer("פלא") ? "correct" : "wrong"); }}>
          <label htmlFor="final-answer">פתרו את שלוש החידות, אספו את האותיות המסומנות וגלו לאיזה חדר עליכם להגיע</label>
          <div className="escape-answer-row"><input id="final-answer" value={answer} onChange={e=>{setAnswer(e.target.value);setFeedback("idle")}} placeholder="שם החדר"/><button className="escape-check" disabled={!answer.trim()}>בדיקה</button></div>
          {feedback === "wrong" && <p className="escape-feedback wrong">עוד לא. חזרו לשלוש החידות ובדקו אילו אותיות מסומנות.</p>}
          {feedback === "correct" && <div className="escape-unlocked final-unlock"><Sparkles size={25}/><div><strong>הדרך לקו הסיום נפתחה.</strong><span>גשו לחדר פלא.</span></div><button type="button" onClick={nextStage}>הגענו לחדר פלא <ArrowLeft size={17}/></button></div>}
        </form>
      </article>
    </section>}

    {stage === 11 && <section className="escape-victory">
      <div className="escape-victory-overlay"/>
      <div className="escape-victory-card">
        <span className="escape-victory-icon"><Sparkles size={34}/></span>
        <p className="escape-kicker">קו הסיום</p>
        <h1>פתחתם את מנהרת הזמן</h1>
        <p className="escape-victory-team">{team.names}</p>
        <div className="escape-victory-stats"><span><Clock3 size={18}/><b>{formatTime(elapsed)}</b><small>זמן המסע</small></span><span><KeyRound size={18}/><b>7</b><small>תחנות נפתחו</small></span></div>
        <blockquote>„הסיפור עוד נכתב — ואתם חלק בלתי נפרד ממנו.”</blockquote>
        <Link className="escape-primary" href="/about">חזרה ל„אני ישראלי” <ArrowLeft size={18}/></Link>
        <button className="escape-reset" type="button" onClick={resetJourney}><RotateCcw size={16}/> התחלה מחדש</button>
      </div>
    </section>}

    {stage >= 2 && stage <= 10 && <button className="escape-reset floating" type="button" onClick={resetJourney}><RotateCcw size={15}/> איפוס</button>}

    {zoomSrc && <div className="escape-lightbox" role="dialog" aria-modal="true" aria-label="תמונה מוגדלת" onClick={() => setZoomSrc(null)}>
      <button className="escape-lightbox-close" onClick={() => setZoomSrc(null)} aria-label="סגירת התמונה"><X size={24}/></button>
      <img src={zoomSrc} alt="תמונה מוגדלת" onClick={e => e.stopPropagation()}/>
      <span>אפשר להשתמש בצביטה להגדלה במכשיר נייד</span>
    </div>}

    <style jsx global>{`
      body:has(.escape-room-page) .site-theme-toggle{display:none!important}
      .escape-room-page{--er-bg:#071821;--er-deep:#0c2733;--er-panel:#102c37;--er-teal:#66c9c8;--er-cyan:#a7e2de;--er-cream:#f7f2e7;--er-paper:#fffcf5;--er-gold:#d6b36c;min-height:100svh;background:radial-gradient(circle at 75% 10%,#154451 0,transparent 34%),linear-gradient(180deg,#071821 0%,#0b2029 100%);color:#f4f8f7;font-family:"Varela Round",sans-serif}
      .escape-loading{display:grid;place-items:center;font-size:1rem;color:#bcd3d4}
      .escape-topbar{height:66px;padding:0 clamp(16px,4vw,34px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;border-bottom:1px solid #ffffff18;background:#071821e8;backdrop-filter:blur(12px);position:sticky;top:0;z-index:40}
      .escape-back{justify-self:start;display:inline-flex;align-items:center;gap:7px;color:#c7d7d9;font-size:.86rem}
      .escape-brand{display:flex;align-items:center;gap:8px;font-weight:800;color:#fff}.escape-brand img{width:38px;height:38px;object-fit:contain}.escape-timer{justify-self:end;display:flex;align-items:center;gap:7px;color:#a7e2de;font-variant-numeric:tabular-nums;font-weight:800}
      .escape-progress-shell{position:sticky;top:66px;z-index:35;padding:10px clamp(16px,4vw,34px) 12px;background:#0a202aee;border-bottom:1px solid #ffffff12;backdrop-filter:blur(10px)}
      .escape-progress-meta{max-width:980px;margin:0 auto 7px;display:flex;justify-content:space-between;gap:16px;font-size:.75rem;color:#9bb0b7}.escape-progress-meta strong{color:#d9eeec}.escape-progress-track{max-width:980px;height:5px;margin:auto;background:#ffffff12;border-radius:99px;overflow:hidden}.escape-progress-track span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#4db4b8,#b3e3d8);transition:width .24s ease}.escape-station-dots{max-width:980px;margin:8px auto 0;display:flex;justify-content:space-between;direction:ltr}.escape-station-dots span{width:25px;height:25px;border:1px solid #ffffff22;border-radius:50%;display:grid;place-items:center;color:#6f8992;font-size:.68rem;font-weight:800}.escape-station-dots span.done{background:#1f6768;border-color:#4ca2a2;color:white}.escape-station-dots span.current{background:#f0d99f;color:#14303a;border-color:#f0d99f;box-shadow:0 0 0 4px #f0d99f18}
      .escape-intro,.escape-victory{position:relative;min-height:calc(100svh - 66px);display:grid;place-items:center;padding:48px 20px;background-image:url('/file_000000001f34820aa8188af788222a31.png');background-size:cover;background-position:center;overflow:hidden}.escape-intro-overlay,.escape-victory-overlay{position:absolute;inset:0;background:linear-gradient(90deg,#06151dec,#092732d9 58%,#0b3c458e),linear-gradient(0deg,#06151de8,transparent 65%)}.escape-intro-content{position:relative;z-index:1;width:min(760px,100%);margin-right:min(8vw,100px);justify-self:start}.escape-kicker{margin:0 0 9px;color:var(--er-teal);font-size:.83rem;font-weight:800;letter-spacing:.05em}.escape-intro h1{margin:0;color:#fff;font-size:clamp(4.3rem,12vw,8rem);line-height:.88;letter-spacing:-.07em}.escape-intro h2{margin:13px 0 26px;color:#c6e9e4;font-size:clamp(1.45rem,4vw,2.2rem)}.escape-intro-content>p:not(.escape-kicker):not(.escape-quote){max-width:650px;margin:0 0 16px;color:#d9e6e6;line-height:1.85;font-size:1rem}.escape-intro .escape-lead{font-size:clamp(1.08rem,2vw,1.24rem)!important;color:#fff!important}.escape-quote{margin:28px 0!important;padding-right:18px;border-right:3px solid var(--er-gold);color:#f3db9f!important;font-size:1.08rem!important;font-weight:800}.escape-primary{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:50px;padding:0 22px;border:0;border-radius:14px;background:linear-gradient(135deg,#2c8f92,#4eb8b4);color:#fff;font:inherit;font-weight:800;cursor:pointer;box-shadow:0 12px 28px #00101745;transition:transform .2s ease,box-shadow .2s ease}.escape-primary:hover{transform:translateY(-1px);box-shadow:0 15px 34px #00101755}
      .escape-screen{min-height:calc(100svh - 138px);padding:clamp(28px,5vw,54px) 18px 76px}.escape-panel{width:min(920px,100%);margin:0 auto;padding:clamp(24px,5vw,44px);border:1px solid #ffffff17;border-radius:22px;background:linear-gradient(180deg,#11313dcf,#0c2733e8);box-shadow:0 26px 70px #00000035}.escape-team-screen{display:grid;place-items:center}.escape-team-panel{max-width:660px;text-align:center}.escape-icon{width:58px;height:58px;margin:0 auto 14px;border-radius:18px;background:#6dd1cd18;color:#7dd3d0;display:grid;place-items:center;border:1px solid #7dd3d028}.escape-team-panel h1,.escape-challenge h1,.escape-waypoint h1,.escape-final h1{margin:0;color:#fff;font-size:clamp(2.2rem,6vw,3.7rem);line-height:1.05;letter-spacing:-.045em}.escape-team-panel>p:not(.escape-kicker){max-width:520px;margin:16px auto 0;color:#aebfc4;line-height:1.75}.escape-team-form{margin-top:28px;text-align:right;display:grid;gap:16px}.escape-team-form label{display:grid;gap:7px;color:#d9e8e8;font-size:.86rem;font-weight:700}.escape-team-form input,.escape-team-form select,.escape-answer-row input{width:100%;min-height:50px;border:1px solid #ffffff22;border-radius:12px;background:#061923b5;color:#fff;padding:0 15px;font:inherit;outline:none}.escape-team-form input:focus,.escape-team-form select:focus,.escape-answer-row input:focus{border-color:#6dc9c6;box-shadow:0 0 0 3px #6dc9c61d}.escape-form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}.escape-team-form .escape-primary{margin-top:6px;width:100%}
      .escape-heading-row{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:25px}.escape-stamp{display:inline-flex;align-items:center;gap:7px;white-space:nowrap;padding:8px 11px;border:1px solid #ffffff1b;border-radius:999px;color:#9eb7bc;font-size:.76rem}.escape-story{color:#d8e3e3;font-size:1rem;line-height:1.9}.escape-story p{margin:0 0 18px}.escape-story p:last-child{margin-bottom:0}.escape-emphasis{color:#f0d99f!important;font-size:1.12rem;font-weight:800}.escape-poem{font-size:1.05rem}
      .escape-media-button{position:relative;width:100%;margin:28px 0 0;padding:0;border:1px solid #ffffff1c;border-radius:18px;overflow:hidden;background:#06151d;cursor:zoom-in;box-shadow:0 16px 34px #0000002f}.escape-media-button img{display:block;width:100%;max-height:560px;object-fit:contain;background:#081b24}.escape-media-button span{position:absolute;left:12px;bottom:12px;display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border-radius:999px;background:#06151dd9;color:#fff;font:700 .76rem/1 "Varela Round",sans-serif;backdrop-filter:blur(8px)}.escape-media-button.portrait{max-width:420px;margin-right:auto;margin-left:auto}.escape-media-button.portrait img{max-height:620px}.escape-video{margin-top:28px;border-radius:18px;overflow:hidden;border:1px solid #ffffff1c;background:#000;box-shadow:0 16px 34px #0000002f}.escape-video iframe{display:block;width:100%;aspect-ratio:16/9;border:0}.escape-teacher-note{margin-top:18px;padding:13px 15px;display:flex;align-items:flex-start;gap:10px;border:1px solid #d8b97832;border-radius:12px;background:#d8b9780d;color:#e8cf9c;font-size:.85rem;line-height:1.55}
      .escape-answer-box{margin-top:30px;padding:22px;border-radius:16px;background:#0619237a;border:1px solid #ffffff13}.escape-answer-box>label{display:block;margin-bottom:11px;color:#f0f5f4;font-size:.94rem;font-weight:800}.escape-answer-row{display:grid;grid-template-columns:1fr auto;gap:9px}.escape-check{min-width:102px;border:0;border-radius:12px;background:#e7cf92;color:#102b35;font:800 .9rem/1 "Varela Round",sans-serif;cursor:pointer}.escape-check:disabled{opacity:.4;cursor:not-allowed}.escape-feedback{margin:12px 0 0!important;font-size:.88rem}.escape-feedback.wrong{color:#ffb5ac}.escape-unlocked{margin-top:15px;padding:14px;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px;border:1px solid #67c9b82e;border-radius:13px;background:#67c9b80d;color:#8be0d3}.escape-unlocked div{display:grid;gap:2px}.escape-unlocked strong{color:#dff8f2}.escape-unlocked span{font-size:.8rem;color:#96bdbb}.escape-unlocked button{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:0 12px;border:0;border-radius:10px;background:#2b7779;color:white;font:800 .79rem/1 "Varela Round",sans-serif;cursor:pointer}.final-unlock{color:#f1d99d;background:#d5b4690d;border-color:#d5b4692e}.final-unlock strong{color:#fff0c8}
      .escape-victory-card{position:relative;z-index:1;width:min(650px,100%);padding:clamp(30px,6vw,54px);text-align:center;border:1px solid #ffffff25;border-radius:24px;background:#071c25e6;box-shadow:0 30px 80px #0008;backdrop-filter:blur(12px)}.escape-victory-icon{width:68px;height:68px;margin:0 auto 18px;border-radius:50%;display:grid;place-items:center;background:#d5b46920;color:#f3d99b;border:1px solid #d5b46938}.escape-victory-card h1{margin:0;color:#fff;font-size:clamp(2.5rem,7vw,4.5rem);line-height:1;letter-spacing:-.05em}.escape-victory-team{margin:18px 0 0;color:#bde3df;font-size:1.04rem;font-weight:800}.escape-victory-stats{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:28px 0}.escape-victory-stats span{padding:15px;border:1px solid #ffffff15;border-radius:14px;background:#ffffff08;display:grid;place-items:center;gap:3px}.escape-victory-stats svg{color:#76cdca}.escape-victory-stats b{font-size:1.35rem}.escape-victory-stats small{color:#91a8ae}.escape-victory-card blockquote{margin:26px 0;padding:18px 0;border-top:1px solid #ffffff14;border-bottom:1px solid #ffffff14;color:#efdba9;font-size:1.05rem;line-height:1.7}.escape-victory-card .escape-primary{margin-top:4px}.escape-reset{display:inline-flex;align-items:center;gap:6px;margin-top:18px;padding:7px 9px;border:0;background:transparent;color:#80979e;font:700 .76rem/1 "Varela Round",sans-serif;cursor:pointer}.escape-reset.floating{position:fixed;left:12px;bottom:12px;z-index:30;margin:0;border:1px solid #ffffff16;border-radius:999px;background:#061923d9;backdrop-filter:blur(8px)}
      .escape-lightbox{position:fixed;inset:0;z-index:1000;background:#02090df2;display:grid;place-items:center;padding:54px 14px 44px}.escape-lightbox img{max-width:96vw;max-height:82vh;object-fit:contain;touch-action:pinch-zoom;box-shadow:0 24px 70px #000}.escape-lightbox span{position:absolute;bottom:14px;color:#91a7ad;font-size:.72rem}.escape-lightbox-close{position:absolute;top:14px;left:14px;width:42px;height:42px;border:1px solid #ffffff26;border-radius:50%;display:grid;place-items:center;background:#122932;color:white;cursor:pointer}
      @media(max-width:700px){
        .escape-topbar{height:60px;padding:0 14px;grid-template-columns:1fr auto 1fr}.escape-brand span{display:none}.escape-brand img{width:34px;height:34px}.escape-back{font-size:.78rem}.escape-progress-shell{top:60px;padding:9px 14px 10px}.escape-progress-meta{font-size:.68rem}.escape-station-dots span{width:22px;height:22px;font-size:.62rem}
        .escape-intro{min-height:calc(100svh - 60px);padding:38px 20px;background-position:58% center}.escape-intro-content{margin:0;align-self:end;padding-bottom:22px}.escape-intro h1{font-size:clamp(4rem,21vw,6rem)}.escape-intro h2{margin-top:9px;margin-bottom:20px}.escape-intro-content>p:not(.escape-kicker):not(.escape-quote){font-size:.94rem;line-height:1.72}.escape-quote{margin:22px 0!important;font-size:1rem!important}.escape-primary{width:100%;min-height:50px}
        .escape-screen{min-height:calc(100svh - 128px);padding:24px 14px 66px}.escape-panel{padding:22px 18px;border-radius:17px}.escape-heading-row{display:block;margin-bottom:20px}.escape-heading-row h1{font-size:2.35rem}.escape-stamp{margin-top:12px}.escape-story{font-size:.96rem;line-height:1.8}.escape-story p{margin-bottom:16px}.escape-form-row{grid-template-columns:1fr 1fr}.escape-media-button{margin-top:22px;border-radius:13px}.escape-media-button span{left:8px;bottom:8px}.escape-video{margin-top:22px;border-radius:13px}.escape-answer-box{margin-top:23px;padding:16px 14px;border-radius:13px}.escape-answer-row{grid-template-columns:1fr}.escape-check{min-height:46px}.escape-unlocked{grid-template-columns:auto 1fr;align-items:start}.escape-unlocked button{grid-column:1/-1;width:100%;justify-content:center;min-height:44px}.escape-team-panel{padding-top:28px;padding-bottom:28px}.escape-team-form{margin-top:22px}.escape-victory{min-height:calc(100svh - 60px);padding:24px 14px}.escape-victory-card{padding:32px 20px;border-radius:18px}.escape-victory-card h1{font-size:2.8rem}.escape-victory-stats{margin:22px 0}.escape-reset.floating{bottom:8px;left:8px}.escape-lightbox{padding:56px 8px 42px}.escape-lightbox img{max-width:99vw;max-height:84vh}
      }
      @media(max-width:380px){.escape-form-row{grid-template-columns:1fr}.escape-station-dots span{width:20px;height:20px}.escape-progress-meta span{max-width:55%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}}
      @media(prefers-reduced-motion:reduce){.escape-primary,.escape-progress-track span{transition:none}.escape-primary:hover{transform:none}}
    `}</style>
  </main>;
}
