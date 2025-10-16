import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import Dotenv from "dotenv-webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/js/index.js",  
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.json$/,
        type: "json",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.s[ac]ss$/i, // match .scss or .sass
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  experiments: {
    topLevelAwait: true,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // <--- your source template
      filename: "index.html", // <--- output in dist/
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/images", to: "images" }, // copy images folder
        // { from: "./public/assets", to: "assets",noErrorOnMissing: true  },
      ],
    }),
    
  ],
  devServer: {
    static: "./dist",
    open: true,
    hot: true,
    port: 3000,
  },
};
