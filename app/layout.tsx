import type { Metadata } from "next";
import "./globals.css";
import "./design-system.css";
import { HomeThemeShell } from "./home-theme-shell";

export const metadata: Metadata = {
  title: "אני ישראלי | תוכנית השכלה כללית",
  description: "ספריית השיעורים של תוכנית אני ישראלי, צוות מעו״ף, מקיף ז׳ אשדוד.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
        `}</style>
      </body>
    </html>
  );
}
