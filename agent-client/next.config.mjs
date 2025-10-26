/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https', // Or 'http' if necessary, but HTTPS is recommended
            hostname: 'res.cloudinary.com', // The hostname of your image server
          },
          {
            protocol: 'https', // Or 'http' if necessary, but HTTPS is recommended
            hostname: 'lh3.googleusercontent.com', // The hostname of your image server
          },
        ],
      },
};

export default nextConfig;
