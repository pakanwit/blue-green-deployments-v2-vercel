/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  assetPrefix: process.env.BASE_URL
    ? `https://${process.env.BASE_URL}`
    : undefined,
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  env: {
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  i18n,
  sentry: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images-static.trustpilot.com",
      },
      {
        protocol: "https",
        hostname: "user-images.trustpilot.com",
      },
    ],
  },
};

const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  // Suppresses source map uploading logs during build
  silent: true,
  org: "15minuteplanai",
  project: "15minuteplanai",
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
