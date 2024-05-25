// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['image.tmdb.org',]
//     },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'image.tmdb.org',
          pathname: '**',
        },
      ],
    },
  };
  export default nextConfig;
