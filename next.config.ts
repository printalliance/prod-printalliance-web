import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactStrictMode: true,
// };



const nextConfig = {
  images: {
        dangerouslyAllowLocalIP: true,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**', // Allows all paths from this host
      },
      {
        protocol: 'https',
        hostname: 'printersclan.com',
        port: '',
        pathname: '/asset/images/**',
      },
    ],
  },
}
export default nextConfig;
