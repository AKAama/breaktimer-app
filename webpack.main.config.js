const path = require("path");

module.exports = {
  mode: "production",
  entry: "./app/main/index.ts",
  target: "electron-main",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      "@shared": path.resolve(__dirname, "app/shared"),
    },
  },
  output: {
    filename: "main.prod.js",
    path: path.resolve(__dirname, "app/main/dist"),
  },
};
