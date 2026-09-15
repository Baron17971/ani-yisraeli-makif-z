"use client";

import { ArrowLeft, CheckCircle2, Clock3, Expand, Flag, KeyRound, LockKeyhole, MapPin, RotateCcw, Sparkles, Users, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

const STORAGE_PREFIX = "ani-yisraeli-time-tunnel-v2";

type Team = { names: string; className: string };
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
    title: "חידת זהות המדינה",
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
      <p>כל חפץ הוא רמז.<br/>כל מספר הוא שיר. אולי..<br/>המילים חבויות בין דפים, בין מדף למדף,<br/>ובין עולם ישן לעולם חדש שנכתב בשפה אחת.</p>
      <p>החידה שלפניכם עוסקת באדם<br/>שלא רק כתב שירה —<br/>אלא עיצב שפה, זהות ותרבות של עם מתחדש.</p>
      <p>התבוננו היטב בתמונה,<br/>מצאו בין הרמזים את שיריו,<br/>וגלו קוד בן שלוש ספרות.</p>
      <p>רוצים עזרה - חפשו את הדמות במרחב.</p>
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
      <p className="game-emphasis">היא שרשרת.</p>
      <p>כל אירוע נשען על קודמו,<br/>וכל צעד מוביל לצעד הבא<br/>גם כשבזמן אמת לא רואים את התמונה המלאה.</p>
      <p>לפניכם רצף של תחנות היסטוריות.<br/>התמונות, המספרים והסימנים אינם מסודרים במקרה.<br/>כדי להתקדם, עליכם להבין מה קדם למה,<br/>ואיך נבנה הסיפור של מדינה שלב אחר שלב.</p>
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
      <p>כדי לפתור את החידה תצטרכו לחבר בין אירועים, סמלים וערכים,<br/>ולזהות דמות שייצגה את מדינת ישראל<br/>לא רק על הקרקע אלא גם הרבה מעבר לה.</p>
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
      <p>צפו בסרטון הבא:</p>
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
      <p>פתחו עיניים, חדדו מחשבה,<br/>כי רק מי שיפענח – ימשיך הלאה.<br/>הזמן דוחק, הרמזים כבר כאן…<br/>האם תצליחו לפצח את הכתב ולהבין לאן?</p>
    </>,
    image: "/escape-room/station-7-hebrew-university.jpg",
    imageAlt: "חידה חזותית על האוניברסיטה העברית",
    prompt: "פענחו את הרמז והזינו את המקום שאליו הוא מוביל",
    answers: ["האוניברסיטה העברית", "אוניברסיטה העברית", "האוניברסיטה העברית בירושלים"],
  },
};

function normalizeAnswer(value: string) {
  return value.trim().toLowerCase().replace(/[׳'״".,!?–—-]/g, "").replace(/\s+/g, " ");
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

export default function StudentEscapeRoomPage() {
  const [ready, setReady] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [stage, setStage] = useState(0);
  const [team, setTeam] = useState<Team>({ names: "", className: "" });
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "wrong" | "correct">("idle");
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const room = (params.get("room") ?? "").trim().toUpperCase();
    const classFromLink = (params.get("class") ?? "").trim();
    setSessionId(room);

    if (!room) {
      setTeam({ names: "", className: classFromLink });
      setReady(true);
      return;
    }

    try {
      const saved = window.localStorage.getItem(`${STORAGE_PREFIX}:${room}`);
      if (saved) {
        const parsed = JSON.parse(saved) as SavedState;
        setStage(parsed.stage ?? 0);
        setTeam(parsed.team ?? { names: "", className: classFromLink });
        setStartedAt(parsed.startedAt ?? null);
      } else {
        setTeam({ names: "", className: classFromLink });
      }
    } catch {
      setTeam({ names: "", className: classFromLink });
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !sessionId) return;
    const state: SavedState = { stage, team, startedAt };
    window.localStorage.setItem(`${STORAGE_PREFIX}:${sessionId}`, JSON.stringify(state));
  }, [ready, sessionId, stage, team, startedAt]);

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
    setStartedAt(Date.now());
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
    if (!sessionId || !window.confirm("להתחיל את המסע מחדש? ההתקדמות במכשיר הזה תימחק.")) return;
    window.localStorage.removeItem(`${STORAGE_PREFIX}:${sessionId}`);
    const params = new URLSearchParams(window.location.search);
    setStage(0);
    setTeam({ names: "", className: (params.get("class") ?? "").trim() });
    setStartedAt(null);
    setElapsed(0);
  };

  if (!ready) {
    return <main className="student-game loading" dir="rtl">טוענים את מנהרת הזמן...</main>;
  }

  if (!sessionId) {
    return <main className="student-game invalid-link" dir="rtl">
      <section className="invalid-card">
        <span className="game-round-icon"><LockKeyhole size={28}/></span>
        <p className="game-kicker">מנהרת הזמן</p>
        <h1>נדרש קישור כיתתי</h1>
        <p>הפעילות נפתחת באמצעות קישור ייחודי שהמורה יוצרת עבור הכיתה. בקשו מהמורה את קישור הפעילות.</p>
      </section>
      <style jsx global>{baseStyles}</style>
    </main>;
  }

  return <main className="student-game" dir="rtl">
    {stage >= 2 && stage <= 10 && <div className="game-status">
      <div><strong>מנהרת הזמן</strong><span>{teamLabel}</span></div>
      <div className="game-time"><Clock3 size={17}/>{formatTime(elapsed)}</div>
    </div>}

    {stage >= 2 && stage <= 10 && <div className="game-progress" aria-label={`התקדמות: תחנה ${stationNumber} מתוך 7`}>
      <div className="game-progress-meta"><span>תחנה {stationNumber} מתוך 7</span><b>{Math.round(progress)}%</b></div>
      <div className="game-progress-track"><span style={{width:`${progress}%`}}/></div>
      <div className="game-dots" aria-hidden="true">{[1,2,3,4,5,6,7].map(n=><span key={n} className={n<stationNumber?"done":n===stationNumber?"current":""}>{n<stationNumber?"✓":n}</span>)}</div>
    </div>}

    {stage === 0 && <section className="game-intro">
      <div className="game-intro-shade"/>
      <div className="game-intro-content">
        <p className="game-kicker">חדר בריחה במרחב המוזיאלי</p>
        <h1>מנהרת הזמן</h1>
        <h2>„אני ישראלי”</h2>
        {team.className && <span className="class-chip">כיתה {team.className}</span>}
        <p className="game-lead">מסע בין רגעים שעיצבו זהות, בין החלטות גורליות, שברים, הצלה ועמידה איתנה.</p>
        <p>כאן אין רק תאריכים ושמות, אלא סיפורים, סמלים ובחירות אנושיות. במהלך הדרך תפגשו ציר זמן שנשבר ונבנה מחדש, רמזים חזותיים ומספריים, ודמויות שלא תמיד נראות — אך השפעתן עצומה.</p>
        <p className="game-quote">„הסיפור עוד נכתב — ואתם חלק בלתי נפרד ממנו.”</p>
        <button className="game-primary" type="button" onClick={()=>setStage(1)}>יוצאים למסע <ArrowLeft size={18}/></button>
      </div>
    </section>}

    {stage === 1 && <section className="game-screen">
      <div className="game-panel team-panel">
        <span className="game-round-icon"><Users size={27}/></span>
        <p className="game-kicker">לפני שיוצאים לדרך</p>
        <h1>מי בצוות?</h1>
        <p>ההתקדמות תישמר במכשיר הזה ותהיה שייכת רק להפעלה של הכיתה שלכם.</p>
        <form className="team-form" onSubmit={startJourney}>
          <label>שמות חברי הצוות
            <input value={team.names} onChange={e=>setTeam({...team,names:e.target.value})} placeholder="לדוגמה: נועה, אדם, מאיה" required/>
          </label>
          {team.className ? <div className="fixed-class"><span>הכיתה שלכם</span><strong>{team.className}</strong></div> :
            <label>כיתה<input value={team.className} onChange={e=>setTeam({...team,className:e.target.value})} placeholder="י׳1" required/></label>}
          <button className="game-primary" type="submit">התחלנו <KeyRound size={18}/></button>
        </form>
      </div>
    </section>}

    {activeChallenge && <section className="game-screen">
      <article className="game-panel challenge-panel">
        <div className="game-heading">
          <div><p className="game-kicker">{activeChallenge.eyebrow}</p><h1>{activeChallenge.title}</h1></div>
          <span className="game-stamp"><MapPin size={17}/> במרחב</span>
        </div>
        <div className="game-story">{activeChallenge.body}</div>

        {activeChallenge.image && <button className="game-media" type="button" onClick={()=>setZoomSrc(activeChallenge.image!)} aria-label="הגדלת התמונה">
          <img src={activeChallenge.image} alt={activeChallenge.imageAlt ?? "תמונת החידה"}/>
          <span><Expand size={17}/> הגדלה</span>
        </button>}

        {activeChallenge.videoId && <div className="game-video">
          <iframe src={`https://www.youtube-nocookie.com/embed/${activeChallenge.videoId}?rel=0`} title="סרטון תחנה 6" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>
        </div>}

        {activeChallenge.teacherNote && <div className="game-note"><Clock3 size={19}/><span>{activeChallenge.teacherNote}</span></div>}

        <form className="answer-box" onSubmit={submitChallenge}>
          <label htmlFor="game-answer">{activeChallenge.prompt}</label>
          <div className="answer-row">
            <input id="game-answer" value={answer} onChange={e=>{setAnswer(e.target.value);setFeedback("idle")}} inputMode={activeChallenge.inputMode==="numeric"?"numeric":"text"} autoComplete="off" placeholder={activeChallenge.inputMode==="numeric"?"הקוד שלכם":"התשובה שלכם"}/>
            <button type="submit" className="check-button" disabled={!answer.trim()}>בדיקה</button>
          </div>
          {feedback==="wrong" && <p className="feedback wrong">עדיין לא. בדקו שוב את הרמזים ונסו מחדש.</p>}
          {feedback==="correct" && <div className="unlocked"><CheckCircle2 size={24}/><div><strong>נכון. התחנה נפתחה.</strong><span>אפשר להמשיך במסע.</span></div><button type="button" onClick={nextStage}>לתחנה הבאה <ArrowLeft size={17}/></button></div>}
        </form>
      </article>
    </section>}

    {stage === 7 && <section className="game-screen">
      <article className="game-panel challenge-panel">
        <div className="game-heading"><div><p className="game-kicker">סימן דרך</p><h1>עוצרים לרגע במרחב</h1></div><span className="game-stamp"><Flag size={17}/> בין תחנה 5 ל־6</span></div>
        <button className="game-media portrait" type="button" onClick={()=>setZoomSrc("/escape-room/waypoint.jpg")} aria-label="הגדלת סימן הדרך">
          <img src="/escape-room/waypoint.jpg" alt="סימן דרך"/><span><Expand size={17}/> הגדלה</span>
        </button>
        <div className="game-story">
          <p>גשו לדמות שזיהיתם בתחנה מס׳ 5, הקשיבו לדבריו וקבלו ממנו את הרמז לתחנה הבאה.</p>
          <p>בהמשך לכך..</p>
          <p className="game-emphasis">מיהו האדם בתמונה שהציג בפניכם אילן רמון?</p>
        </div>
        <form className="answer-box" onSubmit={e=>{e.preventDefault();const ok=["מנחם בגין","בגין"].some(v=>normalizeAnswer(v)===normalizeAnswer(answer));setFeedback(ok?"correct":"wrong")}}>
          <label htmlFor="waypoint-answer">הזינו את שם האדם</label>
          <div className="answer-row"><input id="waypoint-answer" value={answer} onChange={e=>{setAnswer(e.target.value);setFeedback("idle")}} placeholder="שם הדמות"/><button className="check-button" disabled={!answer.trim()}>בדיקה</button></div>
          {feedback==="wrong" && <p className="feedback wrong">עדיין לא. חזרו אל הדמות במרחב ובדקו את הרמז שקיבלתם.</p>}
          {feedback==="correct" && <div className="unlocked"><CheckCircle2 size={24}/><div><strong>נכון — מנחם בגין.</strong><span>תחנה 6 מחכה לכם.</span></div><button type="button" onClick={nextStage}>לתחנה 6 <ArrowLeft size={17}/></button></div>}
        </form>
      </article>
    </section>}

    {stage === 10 && <section className="game-screen">
      <article className="game-panel challenge-panel">
        <div className="game-heading"><div><p className="game-kicker">בדרך לקו הסיום</p><h1>החידה האחרונה</h1></div><span className="game-stamp"><LockKeyhole size={17}/> שער אחרון</span></div>
        <div className="game-story game-poem">
          <p>בין דפים עתיקים ורמזים נסתרים,<br/>מתחבאים זיכרונות, קולות וסיפורים.<br/>יש כאן אדמה, רוח ונפש חיה,<br/>דמעות וצחוק – תקווה ובכייה.</p>
          <p>שורשים עמוקים, חלום שנשמר,<br/>ילד וצופה עתיד – עבר שלא נגמר.<br/>לא רק מקום על מפה מצוירת,<br/>אלא לב פועם – ארץ מדוברת.</p>
        </div>
        <button className="game-media" type="button" onClick={()=>setZoomSrc("/escape-room/final-pela.jpg")} aria-label="הגדלת חידת קו הסיום">
          <img src="/escape-room/final-pela.jpg" alt="של מי הארץ – חידת קו הסיום"/><span><Expand size={17}/> הגדלה</span>
        </button>
        <form className="answer-box" onSubmit={e=>{e.preventDefault();setFeedback(normalizeAnswer(answer)===normalizeAnswer("פלא")?"correct":"wrong")}}>
          <label htmlFor="final-answer">פתרו את שלוש החידות, אספו את האותיות המסומנות וגלו לאיזה חדר עליכם להגיע</label>
          <div className="answer-row"><input id="final-answer" value={answer} onChange={e=>{setAnswer(e.target.value);setFeedback("idle")}} placeholder="שם החדר"/><button className="check-button" disabled={!answer.trim()}>בדיקה</button></div>
          {feedback==="wrong" && <p className="feedback wrong">עוד לא. חזרו לשלוש החידות ובדקו אילו אותיות מסומנות.</p>}
          {feedback==="correct" && <div className="unlocked"><Sparkles size={25}/><div><strong>הדרך לקו הסיום נפתחה.</strong><span>גשו לחדר פלא.</span></div><button type="button" onClick={nextStage}>הגענו לחדר פלא <ArrowLeft size={17}/></button></div>}
        </form>
      </article>
    </section>}

    {stage === 11 && <section className="victory-screen">
      <div className="victory-shade"/>
      <div className="victory-card">
        <span className="game-round-icon"><Sparkles size={34}/></span>
        <p className="game-kicker">קו הסיום</p>
        <h1>פתחתם את מנהרת הזמן</h1>
        <p className="victory-team">{team.names}</p>
        <div className="victory-stats"><span><Clock3 size={18}/><b>{formatTime(elapsed)}</b><small>זמן המסע</small></span><span><KeyRound size={18}/><b>7</b><small>תחנות נפתחו</small></span></div>
        <blockquote>„הסיפור עוד נכתב — ואתם חלק בלתי נפרד ממנו.”</blockquote>
        <p className="show-teacher">הראו למורה שהגעתם לקו הסיום.</p>
        <button className="reset-button" type="button" onClick={resetJourney}><RotateCcw size={16}/> התחלה מחדש</button>
      </div>
    </section>}

    {stage >= 2 && stage <= 10 && <button className="reset-button floating" type="button" onClick={resetJourney}><RotateCcw size={15}/> איפוס</button>}

    {zoomSrc && <div className="lightbox" role="dialog" aria-modal="true" aria-label="תמונה מוגדלת" onClick={()=>setZoomSrc(null)}>
      <button className="lightbox-close" type="button" onClick={()=>setZoomSrc(null)} aria-label="סגירת התמונה"><X size={24}/></button>
      <img src={zoomSrc} alt="תמונה מוגדלת" onClick={e=>e.stopPropagation()}/>
      <span>אפשר להשתמש בצביטה להגדלה במכשיר נייד</span>
    </div>}

    <style jsx global>{baseStyles}</style>
  </main>;
}

const baseStyles = `
  html:has(.student-game),body:has(.student-game){margin:0;background:#071821}
  body:has(.student-game) .site-theme-toggle{display:none!important}
  .student-game{--bg:#071821;--deep:#0c2733;--panel:#102c37;--teal:#66c9c8;--cyan:#a7e2de;--paper:#fffcf5;--gold:#d6b36c;min-height:100svh;background:radial-gradient(circle at 75% 10%,#154451 0,transparent 34%),linear-gradient(180deg,#071821 0%,#0b2029 100%);color:#f4f8f7;font-family:"Varela Round",Arial,sans-serif}
  .loading,.invalid-link{display:grid;place-items:center;padding:24px}
  .invalid-card{width:min(520px,100%);padding:34px 26px;border:1px solid #ffffff1f;border-radius:22px;background:#102c37;text-align:center;box-shadow:0 24px 80px #0005}
  .invalid-card h1{margin:8px 0 14px;font-size:2rem}.invalid-card p{margin:0;color:#c8d7d9;line-height:1.8}
  .game-status{position:sticky;top:0;z-index:30;min-height:62px;padding:9px clamp(16px,4vw,30px);display:flex;justify-content:space-between;align-items:center;gap:18px;border-bottom:1px solid #ffffff17;background:#071821ee;backdrop-filter:blur(12px)}
  .game-status>div:first-child{display:flex;flex-direction:column;gap:2px}.game-status strong{font-size:.96rem}.game-status span{color:#9db4ba;font-size:.75rem}.game-time{display:flex;align-items:center;gap:7px;color:#a7e2de;font-weight:800;font-variant-numeric:tabular-nums}
  .game-progress{position:sticky;top:62px;z-index:25;padding:9px 16px 11px;border-bottom:1px solid #ffffff12;background:#0a202af0;backdrop-filter:blur(10px)}
  .game-progress-meta{max-width:920px;margin:0 auto 7px;display:flex;justify-content:space-between;color:#a9bcc0;font-size:.76rem}.game-progress-meta span{color:#dbe8e7;font-weight:700}
  .game-progress-track{max-width:920px;height:5px;margin:auto;border-radius:99px;overflow:hidden;background:#ffffff12}.game-progress-track span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#4db4b8,#b3e3d8);transition:width .24s ease}
  .game-dots{max-width:920px;margin:8px auto 0;display:flex;justify-content:space-between;direction:ltr}.game-dots span{width:24px;height:24px;display:grid;place-items:center;border:1px solid #ffffff22;border-radius:50%;color:#708991;font-size:.68rem;font-weight:800}.game-dots .done{border-color:#66c9c8;background:#66c9c8;color:#06242a}.game-dots .current{border-color:#f1d99b;color:#f1d99b;box-shadow:0 0 0 4px #f1d99b12}
  .game-intro,.victory-screen{position:relative;min-height:100svh;display:grid;place-items:center;overflow:hidden;background:url("/file_000000001f34820aa8188af788222a31.png") center/cover no-repeat}
  .game-intro-shade,.victory-shade{position:absolute;inset:0;background:linear-gradient(90deg,#071821f7 0%,#0a2531e7 56%,#0a253193 100%),linear-gradient(0deg,#071821d8,transparent 60%)}
  .game-intro-content,.victory-card{position:relative;z-index:1;width:min(760px,calc(100% - 36px));padding:42px clamp(24px,5vw,54px);border:1px solid #ffffff18;border-radius:26px;background:#071821d9;box-shadow:0 28px 90px #0007;backdrop-filter:blur(10px);text-align:right}
  .game-intro-content h1{margin:0;font-size:clamp(3.5rem,10vw,6.8rem);line-height:.92;letter-spacing:-.06em}.game-intro-content h2{margin:8px 0 0;color:#a7e2de;font-size:clamp(1.5rem,4vw,2.2rem)}
  .game-kicker{margin:0 0 9px;color:#8cd9d3;font-size:.82rem;font-weight:800;letter-spacing:.05em}.class-chip{display:inline-flex;margin-top:18px;padding:7px 12px;border:1px solid #ffffff1f;border-radius:999px;color:#f1d99b;background:#ffffff0b;font-size:.86rem;font-weight:800}
  .game-lead{margin:28px 0 0!important;color:#f0f5f4!important;font-size:1.08rem!important}.game-intro-content>p:not(.game-kicker):not(.game-quote){max-width:650px;color:#cbdadc;line-height:1.85}.game-quote{margin:26px 0;color:#f1d99b;font-size:1.08rem;font-weight:700;line-height:1.7}
  .game-primary,.check-button,.unlocked button{border:0;cursor:pointer}.game-primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:50px;padding:0 20px;border-radius:13px;background:#f1d99b;color:#17313b;font-weight:900;font-size:.96rem}
  .game-screen{min-height:calc(100svh - 115px);padding:34px 18px 80px;display:grid;place-items:start center}.game-panel{width:min(900px,100%);border:1px solid #ffffff16;border-radius:22px;background:#102c37;box-shadow:0 24px 70px #0004}.team-panel{max-width:620px;padding:34px}.challenge-panel{padding:clamp(24px,5vw,44px)}
  .game-round-icon{display:grid;width:54px;height:54px;place-items:center;margin:0 auto 18px;border:1px solid #ffffff22;border-radius:50%;background:#ffffff0d;color:#f1d99b}.team-panel{text-align:center}.team-panel h1{margin:0 0 12px;font-size:2.4rem}.team-panel>p:not(.game-kicker){margin:0 auto 26px;max-width:480px;color:#bccfd2;line-height:1.75}
  .team-form{display:grid;gap:16px;text-align:right}.team-form label,.answer-box>label{display:grid;gap:8px;color:#dbe8e7;font-size:.9rem;font-weight:800}.team-form input,.answer-row input{width:100%;box-sizing:border-box;min-height:50px;padding:0 14px;border:1px solid #ffffff20;border-radius:12px;background:#071d26;color:#fff;font:inherit;outline:none}.team-form input:focus,.answer-row input:focus{border-color:#66c9c8;box-shadow:0 0 0 3px #66c9c822}
  .fixed-class{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border:1px solid #ffffff16;border-radius:12px;background:#ffffff08}.fixed-class span{color:#94abb1;font-size:.82rem}.fixed-class strong{color:#f1d99b}
  .game-heading{display:flex;justify-content:space-between;gap:20px;align-items:flex-start}.game-heading h1{margin:0;color:#fff;font-size:clamp(2.35rem,6vw,4.2rem);line-height:1;letter-spacing:-.045em}.game-stamp{display:inline-flex;align-items:center;gap:6px;white-space:nowrap;padding:8px 10px;border:1px solid #ffffff18;border-radius:999px;color:#9fd8d4;font-size:.78rem}
  .game-story{margin:28px 0;color:#d2dfe1;font-size:1rem;line-height:1.85}.game-story p{margin:0 0 17px}.game-story p:last-child{margin-bottom:0}.game-emphasis{color:#f1d99b!important;font-size:1.12rem;font-weight:900}
  .game-media{position:relative;width:100%;padding:0;overflow:hidden;border:1px solid #ffffff16;border-radius:16px;background:#071d26;cursor:zoom-in}.game-media img{display:block;width:100%;height:auto;max-height:660px;object-fit:contain;background:#091c25}.game-media>span{position:absolute;left:12px;bottom:12px;display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border-radius:10px;background:#071821d9;color:#fff;font-size:.78rem}.game-media.portrait img{max-height:560px}.game-video{overflow:hidden;border-radius:16px;background:#000;aspect-ratio:16/9}.game-video iframe{width:100%;height:100%;border:0}
  .game-note{margin-top:18px;padding:14px 16px;display:flex;gap:10px;align-items:flex-start;border:1px solid #d6b36c55;border-radius:12px;background:#d6b36c10;color:#f1d99b;line-height:1.65}
  .answer-box{margin-top:26px;padding:22px;border:1px solid #ffffff13;border-radius:16px;background:#081f29}.answer-row{display:grid;grid-template-columns:1fr auto;gap:10px;margin-top:11px}.check-button{min-width:92px;border-radius:11px;background:#67c8c4;color:#06262c;font-weight:900}.check-button:disabled{opacity:.45;cursor:not-allowed}.feedback{margin:12px 0 0;font-size:.9rem}.feedback.wrong{color:#ffb4ad}
  .unlocked{margin-top:15px;padding:15px;display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;border:1px solid #73d9b844;border-radius:13px;background:#73d9b80c;color:#9be9d2}.unlocked div{display:flex;flex-direction:column}.unlocked span{margin-top:2px;color:#bfd6d2;font-size:.78rem}.unlocked button{display:inline-flex;align-items:center;gap:6px;padding:10px 12px;border-radius:10px;background:#f1d99b;color:#17313b;font-weight:900}
  .game-poem{font-size:1.04rem}.victory-card{text-align:center;max-width:640px}.victory-card h1{margin:0;font-size:clamp(2.8rem,8vw,5rem);line-height:1}.victory-team{margin:14px 0 0;color:#a7e2de;font-size:1.08rem;font-weight:800}.victory-stats{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:26px 0}.victory-stats span{padding:17px;border:1px solid #ffffff15;border-radius:14px;background:#ffffff08;display:grid;place-items:center;gap:4px}.victory-stats b{font-size:1.3rem}.victory-stats small{color:#9fb4ba}.victory-card blockquote{margin:22px 0;color:#f1d99b;line-height:1.7}.show-teacher{color:#dbe8e7;font-weight:800}
  .reset-button{display:inline-flex;align-items:center;gap:6px;border:0;background:transparent;color:#9db2b6;cursor:pointer}.reset-button.floating{position:fixed;right:14px;bottom:14px;z-index:20;padding:9px 11px;border:1px solid #ffffff16;border-radius:11px;background:#071821d9;backdrop-filter:blur(8px)}
  .lightbox{position:fixed;inset:0;z-index:100;display:grid;place-items:center;padding:54px 14px 34px;background:#020b0fef;overflow:auto}.lightbox img{max-width:min(1200px,96vw);max-height:82vh;object-fit:contain;touch-action:pinch-zoom}.lightbox-close{position:fixed;left:16px;top:16px;width:46px;height:46px;display:grid;place-items:center;border:1px solid #ffffff22;border-radius:50%;background:#0b2029;color:#fff;cursor:pointer}.lightbox>span{position:fixed;bottom:9px;color:#9eb4b8;font-size:.76rem}
  @media(max-width:700px){
    .game-status{min-height:58px;padding:8px 14px}.game-progress{top:58px;padding:8px 14px 10px}.game-dots span{width:22px;height:22px}
    .game-intro{align-items:end}.game-intro-shade{background:linear-gradient(0deg,#071821 0%,#071821f0 48%,#07182175 100%)}.game-intro-content{width:100%;box-sizing:border-box;border:0;border-radius:24px 24px 0 0;padding:34px 20px 30px;background:#071821ee}.game-intro-content h1{font-size:4rem}.game-intro-content h2{font-size:1.55rem}
    .game-screen{padding:24px 14px 74px}.game-panel{border-radius:16px}.team-panel,.challenge-panel{padding:24px 18px}.team-panel h1{font-size:2.15rem}.game-heading{gap:12px}.game-heading h1{font-size:2.45rem}.game-stamp{padding:7px 9px;font-size:.72rem}.game-story{font-size:.98rem;line-height:1.8;margin:22px 0}
    .answer-box{padding:17px 14px}.answer-row{grid-template-columns:1fr}.check-button{min-height:47px}.unlocked{grid-template-columns:auto 1fr}.unlocked button{grid-column:1/-1;justify-content:center;min-height:45px}
    .game-media{border-radius:12px}.game-video{border-radius:12px}.victory-card{width:calc(100% - 28px);box-sizing:border-box;padding:30px 20px}.victory-stats{grid-template-columns:1fr 1fr}.lightbox{padding:58px 8px 32px}
  }
  @media(prefers-reduced-motion:reduce){.game-progress-track span{transition:none}}
`;
