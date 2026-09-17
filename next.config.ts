import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/maps/:path*", destination: "/oss-games/claude-of-tanks/maps/:path*" },
      { source: "/minimaps/:path*", destination: "/oss-games/claude-of-tanks/minimaps/:path*" },
      { source: "/icons/:path*", destination: "/oss-games/claude-of-tanks/icons/:path*" },
      { source: "/fx/:path*", destination: "/oss-games/claude-of-tanks/fx/:path*" },
      { source: "/audio/:path*", destination: "/oss-games/claude-of-tanks/audio/:path*" },
      { source: "/fonts/:path*", destination: "/oss-games/claude-of-tanks/fonts/:path*" },
    ];
  },
};

export default nextConfig;
