export type LessonStep={number:string;title:string;description:string;duration?:string;topics?:string[]};
export type LessonLink={title:string;description:string;url:string;label:string};
export type LessonMaterial={title:string;description:string;url?:string;label?:string};
export type LessonObjective={title:string;text:string};
export type Lesson={id:number;slug:string;title:string;category:string;hook:string;description:string;coverImage:string;lessonUrl:string;accentColor:string;teacherFiles:unknown[];studentFiles:unknown[];apps:unknown[];videos:unknown[];externalLinks:unknown[];tags:string[];order:number;grade?:string;duration?:string;lessonType?:string;about?:string[];objectives?:string[];objectiveCards?:LessonObjective[];prep?:string[];steps?:LessonStep[];discussionQuestions?:string[];digitalTools?:LessonLink[];materials?:LessonMaterial[]};

export const lessons:Lesson[]=[
{
  id:1,
  slug:"identity-and-belonging",
  title:"אני ישראלי – סיפור של זהות ושייכות",
  category:"זהות ושייכות",
  hook:"מה הופך אותנו לישראלים, ומה מחבר בין הסיפורים השונים שלנו?",
  description:"שיעור פתיחה המזמין את התלמידים לבחון את מרכיבי הזהות הישראלית, את תחושת השייכות ואת המפגש בין זהות אישית, משפחתית, יהודית, קהילתית ולאומית.",
  coverImage:"/lesson-identity.png",
  lessonUrl:"https://canva.link/rqsnk0igagzoq06",
  accentColor:"#20A6A2",
  teacherFiles:[],studentFiles:[],apps:[],videos:[],externalLinks:[],tags:["זהות","שייכות"],order:1,
  grade:"י׳",duration:"90 דקות",lessonType:"דיון ועבודה קבוצתית",
  objectiveCards:[
    {title:"ידע והבנה",text:"לזהות מרכיבים מגוונים בזהות היהודית והישראלית."},
    {title:"מיומנויות",text:"לנסח עמדה אישית ולהקשיב לקולות שונים."},
    {title:"ערכים וזהות",text:"לחזק שייכות, כבוד לריבוי וערבות הדדית."}
  ],
  prep:["מצגת פתוחה מראש","טלפונים או מחשבים לפי בחירה","עבודה בזוגות או בקבוצות קטנות","אין דפי הדפסה נדרשים"],
  steps:[
    {number:"01",title:"פתיחה",duration:"10 דק׳",description:"שאלת פתיחה: מה מרכיב את הזהות שלי?"},
    {number:"02",title:"מיפוי זהויות",duration:"20 דק׳",description:"התלמידים מזהים מעגלי זהות אישיים וקבוצתיים."},
    {number:"03",title:"שיח קבוצתי",duration:"25 דק׳",description:"השוואת נקודות מבט ודיון במשותף ובשונה."},
    {number:"04",title:"חיבור לישראליות",duration:"20 דק׳",description:"קישור בין זהות אישית לבין החברה הישראלית."},
    {number:"05",title:"סיכום",duration:"15 דק׳",description:"ניסוח תובנה אישית ומשימת יציאה."}
  ],
  discussionQuestions:["אילו מרכיבים בזהות שלנו אנו בוחרים ואילו קיבלנו?","האם אפשר להחזיק בכמה זהויות בו־זמנית?","מה יכול לחבר בין ישראלים שונים מאוד זה מזה?"]
},
{
  id:2,
  slug:"jewish-bookshelf",
  title:"ארון הספרים היהודי",
  category:"זהות, מסורת ותרבות",
  hook:"מהם הרעיונות הגדולים של חגי תשרי, וכיצד הם נוגעים בחיים שלנו היום?",
  description:"שיעור המזמין את התלמידים להכיר את ארון הספרים היהודי דרך הרעיונות והערכים של חגי תשרי, ולבחון את הרלוונטיות שלהם לזהות האישית, לחברה ולחיים בישראל.",
  coverImage:"/lesson-jewish-bookshelf.png",
  lessonUrl:"https://www.canva.com/design/DAHVGxK95HE/_PByzJnPbNrPO7-cD62Jyg/view?utm_content=DAHVGxK95HE&utm_campaign=designshare&utm_medium=link&utm_source=viewer",
  accentColor:"#6F8F78",
  teacherFiles:[],studentFiles:[],apps:[],videos:[],externalLinks:[],tags:["יהדות","חגי תשרי"],order:2,
  grade:"י׳",duration:"90 דקות",lessonType:"חקר ודיון",
  objectiveCards:[
    {title:"ידע והבנה",text:"להכיר רעיונות, טקסטים וסמלים מארון הספרים היהודי."},
    {title:"מיומנויות",text:"לקרוא מקור, לפרש ולחבר אותו לחיים העכשוויים."},
    {title:"ערכים וזהות",text:"לבחון מסורת כמרחב חי של משמעות."}
  ],
  prep:["מצגת פתוחה מראש","מחשב או טלפון לפי בחירה","עבודה בקבוצות","אפשר להכין דפי מקורות"],
  steps:[
    {number:"01",title:"פתיחה",duration:"10 דק׳",description:"מפגש עם חפצים וסמלים מחגי תשרי."},
    {number:"02",title:"מסע בין מקורות",duration:"25 דק׳",description:"היכרות עם טקסטים ורעיונות מרכזיים."},
    {number:"03",title:"חקר קבוצתי",duration:"25 דק׳",description:"כל קבוצה מעבדת מקור ושאלה."},
    {number:"04",title:"שיתוף ודיון",duration:"20 דק׳",description:"חיבור בין מסורת, זהות והחיים היום."},
    {number:"05",title:"סיכום",duration:"10 דק׳",description:"בחירת רעיון אחד שמבקשים לקחת הלאה."}
  ],
  discussionQuestions:["מה הופך טקסט ישן לרלוונטי גם היום?","האם מסורת מגבילה או מאפשרת?","איזה רעיון מחגי תשרי יכול להשפיע על החיים שלנו?"]
},
{
  id:3,
  slug:"tanks-and-courage",
  title:"מטנקי עמק הבכא לטנקיסטיות בחולית",
  category:"מורשת קרב ואחריות",
  hook:"מסיפורי הגבורה של מלחמת יום הכיפורים אל גבורת שבעה באוקטובר.",
  description:"מסע בין שני סיפורי לחימה מתקופות שונות, הבוחן אומץ, מנהיגות, אחריות אישית ורוח לחימה ברגעים שבהם יחידים וקבוצות נדרשו לפעול בתנאים קשים ולהגן על אחרים.",
  coverImage:"/lesson-tanks.png",
  lessonUrl:"https://canva.link/fr532x7l0msgdh2",
  accentColor:"#1D5573",
  teacherFiles:[],studentFiles:[],apps:[],videos:[],externalLinks:[],tags:["מורשת קרב","אחריות"],order:3,
  grade:"י׳",duration:"90 דקות",lessonType:"מורשת קרב ודיון",
  about:["השיעור מחבר בין שני סיפורי לחימה שהתרחשו בהפרש של חמישים שנה. במלחמת יום הכיפורים הוביל אביגדור קהלני את לוחמי גדוד 77 בקרבות הבלימה בעמק הבכא, מול כוח סורי גדול ובתנאים של נחיתות מספרית ואי־ודאות. בשבעה באוקטובר 2023 פעלו צוותי טנקיסטיות בגזרת הדרום במשך שעות מול מחבלים. צוות בפיקודה של קרני הגיע לקיבוץ חולית וסייע בהגנה על תושביו. דרך שני הסיפורים בוחנים התלמידים כיצד אומץ, מקצועיות, מנהיגות, יוזמה, רעות ועבודת צוות מאפשרים לפעול ברגעי הפתעה ומשבר."],
  objectiveCards:[
    {title:"ידע והבנה",text:"להכיר שני סיפורי לחימה מתקופות שונות."},
    {title:"מיומנויות",text:"לנתח החלטות שהתקבלו בתנאי סכנה ומידע חלקי."},
    {title:"ערכים וזהות",text:"לזהות ערכים משותפים לשני האירועים."},
    {title:"שיתוף פעולה",text:"לבחון את הקשר בין גבורה אישית לעבודת צוות."},
    {title:"חיבור אישי",text:"לחבר בין ערכי השיעור לחיי התלמידים."}
  ],
  prep:["מצגת פתוחה מראש","מקרן ורמקולים","טלפון או מחשב לכל קבוצה לצורך הסקר, הענן והמשחק","דף „מצפן אישי” מודפס לכל תלמיד"],
  steps:[
    {number:"01",title:"דילמת פתיחה",duration:"10 דק׳",description:"הצגת דילמה והצבעה בסקר כיתתי."},
    {number:"02",title:"עמק הבכא",duration:"15 דק׳",description:"צפייה ודיון בסיפור הקרב ומנהיגותו של אביגדור קהלני."},
    {number:"03",title:"הטנקיסטיות בחולית",duration:"15 דק׳",description:"צפייה ודיון בסיפור הצוות שפעל בגזרת הדרום."},
    {number:"04",title:"ענן ערכים",duration:"10 דק׳",description:"דירוג ערכים ויצירת ענן כיתתי משותף."},
    {number:"05",title:"השוואה ודיון",duration:"15 דק׳",description:"השוואה בין האירועים סביב ההפתעה ומוכנות הכוחות."},
    {number:"06",title:"מצפן אישי",duration:"15 דק׳",description:"התלמידים בונים מצפן אישי לקבלת החלטות."},
    {number:"07",title:"חדר הפיקוד",duration:"10 דק׳",description:"משחק ידע וסיום לזכר הנופלים."}
  ],
  discussionQuestions:["מה גורם לאדם לקבל אחריות ולפעול בשעת משבר?","כיצד השפיעו ההפתעה ומוכנות הכוחות על שני האירועים?","מהו מקומם של מקצועיות ועבודת צוות בתוך מעשה הגבורה?","איזה ערך משותף בולט במיוחד בשני הסיפורים?"],
  digitalTools:[
    {title:"סקר דילמת הפתיחה",description:"הצבעה כיתתית לפתיחת השיעור.",url:"https://live-hebrew-poll.baranat.chatgpt.site/",label:"פתיחת הסקר"},
    {title:"ענן ערכים כיתתי",description:"במסך הפתיחה בוחרים „פתיחת ענן ערכים”.",url:"https://live-hebrew-poll.baranat.chatgpt.site/",label:"פתיחת הענן"},
    {title:"חדר הפיקוד",description:"משחק הידע המסכם של השיעור.",url:"https://oz-under-fire-jeopardy.baranat.chatgpt.site/",label:"פתיחת המשחק"}
  ],
  materials:[
    {title:"מערך למורה",description:"מערך השיעור המלא למורה.",url:"/tanks-lesson-teacher-guide.pdf",label:"פתיחת ה־PDF"},
    {title:"דף מצפן אישי לתלמיד",description:"דף פעילות להדפסה לתלמידים.",url:"/tanks-personal-compass.pdf",label:"פתיחת הדף"}
  ]
},
{
  id:4,
  slug:"startup-nation",
  title:"אם מדינה הייתה סטארט־אפ",
  category:"חדשנות ישראלית",
  hook:"מה צריך כדי להפוך חזון של מדינה למציאות — גם כשלא הכול מוכן?",
  description:"שיעור חווייתי המזמין את התלמידים לחשוב על הקמת מדינה כמו על הקמת סטארט־אפ.",
  coverImage:"/lesson-startup.png",
  lessonUrl:"https://canva.link/vvtsj22nnwlc0ir",
  accentColor:"#63B8A7",
  teacherFiles:[],studentFiles:[],apps:[],videos:[],externalLinks:[],tags:["חדשנות","יזמות"],order:4,
  grade:"י׳",duration:"90 דקות",lessonType:"משחק ויזמות",
  about:["שיעור חווייתי המזמין את התלמידים לחשוב על הקמת מדינה כמו על הקמת סטארט־אפ: אילו משאבים דרושים, במה משקיעים קודם ומה עושים כשלא הכול מוכן.","דרך הפעילות של „קהילת אופק” עוברים התלמידים אל המציאות של היישוב היהודי ערב הקמת המדינה, בוחנים את מידת המוכנות להקמת מדינה ומתמודדים עם השאלה שהייתה ממשית במאי 1948: להכריז עכשיו או להמתין?"],
  objectives:["להבין מהם המרכיבים הדרושים להקמת מדינה.","לתרגל תעדוף משאבים, מסחר וקבלת החלטות.","לבחון את מידת המוכנות של היישוב היהודי ערב הקמת המדינה.","לדון בשאלה האם נכון לפעול גם כאשר לא כל התנאים מושלמים."],
  steps:[
    {number:"01",title:"אם מדינה הייתה סטארט־אפ",description:"פתיחה: מה צריך כדי להקים מדינה?"},
    {number:"02",title:"קהילת אופק מקימה מדינה",description:"פעילות קבוצתית של חלוקת תקציב, רכישת משאבים ומסחר בין הקבוצות."},
    {number:"03",title:"האם ישראל הייתה מוכנה להקמה?",description:"בחינת שמונה תחומים מרכזיים ערב הקמת המדינה:",topics:["שטח","אוכלוסייה","הנהגה","מוסדות","ביטחון","הכרה בין־לאומית","משאבים כלכליים","חינוך"]},
    {number:"04",title:"להכריז או להמתין?",description:"סקר כיתתי ודיון סביב ההחלטה להכריז על הקמת מדינת ישראל במאי 1948."},
    {number:"05",title:"סיכום",description:"מה אפשר ללמוד מהקמת המדינה על חזון, סיכון וקבלת החלטות?"}
  ],
  discussionQuestions:["האם מדינה חייבת להיות מוכנה בכל התחומים לפני שמכריזים עליה?","מה היה התחום החזק ביותר ומה היה הסיכון הגדול ביותר ערב הקמת המדינה?","מתי נכון לקחת סיכון כדי להפוך חזון למציאות?"],
  digitalTools:[
    {title:"סקר כיתתי",description:"להכריז על המדינה במאי 1948 או להמתין?",url:"https://may-1948-class-poll.baranat.chatgpt.site/?poll=bc267c9e-287b-4cd3-8a18-fc7b61750f76&results=1&created=1",label:"לפתיחת הסקר"},
    {title:"מי רוצה להקים מדינה?",description:"משחק כיתתי מסכם בנושא הקמת המדינה.",url:"https://how-israel-was-born-quiz.baranat.chatgpt.site/",label:"לפתיחת המשחק"}
  ],
  materials:[
    {title:"דפי פעילות להדפסה",description:"דפי הפעילות של „קהילת אופק” המלווים את הפעילות הקבוצתית בשיעור.",url:"/דפי פעילות להדפסה מדינה סטרט אפ.pdf",label:"לפתיחת דפי הפעילות"},
    {title:"מצגת השיעור",description:"„אם מדינה הייתה סטארט־אפ”",url:"https://canva.link/vvtsj22nnwlc0ir",label:"לצפייה במצגת"}
  ]
},
{
  id:5,
  slug:"brothers-and-disputes",
  title:"כשאחים שוכחים – מחלוקות בעם",
  category:"מחלוקת והבית המשותף",
  hook:"איך מנהלים מחלוקת קשה מבלי לפרק את הבית המשותף?",
  description:"שיעור העוסק במחלוקות מכוננות בתולדות העם והמדינה ובוחן את הרגע שבו ויכוח רעיוני הופך לשבר, לצד האחריות לעצור, להציב גבולות ולשמור על החברה המשותפת.",
  coverImage:"/lesson-disputes.png",
  lessonUrl:"https://canva.link/pi6to8w9vrnfrro",
  accentColor:"#647985",
  teacherFiles:[],studentFiles:[],apps:[],videos:[],externalLinks:[],tags:["מחלוקת","אחריות"],order:5,
  grade:"י׳",duration:"90 דקות",lessonType:"דילמות ודיון",
  objectiveCards:[
    {title:"ידע והבנה",text:"להכיר מחלוקות מכוננות בתולדות העם והמדינה."},
    {title:"מיומנויות",text:"לזהות טיעונים, להקשיב ולנהל מחלוקת."},
    {title:"ערכים וזהות",text:"לטפח אחריות לבית המשותף."}
  ],
  prep:["מצגת פתוחה מראש","טלפונים לסקר או פעילות דיגיטלית","עבודה בקבוצות","מומלץ להכין דפי חברותא"],
  steps:[
    {number:"01",title:"פתיחה",duration:"10 דק׳",description:"דילמה קצרה על מחלוקת בחברה."},
    {number:"02",title:"מפגש עם סיפורים",duration:"25 דק׳",description:"היכרות עם מחלוקות מתקופות שונות."},
    {number:"03",title:"עבודה קבוצתית",duration:"25 דק׳",description:"ניתוח נקודת שבר ובחירת כלל פעולה."},
    {number:"04",title:"שיח כיתתי",duration:"20 דק׳",description:"הצגת כללים וניהול מחלוקת מכבדת."},
    {number:"05",title:"סיכום",duration:"10 דק׳",description:"חיבור לבית המשותף של היום."}
  ],
  discussionQuestions:["מתי מחלוקת הופכת מסכנת הבית המשותף?","מהי האחריות של כל צד בזמן ויכוח קשה?","אילו כללים יכולים לעזור לנו לנהל מחלוקת בכיתה ובחברה?"]
}
];
