import { RouteScroll } from "./route-scroll";

export default function Template({children}:{children:React.ReactNode}){
  return <div className="route-transition"><RouteScroll/>{children}<style>{`
    .route-transition{animation:routeEnter .18s ease-out both;will-change:opacity}
    @keyframes routeEnter{from{opacity:.84}to{opacity:1}}
    @media(prefers-reduced-motion:reduce){.route-transition{animation:none}}
  `}</style></div>;
}
