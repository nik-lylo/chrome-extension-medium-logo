const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    popup: "./src/popup/index.tsx",
    background: "./src/background/background.ts",
    foreground: "./src/foreground/foreground.ts",
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.css?$/, use: ["style-loader", "css-loader"] },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      filename: "./popup.html",
      chunks: ["popup"],
      template: "src/popup/index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/foreground/foreground.css" },
        { from: "./src/manifest.json" },
        { from: "./src/icons" },
        { from: "./src/image" },
      ],
    }),
  ],
  output: { filename: "[name].js", path: path.resolve(__dirname, "dist") }, // chrome will look for files under dist/* folder
};
