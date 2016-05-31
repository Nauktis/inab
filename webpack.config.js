var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: debug ? "inline-sourcemap" : null,
  entry: {
    app: ["./src/app.js"]
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "app.min.js"
  },

  plugins: debug ? [new ExtractTextPlugin('style.css', {allChunks: true})] : [
    new ExtractTextPlugin('style.css', {allChunks: true}),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
};
