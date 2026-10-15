import type { NextConfig } from "next";

const CANONICAL_HOST = "cowork.origamilab.com.br";
const env = process.env.VERCEL_ENV; // "production" | "preview" | "development" | undefined (local)

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...securityHeaders,
          // Previews da Vercel nunca entram no índice (a produção não recebe este header).
          ...(env && env !== "production" ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
        ],
      },
    ];
  },
  async redirects() {
    if (env !== "production") return [];
    // Em produção, qualquer host *.vercel.app redireciona (308) para a origem canônica.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<host>.*\\.vercel\\.app)" }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
