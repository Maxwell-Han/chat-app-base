module.exports = {
  entry: "./public/index.js",
  mode: "development",
  output: {
    path: __dirname, // assumes bundle.js will also be in the root of project folder
    filename: "bundle.js"
  },
  devtool: "source-maps",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
