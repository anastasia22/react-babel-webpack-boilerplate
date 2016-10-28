var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {first: [
    path.resolve(__dirname, 'app/main.jsx'),
    path.resolve(__dirname, 'router.js'),
    path.resolve(__dirname, 'app/main.scss')
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
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url!sass-loader?sourceMap')
      },
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    new LiveReloadPlugin(),
    new ExtractTextPlugin('styles.css', {allChunks: true})
  ]
};
