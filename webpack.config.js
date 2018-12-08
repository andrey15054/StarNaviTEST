'use strict';


const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require(webpack);
const ExtractTextPlugin = require ('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname + '/source',

    entry: {
        build: './build'
    },

    output:{
        path: __dirname + '/build',
        publicPath: '/',
        filename: '[name].js'
    },

    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout:100,
        ignored: /node_modules/
    },
    
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js','.css']
    },

    resolveLoader: {
        modules:['node_modules'],
        moduleExtensions: ['-loader'],
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                include: __dirname + '/'
                use: [{
                    loader: 'babel-loader',
                    options:{
                        presets: ['es2015']
                    }
                }]
            },
            {
                test: /\.scss$/,
                include: __dirname + '/source',
                use: ExtractTextPlugin.extract({
                    fallback: 'style',
                    use: ['css','postcss','sass']
                })
            }

        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new CleanWebpackPlugin(__dirname + '/.build/*'),
        new HtmlWebpackPlugin({
            filename: 'style.css',
            allChunks: true
        })
    ],
    devServer:{
        port: 9000,
        contentBase: __dirname + '/build',
        watchContentBase: true,
        compress: true,
        inline: true,
        hot: false
    }
};


if (NODE_ENV == 'production'){
    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new StyleExtHtmlWebpackPlugin('styles.css'),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true
            },
            comments: false
        })
    );
};