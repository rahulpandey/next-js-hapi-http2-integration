const withTypescript = require('@zeit/next-typescript');
module.exports = withTypescript({
  webpack(config, { dev }) {
    return config;
  },
});
