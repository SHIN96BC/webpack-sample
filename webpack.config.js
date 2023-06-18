const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const banner = require('./banner');

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
                    'style-loader',
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
    ]
};