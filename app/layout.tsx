import type { Metadata } from "next";
import "./globals.css";
import "./design-system.css";
import { HomeThemeShell } from "./home-theme-shell";

const productionUrl = "https://ani-yisraeli-makif-z.vercel.app";
const shareImageUrl = `${productionUrl}/api/og?v=8`;

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
  title: "אני ישראלי",
  description: "תוכנית השכלה כללית לשכבה י׳ | זהות, שייכות, מורשת והסיפור הישראלי | מקיף ז׳ אשדוד.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "אני ישראלי",
    title: "אני ישראלי | מקיף ז׳ אשדוד",
    description: "תוכנית השכלה כללית לשכבה י׳ — זהות, שייכות, מורשת והסיפור הישראלי.",
    url: productionUrl,
    images: [
      {
        url: shareImageUrl,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "אני ישראלי — תוכנית השכלה כללית, מקיף ז׳ אשדוד",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "אני ישראלי | מקיף ז׳ אשדוד",
    description: "תוכנית השכלה כללית לשכבה י׳ — זהות, שייכות, מורשת והסיפור הישראלי.",
    images: [shareImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className="antialiased">
        <HomeThemeShell>{children}</HomeThemeShell>
        <style>{`
          .time-tunnel-teacher .tt-hero-copy > p{font-size:0!important}
          .time-tunnel-teacher .tt-hero-copy > p::before{content:"שיעור פתיחה | למידה במרחב";font-size:.9rem}
          .hero-shade,
          .program-about-shade,
          .museum-space-shade,
          .tt-hero-shade{
            background:
              linear-gradient(90deg,rgba(22,22,22,.82) 0%,rgba(42,42,42,.50) 52%,rgba(58,58,58,.15) 100%),
              linear-gradient(0deg,rgba(20,20,20,.54) 0%,transparent 66%)!important;
          }
          @media (min-width:701px){
            .hero-content{
              right:clamp(24px,3.2vw,56px)!important;
              top:59%!important;
              transform:translateY(-50%)!important;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
