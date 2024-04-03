/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // React beautiful dnd 사용을 위해
  experimental: {
    serverActions: true
  }
};

export default nextConfig;
