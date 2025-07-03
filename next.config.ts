import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "unsplash.com",
      "m.media-amazon.com",
      "rukminim2.flixcart.com",
      "assets.ajio.com",
      "assets.myntassets.com",
      "assets.sheinindia.in",
    ],
  },
  webpack(config) {
    config.resolve.alias["@" as string] = path.resolve(__dirname, "src");
    return config;
  },
};

export default nextConfig;
