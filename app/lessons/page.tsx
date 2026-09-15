import { Footer, Header, LessonCard } from "../components";
import { lessons } from "../data";

export default function LessonsLibraryPage(){
  return <><Header/><main className="lessons-library-page">
    <section className="lessons-library-hero">
      <div><p>אני ישראלי | שכבה י׳</p><h1>ספריית השיעורים</h1><span>כל מערכי השיעור, הכלים והחומרים במקום אחד.</span></div>
    </section>
    <section className="lessons-section lessons-library-section">
      <div className="lessons-grid">{lessons.map((lesson,index)=><LessonCard key={lesson.id} lesson={lesson} index={index}/>)}</div>
    </section>
  </main><Footer/>
  <style>{`
    .lessons-library-page{min-height:100vh;background:#fff}
    .lessons-library-hero{min-height:300px;padding:120px clamp(24px,7vw,120px) 54px;background:linear-gradient(135deg,#102d40,#17495e);color:#fff;display:flex;align-items:flex-end}
    .lessons-library-hero>div{max-width:900px}
    .lessons-library-hero p{margin:0 0 10px;color:#b9d8d7;font-size:.9rem;font-weight:700}
    .lessons-library-hero h1{margin:0;font-size:clamp(3rem,6vw,5.6rem);line-height:1;letter-spacing:-.05em}
    .lessons-library-hero span{display:block;margin-top:16px;color:#dce9ea;font-size:clamp(1rem,1.6vw,1.2rem)}
    .lessons-library-section{padding-top:clamp(48px,6vw,76px)}
    .home-dark .lessons-library-page{background:#102129}
    @media(max-width:700px){.lessons-library-hero{min-height:245px;padding:100px 22px 40px}.lessons-library-hero h1{font-size:3.3rem}.lessons-library-hero span{font-size:1rem}}
  `}</style></>;
}
