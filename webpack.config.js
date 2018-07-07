/*
    ./webpack.config.js
*/
const path = require("path");
const webpack = require("webpack");
const Uglify = require("uglifyjs-webpack-plugin");

function Config(env) {
  let plugins = [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV":
        env === "production"
          ? JSON.stringify("production")
          : JSON.stringify("development"),
    }),
  ];
  if (env === "production") {
    plugins.push(
      new Uglify({
        uglifyOptions: {
          ecma: 5,
          output: {
            comments: false,
          },
          compress: true,
        },
      })
    );
  }

  return {
    entry: {
      main: "app.js",
    },
    output: {
      path: path.resolve("build"),
      filename: "[name]-bundle.min.js",
    },
    resolve: {
      modules: [path.resolve("./src/"), path.resolve("./node_modules")],
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          query: {
            presets: ["es2015-ie"],
          },
        },
        {
          test: /\.scss$/,
          loader: "style-loader!css-loader!postcss-loader!sass-loader",
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader!postcss-loader!sass-loader",
        },
      ],
    },
    plugins,
    watch: false,
  };
}
module.exports = Config;
