// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'https://m.media-amazon.com' }]
  }
};

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: 'src/config/envs/.env.development' });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: 'src/config/envs/.env.test' });
} else {
  dotenv.config({ path: 'src/config/envs/.env.production' });
}

module.exports = nextConfig;
