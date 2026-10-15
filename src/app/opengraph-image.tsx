import { ImageResponse } from "next/og";
import { logoSvg } from "@/components/Logo";

const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg()).toString("base64")}`;

export const alt = "Origami Hub — Coworking, sala de reunião e sala grande em Formiga (MG)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 72,
          fontFamily: "sans-serif",
          background: "radial-gradient(circle at 80% 40%, rgba(46,232,168,0.18), transparent 55%), #04070e",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 26, color: "#c3d0de", letterSpacing: 5, textTransform: "uppercase" }}>
            Coworking · Formiga · MG
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 104, fontWeight: 800, color: "#ffffff", lineHeight: 1, letterSpacing: -3 }}>
              origami<span style={{ color: "#2ee8a8", fontSize: 64, fontWeight: 500, marginTop: 36 }}>.hub</span>
            </div>
            <div style={{ fontSize: 38, color: "#a9b8ca", marginTop: 28, maxWidth: 640, lineHeight: 1.25 }}>
              Coworking, sala de reunião e sala para treinamentos no Centro
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#2ee8a8" }}>cowork.origamilab.com.br</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUri} width={400} height={287} alt="" style={{ alignSelf: "center" }} />
      </div>
    ),
    size,
  );
}
