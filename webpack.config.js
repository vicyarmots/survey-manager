const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
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
      }
    ]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      store: path.resolve(__dirname, 'src/redux/store'),
      containers: path.resolve(__dirname, 'src/containers')
    }
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    publicPath: '/',
    overlay: {
      warnings: true,
      errors: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin('./src/index.css'),
    new CopyWebpackPlugin([
      {
        from: './node_modules/@fortawesome/fontawesome-free/webfonts',
        to: './webfonts'
      }
    ])
  ]
};
