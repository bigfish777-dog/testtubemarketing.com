import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Zoom room links for Fish and Adam.
      //
      // These hop through Bitly on purpose rather than pointing straight at the
      // Zoom URLs. Bitly is where the rooms actually get repointed, so a change
      // of room never needs a redeploy of this site.
      //
      // Temporary, never permanent. A permanent redirect is cached hard by the
      // browser, so anyone who had already followed the old one would keep going
      // there long after the slug was changed.
      {
        source: "/zoom-fish",
        destination: "https://bit.ly/ttm-scale",
        permanent: false,
      },
      {
        source: "/zoom-ad",
        destination: "https://bit.ly/ttm-zoom",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
