'use strict';

const webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    prodConfig = require('./webpack.config'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

const BABEL_QUERY = {
    presets: ['react', 'es2015', 'stage-0'],
    plugins: [
        ['react-transform', {
            transforms: [
                {
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module']
                }
            ]
        }]
    ]
};

module.exports = app => {

    const config = Object.assign({}, prodConfig, {
        devtool: 'inline-source-map',
        entry: {
            app: ['webpack-hot-middleware/client', './assets/js']
        },

        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: BABEL_QUERY
                },
                {test: /\.(png|jpg|ttf|eot|woff|woff2|svg)$/, loader: 'file?name=[path][name].[ext]'},
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

        plugins: [
            new ExtractTextPlugin('styles.css', {allChunks: true}),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.NoErrorsPlugin(),
            new CopyWebpackPlugin([{from: 'assets/images/**'}]),
            new CopyWebpackPlugin([{from: 'assets/stock/**'}])
        ]
    });

    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {noInfo: true}));
    app.use(webpackHotMiddleware(compiler));
};
