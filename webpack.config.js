var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
  module: {
      loaders: [
        {
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
  },
  resolve: {
      // dguillamot - add resolve so we can include jsx files in import without .jsx extension. Can also add .coffee, .json if needed but SithLord exercise does not need it
      extensions: ['', '.js', '.jsx'] 
  }
};
