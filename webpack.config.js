const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const banner = require('./banner');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === 'production'
                    ? MiniCssExtractPlugin.loader
                    : 'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb
                    }
                }
            }
        ]
    },
    plugins: [
        // 1. BannerPlugin
        // new webpack.BannerPlugin({
        //     banner: `
        //         Build Date: ${new Date().toLocaleString()}
        //         Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        //         Author: ${childProcess.execSync('git config user.name')}
        //     `
        // })
        new webpack.BannerPlugin(banner),

        // 2. DefinePlugin
        new webpack.DefinePlugin({
            // TWO: '1+1', // 2
            // TWO: JSON.stringify('1+1'), // 1+1
            VERSION: JSON.stringify('v.1.2.3'),
			PRODUCTION: JSON.stringify(false),
			MAX_COUNT: JSON.stringify(999),
			"api.domain": JSON.stringify('http://dev.api.domain.com'),
        }),

        // 3. HtmlWebpackPlugin
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // templateParameters는 ejs문법(<%= %>)에서 사용할 수 있는 값을 넘겨줄 수 있습니다.
            templateParameters: {
                env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
            },
            minify: process.env.NODE_ENV === 'production' ? {
                // 빈칸 제거 여부
                collapseWhitespace: true,
                // 주석 제거 여부
                removeComments: true,
            } : false,
            hash: true
        }),

        // 4. CleanWebpackPlugin
        new CleanWebpackPlugin(),

        // 5. MiniCssExtractPlugin
        ...(process.env.NODE_ENV === 'production'
            ? [new MiniCssExtractPlugin({filename: '[name].css'})]
            : []
        )
    ]
};