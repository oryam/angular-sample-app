var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var path = require('path')
var argv = require('yargs').argv

module.exports = {
  cache: true,
  debug: true,
  devTool: 'inline-source-map',
  entry: [
    path.join(__dirname, 'src/app.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /src\/lib/],
        loaders: ['eslint-loader'],
      },
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.js$/,
        exclude: [/src\/lib/, /node_modules\/(?!.*ag-grid).*/],
        loaders: ['ng-annotate', 'babel-loader'],
      },
      {
        test: /\.html$/,
        loader: 'raw',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/font-woff&prefix=fonts',
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/octet-stream&prefix=fonts',
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=application/vnd.ms-fontobject&prefix=fonts',
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?mimetype=image/svg+xml&prefix=fonts',
      },
    ],
  },
  resolve: {
    alias: {
      'af.config': `${__dirname}/src/common/config/index`,
      'af.menu': `${__dirname}/src/components/menu/index`,
      'af.toolbar': `${__dirname}/src/components/toolbar/index`,
      'af.loader': `${__dirname}/src/components/loader/index`,
      'af.model': `${__dirname}/src/model/index`,
    },
  },
  plugins: [
    /*eslint angular/json-functions:0*/
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(argv.env || 'development'),
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
  ],
}
