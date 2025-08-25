const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        process: require.resolve("process/browser"),
        buffer: require.resolve("buffer/"), // 👈 with slash
        stream: require.resolve("stream-browserify"),
        url: require.resolve("url/"),
      };

      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        buffer: require.resolve("buffer/"),
        process: "process/browser",
      };

      // ✅ add plugin here
      webpackConfig.plugins.push(new NodePolyfillPlugin());

      return webpackConfig;
    },
  },
};