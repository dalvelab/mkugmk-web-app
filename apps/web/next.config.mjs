/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin-mkugmk.memflash.ru'
      }
    ]
  }
};

export default nextConfig;
