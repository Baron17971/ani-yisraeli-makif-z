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
        `}</style>
      </body>
    </html>
  );
}
