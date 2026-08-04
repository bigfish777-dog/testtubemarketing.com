import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Host-scoped: the paid traffic subdomain serves its page at its own root.
  // Scoped by host so www and the apex are completely unaffected.
  async rewrites() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "paidtraffic.testtubemarketing.com" }],
        destination: "/paid-traffic",
      },
    ];
  },
};

export default nextConfig;
