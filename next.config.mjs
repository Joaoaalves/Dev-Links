/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"] 
  },
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true
    };
    return config;
  },
};

export default nextConfig;
