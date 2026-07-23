import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon: a single accent node on the dark field — the topology motif,
 *  reduced to one glyph. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0A0A",
          borderRadius: 7,
          color: "#4F8CFF",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        D
      </div>
    ),
    { ...size },
  );
}
