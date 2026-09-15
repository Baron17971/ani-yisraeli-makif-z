export default function Template({children}:{children:React.ReactNode}){
  return <div className="route-transition">{children}<style>{`
    .route-transition{animation:routeEnter .24s ease-out both}
    @keyframes routeEnter{from{opacity:.72;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}
    @media(prefers-reduced-motion:reduce){.route-transition{animation:none}}
  `}</style></div>;
}
