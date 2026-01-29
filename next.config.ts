import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true, // ✅ разрешить 127.0.0.1 / локалку (только для dev)
    remotePatterns: [
      { protocol: "https", hostname: "*.strapiapp.com" },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
      {
        source: "/publication/:slug",
        destination: "/publications/:slug",
        permanent: true, // 308 (аналог 301 для методов, SEO ок)
      },
      // если были хвосты типа /resource/slug/:
      {
        source: "/publication/:slug/",
        destination: "/publications/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
