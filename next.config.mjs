/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true } // next/image optimization needs a server
}

export default nextConfig
