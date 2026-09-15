import { Footer, Header, LessonCard } from "../components";
import { lessons, type Lesson } from "../data";

const timeTunnelLesson: Lesson = {
  id: 100,
  slug: "time-tunnel",
  title: "מנהרת הזמן – חדר בריחה",
  category: "למידה במרחב המוזיאלי",
  hook: "חדר בריחה פיזי־דיגיטלי שבו המרחב עצמו הופך לחלק מהחידה.",
  description: "פעילות קבוצתית בת שבע תחנות המשלבת חיפוש במרחב, רמזים חזותיים, דמויות, קודים וסיפור ישראלי.",
  coverImage: "/escape-room/station-4-timeline.jpg",
  lessonUrl: "",
  accentColor: "#D6B36C",
  teacherFiles: [],
  studentFiles: [],
  apps: [],
  videos: [],
  externalLinks: [],
  tags: ["חדר בריחה", "מרחב מוזיאלי", "זהות ישראלית"],
  order: 0,
  grade: "י׳",
  duration: "גמיש",
  lessonType: "חדר בריחה פיזי־דיגיטלי",
};

const libraryLessons = [timeTunnelLesson, ...lessons];

export default function LessonsLibraryPage(){
  return <><Header showLogo={false}/><main className="lessons-library-page">
    <section className="lessons-library-hero">
      <div><p>אני ישראלי | שכבה י׳</p><h1>ספריית השיעורים</h1><span>כל מערכי השיעור, הכלים והחומרים במקום אחד.</span></div>
    </section>
    <section className="lessons-section lessons-library-section">
      <div className="lessons-grid">{libraryLessons.map((lesson,index)=><LessonCard key={lesson.slug} lesson={lesson} index={index}/>)}</div>
    </section>
  </main><Footer/>
  <style>{`
    .lessons-library-page{min-height:100vh;background:#fff}
    .lessons-library-hero{min-height:250px;padding:82px clamp(24px,7vw,120px) 38px;background:linear-gradient(135deg,#102d40,#17495e);color:#fff;display:flex;align-items:flex-end}
    .lessons-library-hero>div{max-width:900px}
    .lessons-library-hero p{margin:0 0 10px;color:#b9d8d7;font-size:.9rem;font-weight:700;letter-spacing:.04em}
    .lessons-library-hero h1{margin:0;font-size:clamp(3.1rem,6vw,5.6rem);line-height:1;letter-spacing:-.05em}
    .lessons-library-hero span{display:block;margin-top:14px;color:#dce9ea;font-size:clamp(1rem,1.6vw,1.2rem);line-height:1.55}
    .lessons-library-section{padding-top:clamp(46px,6vw,72px)}
    .lessons-library-section .lessons-grid{gap:clamp(20px,2.1vw,30px)}
    .lessons-library-section .lesson-card{overflow:hidden;border-radius:16px;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease}
    .lessons-library-section .card-visual{aspect-ratio:16/9}
    .lessons-library-section .card-visual img{transition:transform .24s ease}
    .lessons-library-section .card-content{min-height:215px;padding:20px 22px 19px}
    .lessons-library-section .category{font-size:.78rem;letter-spacing:.01em}
    .lessons-library-section .card-content h3{min-height:2.55em;margin:8px 0 9px;font-size:clamp(1.28rem,1.6vw,1.68rem);line-height:1.27}
    .lessons-library-section .card-content p{display:block;overflow:visible;min-height:3.16em;margin:0;font-size:.92rem;line-height:1.58;-webkit-line-clamp:unset;-webkit-box-orient:initial}
    .lessons-library-section .text-link{padding-top:13px;font-size:.91rem;transition:color .2s ease}
    .lessons-library-section .text-link svg{transition:transform .22s ease}
    @media(hover:hover) and (pointer:fine){
      .lessons-library-section .lesson-card:hover{transform:translateY(-3px);border-color:var(--accent);box-shadow:0 14px 34px rgba(16,45,64,.13)}
      .lessons-library-section .lesson-card:hover .text-link{color:var(--accent)}
      .lessons-library-section .lesson-card:hover .text-link svg{transform:translateX(-3px)}
    }
    .site-dark .lessons-library-page{background:#102129}
    .site-dark .lessons-library-section .lesson-card:hover{box-shadow:0 16px 36px rgba(0,0,0,.26)}
    @media(max-width:700px){
      .lessons-library-hero{min-height:205px;padding:72px 20px 28px}
      .lessons-library-hero p{margin-bottom:8px}
      .lessons-library-hero h1{font-size:3.15rem}
      .lessons-library-hero span{font-size:1rem;line-height:1.55;margin-top:12px}
      .lessons-library-section{padding:34px 18px 64px}
      .lessons-library-section .lessons-grid{gap:16px}
      .lessons-library-section .lesson-card{border-radius:14px}
      .lessons-library-section .card-content{min-height:0;padding:18px 18px 16px}
      .lessons-library-section .card-content h3{min-height:auto;font-size:1.34rem;margin:7px 0 8px}
      .lessons-library-section .card-content p{min-height:0;font-size:.94rem;line-height:1.65}
      .lessons-library-section .text-link{min-height:44px;align-items:center;padding-top:11px}
    }
    @media(hover:none){
      .lessons-library-section .lesson-card:active{transform:scale(.992);border-color:var(--accent);box-shadow:0 8px 22px rgba(16,45,64,.12)}
      .lessons-library-section .lesson-card:active .text-link{color:var(--accent)}
    }
    @media(prefers-reduced-motion:reduce){
      .lessons-library-section .lesson-card,.lessons-library-section .card-visual img,.lessons-library-section .text-link,.lessons-library-section .text-link svg{transition:none}
      .lessons-library-section .lesson-card:hover,.lessons-library-section .lesson-card:active{transform:none}
    }
  `}</style></>;
}
