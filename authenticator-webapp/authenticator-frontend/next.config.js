const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // Disable 'fs' for browser
      stream: require.resolve("stream-browserify"), // Add polyfill for 'stream'
      zlib: require.resolve("browserify-zlib"), // Add polyfill for 'zlib'
    };

    return config;
  },
};
