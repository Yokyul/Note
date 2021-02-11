// vue：vue-loader vue-template-compiler
// js: babel-loader @babel/core @babel/preset-env
// css: style-loader css-loader
// webpack: webpack  webpack-dev-server webpack-merge webpack-cli
// plugin: html-webpack-plugin
const path = require('path');
const VuePlugin = require('vue-loader/lib/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: resolve('./dist')
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.vue/,
                use: 'vue-loader',
            }
        ]
    },
    plugins: [
        new VuePlugin(),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: resolve('./public/index.html'),
        })
    ]
}