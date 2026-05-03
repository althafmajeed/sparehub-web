import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Dev-only: allow `/_next/*` resources when the app is opened from embedded
   * browsers, port forwards, or webview-style previews (e.g. Cursor Simple Browser).
   * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
   */
  allowedDevOrigins: [
    "*.cursor.app",
    "*.cursor.sh",
    "*.github.dev",
    "*.vercel.app",
  ],
};

export default nextConfig;
