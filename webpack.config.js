const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'url-loader?limit=10000'
      }
    ]
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      store: path.resolve(__dirname, 'src/redux/store'),
      containers: path.resolve(__dirname, 'src/containers'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      utils: path.resolve(__dirname, 'src/utils')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, '/dist'),
    watchContentBase: true,
    publicPath: '/',
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new ExtractTextPlugin('./src/index.css'),
    new MinifyPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
};
