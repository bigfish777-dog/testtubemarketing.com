import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Host-scoped: the audit subdomain serves the application page at its root.
  // Scoped by host so www and the apex are completely unaffected.
  async rewrites() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "audit.testtubemarketing.com" }],
        destination: "/ai-audit",
      },
    ];
  },
};

export default nextConfig;
