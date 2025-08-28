/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "covers.openlibrary.org",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "images.unsplash.com",
      "via.placeholder.com",
    ],
  },
  experimental: {
    optimizePackageImports: ["@heroicons/react"],
  },
};

module.exports = nextConfig;
