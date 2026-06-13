import type { NextConfig } from "next";

// When deploying to GitHub Pages the site is served from a sub-path
// (https://<user>.github.io/<repo>). We toggle static export + basePath
// only in that CI build via the GITHUB_PAGES env var so local dev stays clean.
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repo = "Testingg";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
      }
    : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
