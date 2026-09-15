import { RouteScroll } from "./route-scroll";
import { RouteTransition } from "./route-transition";

export default function Template({children}:{children:React.ReactNode}){
  return <RouteTransition><RouteScroll/>{children}</RouteTransition>;
}
