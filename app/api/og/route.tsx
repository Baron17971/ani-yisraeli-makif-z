import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  const heroUrl = "https://ani-yisraeli-makif-z.vercel.app/hero-slide-1.png";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#222",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <img
          src={heroUrl}
          alt=""
          width="1200"
          height="630"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(20,20,20,.82) 0%, rgba(35,35,35,.45) 52%, rgba(45,45,45,.10) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 72,
            bottom: 64,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            textAlign: "right",
            maxWidth: 700,
          }}
        >
          <div style={{ fontSize: 30, opacity: 0.9, marginBottom: 10 }}>
            תוכנית השכלה כללית | שכבה י׳ | מקיף ז׳ אשדוד
          </div>
          <div style={{ fontSize: 82, fontWeight: 800, lineHeight: 1 }}>
            אני ישראלי
          </div>
          <div style={{ fontSize: 34, marginTop: 16, opacity: 0.95 }}>
            זהות • שייכות • מורשת • הסיפור הישראלי
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
