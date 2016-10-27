var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: {a: [
    path.resolve(__dirname, 'app/main.jsx'),
    path.resolve(__dirname, 'router.js')
  ]},
  output: {
    path: __dirname + '/static',
    filename: './bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'app'), path.resolve(__dirname, 'router.js')],
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react', 'stage-0'],
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
