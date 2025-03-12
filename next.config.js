/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    // Load shadcn/ui components from the components directory
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/components': require('path').resolve('./components'),
      '@/lib': require('path').resolve('./lib'),
    };
    return config;
  },
}

module.exports = nextConfig
