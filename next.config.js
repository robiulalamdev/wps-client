/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  // disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  disable: false,
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "api.thewallpapersociety.com",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  swcMinify: true,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withPWA(nextConfig);
