const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, '/client/app.jsx'),
  output: {
    path: path.join(__dirname, '/client'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/', 'react')
    }
  }

}
