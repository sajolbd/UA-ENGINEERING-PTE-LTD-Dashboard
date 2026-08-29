/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'ua-engineering-pte-ltd-backend.vercel.app', port: '' },
      { protocol: 'https', hostname: 'www.uaengineering.com.sg', port: '' },
      { protocol: 'https', hostname: 'uaengineering.com.sg', port: '' },
      { protocol: 'https', hostname: 'dashboard.uaengineering.com.sg', port: '' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
