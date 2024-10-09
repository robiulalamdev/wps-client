import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const withPWA = nextPWA({
  dest: "public",
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
};

export default withPWA(nextConfig);
