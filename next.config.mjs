/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.BASE_URL
    ? `https://${process.env.BASE_URL}`
    : undefined,
};

export default nextConfig;
