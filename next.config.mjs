/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';

const nextConfig = {
  distDir: isDev ? '.next-dev' : '.next',
  output: isDev ? undefined : 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
