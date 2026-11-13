import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        // Cover images uploaded in the WordPress CMS
        protocol: "https",
        hostname: "cms.mahdiroozbahani.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
