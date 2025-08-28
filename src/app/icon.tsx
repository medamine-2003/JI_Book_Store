// src/app/icon.tsx
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "linear-gradient(90deg, #dc2626 0%, #b91c1c 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "6px",
        }}
      >
        📚
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}

// Apple Icon
// src/app/apple-icon.tsx
export const appleSize = {
  width: 180,
  height: 180,
};

export function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background:
            "linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #7f1d1d 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          📚
          <div style={{ fontSize: 24, marginTop: 8, fontWeight: "bold" }}>
            BS
          </div>
        </div>
      </div>
    ),
    appleSize
  );
}
