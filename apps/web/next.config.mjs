/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin-mkugmk.memflash.ru'
      },
      {
        protocol: 'https',
        hostname: 'mkugmk-notifications.ru'
      }
    ]
  },
  i18n: {
    defaultLocale: 'ru',
    locales: ['en', 'ru'],
  },
};

export default nextConfig;