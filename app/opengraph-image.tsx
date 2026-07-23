import { ImageResponse } from "next/og";
import { SITE } from "@/constants/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card. Same palette and hierarchy as the hero, so a link preview
 *  looks like the page it opens. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#4F8CFF",
            }}
          />
          <div
            style={{
              color: "#6B7280",
              fontSize: 20,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            B.Tech Cloud Computing · SRM Chennai
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 128,
              fontWeight: 700,
              letterSpacing: -5,
              lineHeight: 1,
            }}
          >
            DIVYESH
          </div>
          <div
            style={{
              color: "#6B7280",
              fontSize: 128,
              fontWeight: 700,
              letterSpacing: -5,
              lineHeight: 1,
            }}
          >
            KOLLI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <div style={{ color: "#9CA3AF", fontSize: 26 }}>
            Full Stack Developer · AI Enthusiast · Builder
          </div>
          <div style={{ color: "#4F8CFF", fontSize: 24 }}>@divyesh8</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
