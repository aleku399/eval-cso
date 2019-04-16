const path = require("path");
const webpack = require("webpack")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = ({config, _mode}) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [require.resolve("babel-preset-react-app")],
    },
  });

  config.resolve.extensions.push(".ts", ".tsx");

  config.resolve.alias = {
    ...config.resolve.alias || {},

    "components": path.join(__dirname, "../src/components"),
  };


  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      async: false,
      checkSyntacticErrors: true,
      formatter: require("react-dev-utils/typescriptFormatter"),
    })
  );

  config.plugins.push(
    new webpack.EnvironmentPlugin({
      API: "http://212.71.238.164:8888/api/",
      DEBUG: false,
      NODE_ENV: "development",
      STORYBOOK: true,
    })
  )

  return config
}
