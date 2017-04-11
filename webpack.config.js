/* eslint-disable */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry : './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!sass-loader'
                })
            },
            {
                test: /\.(jpg|png|gif|svg)$/i,
                loader: 'file-loader?name=/img/[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    }

}