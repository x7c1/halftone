import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const paths = (() => {
  const root = path.resolve(__dirname, '..');
  const ui = path.resolve(root, 'src-ui');
  const conf = path.resolve(root, 'conf');
  return { root, ui, conf };
})();

const config: webpack.Configuration = {
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
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(paths.conf, 'tsconfig.json'),
            },
          },
        ],
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

export default config;
