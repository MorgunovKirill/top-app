/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['courses-top.ru']
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test:/\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: ['@svgr/webpack'],
    })
    return config;
  }
}

module.exports = nextConfig
