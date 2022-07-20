const path = require("path");
const webpack = require("webpack");
const webpackNodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    server: "./server/app.js",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.CONNECT_MONGODB": JSON.stringify(
        "mongodb+srv://tititiabcd:Long1511@store.p7beb.mongodb.net/Store?retryWrites=true&w=majority"
      ),
      "process.env.API_KEY": JSON.stringify(
        "AIzaSyBdUFPv9ml-xZJaC9qFfNsiZr3HRmbQjEI"
      ),
      "process.env.AUTH_DOMAIN": JSON.stringify("store-9959d.firebaseapp.com"),
      "process.env.STORAGE_BUCKET": JSON.stringify("store-9959d.appspot.com"),
      "process.env.MESSAGEING_SENDER_ID": JSON.stringify("889730122914"),
      "process.env.PROJECT_ID": JSON.stringify("store-9959d"),
      "process.env.APP_ID": JSON.stringify(
        "1:889730122914:web:de616224152e3178ec43fb"
      ),
      "process.env.DATABASE_URL": JSON.stringify(
        "gs://store-9959d.appspot.com/"
      ),
    }),
  ],
};
