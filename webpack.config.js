const path = require('path');

module.exports = {
  entry: "./client/index.js", // assumes your entry point is the index.js in the root of your project folder
  mode: "development",
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: "bundle.js"
  },
  devtool: "source-maps",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000
  }
};
