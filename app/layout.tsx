import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
