const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
      }
    ]
  },
  resolve: {
    alias: {
      main: path.resolve(__dirname, 'src/components/Main/index.jsx'),
      footer: path.resolve(__dirname, 'src/components/Footer/index.jsx'),
      header: path.resolve(__dirname, 'src/components/Header/index.jsx'),
      configureStore: path.resolve(
        __dirname,
        'src/redux/store/configureStore.js'
      )
    }
  },
  plugins: [new HtmlWebpackPlugin()]
};
