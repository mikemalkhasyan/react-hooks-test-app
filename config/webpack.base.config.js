const webpack = require('webpack');
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = env => {
    const { VERSION, PLATFORM } = env;
    return merge([{
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]  // read this from RIGHT to LEFT
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: './index.html'
            }),
            new CopyWebpackPlugin([ {'from': 'src/static'} ]),
            new webpack.DefinePlugin({
                'process.env.VERSION': JSON.stringify(env.VERSION),
                'process.env.PLATFORM': JSON.stringify(env.PLATFORM),
            })
        ]
    }]);
};
