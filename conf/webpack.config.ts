import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const paths = (() => {
  const pathTo = (dir: string) => ({
    join: (x: string) => path.join(dir, x),
  });
  const root = path.resolve(__dirname, '..');
  return {
    root: pathTo(root),
    ui: pathTo(path.resolve(root, 'src-ui')),
    conf: pathTo(path.resolve(root, 'conf')),
  };
})();

const config: webpack.Configuration = {
  mode: 'production',
  entry: paths.ui.join('index.tsx'),
  // see SourceMapDevToolPlugin settings
  devtool: false,
  output: {
    filename: 'main.js',
    path: paths.root.join('dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader' },
          {
            // https://github.com/seek-oss/css-modules-typescript-loader
            loader: 'css-modules-typescript-loader',
          },
          {
            // https://github.com/webpack-contrib/css-loader
            loader: 'css-loader?',
            options: {
              modules: {
                localIdentContext: paths.ui.join(''),
                // https://github.com/webpack/loader-utils#interpolatename
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: paths.conf.join('tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // https://webpack.js.org/configuration/resolve/#resolveextensions
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: paths.ui.join('index.html'),
    }),
    // https://webpack.js.org/plugins/source-map-dev-tool-plugin/
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
    }),
  ],
};

export default config;
