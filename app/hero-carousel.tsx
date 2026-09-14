const slides=[
  ["/hero-slide-1.png","קולאז׳ ישראלי המחבר תלמידים, מדע, תרבות, היסטוריה, נופים ומורשת"],
  ["/hero-slide-2.png","קולאז׳ ישראלי המחבר לימוד, קולנוע, היסטוריה, ירושלים ונופי הארץ"],
  ["/hero-slide-3.png","בני נוער צועדים בתוך פסיפס של תרבות, אישים, היסטוריה ונופי ישראל"],
  ["/hero-slide-4.png","תלמידים במרכז פסיפס של מורשת, ספרות, מוזיקה, קולנוע ונופי ישראל"]
];

export function HeroCarousel(){return <section id="home" className="hero" aria-label="תמונות התוכנית אני ישראלי">
  <div className="hero-slides">{slides.map(([src,alt],i)=><img key={src} className={`hero-image slide-${i+1}`} src={src} alt={alt}/>)}</div>
  <div className="hero-shade"/>
  <div className="hero-content"><h1>אני ישראלי</h1><p>תוכנית השכלה כללית <span>|</span> שכבה י׳</p></div>
</section>}
