const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");

module.exports = {
  mode: "development",
  // The application entry point
  entry: "./src/index.js",

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "bundle.js",
  },
  devServer: {
    port: 3000,
    devMiddleware: {
      stats: "minimal",
    },
    compress: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "VueApp", //app name
      filename: "remoteEntry.js", //output file name
      exposes: {
        "./App": "./src/bootstrap.js", //exported module name "./App"
      },
      shared: {
        ...dependencies, // some other dependencies
      },
    }),
  ],
};
