/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_HOSTNAME
      }
    ]
  },
  async rewrites() {
    const media = {
      source: '/uploads/:path',
      destination: `${process.env.NEXT_PUBLIC_API_HOST}/uploads/:path`,
    };
    
    return process.env.NODE_ENV === 'development' ? [
      media,
      {
        source: '/api/:path',
        destination: `${process.env.NEXT_PUBLIC_API_HOST}/api/:path`,
      },
    ]: 
    [media]
  },
  i18n: {
    defaultLocale: 'ru',
    locales: ['en', 'ru'],
  },
};

export default nextConfig;