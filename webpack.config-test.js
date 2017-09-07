/* eslint-disable */
var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = {
  target: 'node',
  externals: [
    nodeExternals()
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel-loader',
        exclude: [
            path.resolve(__dirname, 'node_modules')
        ]
      },
    ],
  },
  resolve: {
    modules: [
        path.resolve('./src'),
        //path.resolve('./node_modules')
    ],
    extensions: ['.js', '.jsx', '.json', '.scss'],
  }
};