import { RouteScroll } from "./route-scroll";

export default function Template({children}:{children:React.ReactNode}){
  return <div className="route-transition"><RouteScroll/>{children}<style>{`
    .route-transition{animation:routeEnter .34s ease-in-out both;will-change:opacity}
    @keyframes routeEnter{from{opacity:.72}to{opacity:1}}
    @media(prefers-reduced-motion:reduce){.route-transition{animation:none}}
  `}</style></div>;
}
