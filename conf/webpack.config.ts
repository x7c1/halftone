import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

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
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
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
