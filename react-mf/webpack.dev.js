const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        devMiddleware: {
            stats: "minimal"
        },
        port: 4321,
        compress: true
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/"
    }
});
