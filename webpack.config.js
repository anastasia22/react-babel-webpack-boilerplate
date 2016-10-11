var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, 'app/main.jsx')
  ],
  output: {
    path: __dirname + '/static',
    filename: './bundle.js'
  },
  module: {
    loaders:[
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app'),
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0', 'react'],
        }
      },
      { test: /\.css$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app'),
        loader: 'css-loader',
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    new LiveReloadPlugin()
  ]
};
