import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
<<<<<<< HEAD

  typescript: {
     ignoreBuildErrors: true,
  },
=======
>>>>>>> refs/remotes/origin/main
 pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  async rewrites() {
    return [
      {
        source: '/api/graphql',
        destination: process.env.GRAPHQL_API_URL || 'http://localhost:3001/graphql'
      },
    ];
  },
};

export default nextConfig;
