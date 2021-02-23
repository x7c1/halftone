const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = (() => {
    const root = path.resolve(__dirname, '..')
    const ui = path.resolve(root, 'src-ui')
    return {root, ui}
})()

module.exports = {
    entry: path.resolve(paths.ui, 'index.js'),
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
                        plugins: [
                            '@babel/transform-react-jsx',
                        ],
                    },
                },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(paths.ui, 'index.html'),
        }),
    ]
};
