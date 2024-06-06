/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_HOSTNAME,
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/kupit-bilet/:path",
        destination: "/buy-ticket",
        permanent: true,
      },
      {
        source: "/pushkinskaya-karta",
        destination: "/buy-ticket",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path",
        destination: `${process.env.NEXT_PUBLIC_API_HOST}/uploads/:path`,
      },
      {
        source: "/api/meilisearch",
        destination: `${process.env.NEXT_PUBLIC_MEILISEARCH_HOST}/multi-search`,
      },
      {
        source: "/api/:path",
        destination: `${process.env.NEXT_PUBLIC_API_HOST}/api/:path`,
      },
    ];
  },
  i18n: {
    defaultLocale: "ru",
    locales: ["en", "ru"],
  },
};

export default nextConfig;
