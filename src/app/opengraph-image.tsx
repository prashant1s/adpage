import { ImageResponse } from "next/og";

export const alt =
  "Whizoid Studio — Stuck at 1.5x ROAS on Meta ads? Book a free 30-minute strategy call.";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(ellipse 90% 70% at 80% 10%, #1e3a8a 0%, transparent 60%), radial-gradient(ellipse 70% 60% at 10% 95%, #3b1d6e 0%, transparent 60%), #07070b",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            fontWeight: 700,
            color: "#93c5fd",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#3b82f6",
            }}
          />
          Whizoid Studio
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Spending lakhs on Meta ads.
          </div>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              color: "#fb7185",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Still stuck at 1.5x ROAS?
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              color: "#a3a3a3",
              lineHeight: 1.35,
            }}
          >
            For D2C brands spending ₹1–3L a month.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              background: "#2563eb",
              color: "#ffffff",
              fontWeight: 700,
              padding: "18px 34px",
              borderRadius: 14,
            }}
          >
            Book my free strategy call →
          </div>
          <div style={{ display: "flex", color: "#737373" }}>
            Free 30-min call · No pitch
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
