import type { NextConfig } from "next";

// IPv4 hostnames are 4 dot-labels (e.g. 192.168.0.249); each * matches one label.
const PRIVATE_DEV_ORIGINS = [
  "192.168.*.*",
  "10.*.*.*",
  "172.16.*.*",
  "172.17.*.*",
  "172.18.*.*",
  "172.19.*.*",
  "172.20.*.*",
  "172.21.*.*",
  "172.22.*.*",
  "172.23.*.*",
  "172.24.*.*",
  "172.25.*.*",
  "172.26.*.*",
  "172.27.*.*",
  "172.28.*.*",
  "172.29.*.*",
  "172.30.*.*",
  "172.31.*.*",
] as const;

function getAllowedDevOrigins(): string[] {
  const extra =
    process.env.ALLOWED_DEV_ORIGINS?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? [];
  return [...PRIVATE_DEV_ORIGINS, ...extra];
}

const nextConfig: NextConfig = {
  output: "export",
  basePath:
    process.env.NODE_ENV === "production" ? "/hackathon-app-m1" : "",
  images: { unoptimized: true },
  reactCompiler: true,
  allowedDevOrigins: getAllowedDevOrigins(),
};

export default nextConfig;
