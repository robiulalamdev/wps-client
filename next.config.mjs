/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: "api.thewallpapersociety.com" }],
  },
};

export default nextConfig;
