const path = require("path");
const webpack = require("webpack");
const withPlugins = require("next-compose-plugins");
const typescript = require("@zeit/next-typescript");
const css = require("@zeit/next-css");
const images = require("next-images");

const ROOT_DIR = path.resolve(__dirname, "./");
const NODE_MODULES_DIR = path.resolve(__dirname, "../node_modules");

const config = {

  webpack(nextConfig, {isServer}) {

    nextConfig.resolve.alias = {
      ...nextConfig.resolve.alias || {},

      "src": path.resolve(__dirname, "./src"),
    };

    const assetPrefix = nextConfig.assetPrefix || "";
    const limit = nextConfig.inlineImageLimit || 8192;

    nextConfig.module.rules.push(
      {
        test: /\.(woff|eot|ttf|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              fallback: "file-loader",
              limit,
              name: "[name]-[hash].[ext]",
              outputPath: `${isServer ? "../" : ""}static/images/`,
              publicPath: `${assetPrefix}/_next/static/images/`,
            },
          },
        ],
      },
    );

    nextConfig.plugins.push(
      new webpack.EnvironmentPlugin({
        API: "http://localhost:8000/api/",
        DEBUG: false,
        NODE_ENV: "development",
        STORYBOOK: false,
      })
    )

    return nextConfig;
  },

};

module.exports = withPlugins([

  [typescript],

  [css],

  [images],

], config);
