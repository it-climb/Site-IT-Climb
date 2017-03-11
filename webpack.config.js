'use strict';

const path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    babelPolyfill = require('babel-polyfill');

module.exports = {
    // entry: {
    //     app: './assets/js/index'
    // },
    entry: {
        bundle:['babel-polyfill', './assets/js/index']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: { presets: ['react', 'es2015', 'stage-0'] }
            },
            { test: /\.(png|jpg|ttf|eot|woff|woff2|svg)$/, loader: 'file?name=[path][name].[ext]' },
            {
                test: /\..?css/,
                exclude: /vendor|no-parse/,
                loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap')
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    
    resolve: {
        modulesDirectories: ['node_modules', 'shared'],
        extensions: ['', '.js', '.jsx']
    },
    
    plugins: [
        new ExtractTextPlugin('styles.css', {
            allChunks: true
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                unsafe: true,
                drop_debugger: true,
                dead_code: true
            }
        }),
        new CopyWebpackPlugin([{from: 'assets/images/**'}]),
        new CopyWebpackPlugin([{from: 'assets/stock/**'}])
    ]
};
