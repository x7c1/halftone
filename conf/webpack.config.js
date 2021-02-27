const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = (() => {
  const root = path.resolve(__dirname, '..');
  const ui = path.resolve(root, 'src-ui');
  return { root, ui };
})();

module.exports = {
  mode: 'production',
  entry: path.resolve(paths.ui, 'index.tsx'),
  // see SourceMapDevToolPlugin settings
  devtool: false,
  output: {
    filename: 'main.js',
    path: path.resolve(paths.root, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(paths.ui, 'index.html'),
    }),
    // https://webpack.js.org/plugins/source-map-dev-tool-plugin/
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
    }),
  ],
};
