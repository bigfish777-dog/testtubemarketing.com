import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Host-scoped: the paid traffic subdomain serves its page at its own root.
  // Scoped by host so www and the apex are completely unaffected.
  //
  // beforeFiles matters. A bare array is treated as afterFiles, which runs only
  // once the filesystem routes have been checked, so the existing "/" page wins
  // and the rewrite never fires.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "paidtraffic.testtubemarketing.com" }],
          destination: "/paid-traffic",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
