import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Zoom room links for Fish and Adam. These replace the Bitly shortlinks
      // rather than forwarding to them, so this file is now the single place a
      // room gets repointed: changing one is an edit here, a PR and a deploy.
      //
      // Temporary, never permanent. A permanent redirect is cached hard by the
      // browser, so anyone who had already followed one would keep being sent
      // to the old room long after it was changed here.
      {
        source: "/zoom-fish",
        destination: "https://us05web.zoom.us/j/8792020476",
        permanent: false,
      },
      {
        source: "/zoom-ad",
        destination: "https://us02web.zoom.us/j/8174060180",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
