/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'id',
            value: '(?<id>.*)',
          },
        ],
        destination: '/card/:id',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;