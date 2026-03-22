import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable strict mode for better React practices
  reactStrictMode: true,

  // Configure domains for Next.js Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      // TODO: Add your production Strapi domain
      // {
      //   protocol: 'https',
      //   hostname: 'your-strapi-domain.com',
      //   pathname: '/uploads/**',
      // },
    ],
  },

  // Logging for debugging in development
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
