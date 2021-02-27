const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = (() => {
  const root = path.resolve(__dirname, '..');
  const ui = path.resolve(root, 'src-ui');
  return { root, ui };
})();

module.exports = {
  mode: 'production',
  entry: path.resolve(paths.ui, 'index.tsx'),
  output: {
    filename: 'main.js',
    path: path.resolve(paths.root, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/transform-react-jsx'],
          },
        },
      },
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
  ],
};
