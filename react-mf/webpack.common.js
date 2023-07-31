const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");

module.exports = {
    target: "web",
    resolve: {
        plugins: [
            new TsconfigPathsPlugin({
                baseUrl: "src"
            })
        ],
        alias: {
            components: path.resolve(__dirname, "components")
        },
        extensions: [".*", ".js", ".jsx", ".scss", ".ts", ".tsx"]
    },
    entry: {
        app: "./src/index.ts"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Dotenv({
            path: `./.${process.env.NODE_ENV}.env`
        }),
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
            React: "react"
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new ModuleFederationPlugin({
            name: "ReactApp", // app name
            remotes: {
                VueApp: "VueApp@http://localhost:3000/remoteEntry.js" //remote app name: remote app name@.../remote app output file
            },
            shared: {
                ...dependencies
            }
        })
    ],

    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.s[a|c]ss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|jpeg|woff|woff2|eot|ttf|svg|ico|pdf)$/,
                loader: "url-loader",
                options: {
                    limit: 100000
                }
            }
        ]
    }
};
