import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  typescript: {
     ignoreBuildErrors: true,
  },
 pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: process.env.GRAPHQL_API_URL || 'https://rindixer-example-production.up.railway.app/graphql'
      },
    ];
  },
};

export default nextConfig;
