const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src-ui/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '..', 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src-ui/index.html',
        })
    ]
};
