import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: isDev, 
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
      {
        source: "/research",
        destination: "/solutions/research",
        permanent: true,
      },
      {
        source: "/life-sciences",
        destination: "/solutions/life-sciences",
        permanent: true,
      },
      {
        source: "/virtual-care",
        destination: "/solutions/virtual-care",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
