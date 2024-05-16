/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    domains: ["res.cloudinary.com"],
  },
  target: 'serverless'
};

export default nextConfig;
