const webpack = require('webpack');
const path = require('path');// подключаем path к конфигу вебпак
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// подключаем плагин
const isDev = process.env.NODE_ENV === 'development';
// создаем переменную для development-сборки

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
      },
      devtool: 'source-map',
    module: {
        rules: [
            { // тут описываются правила
            test: /\.js$/, // регулярное выражение, которое ищет все js файлы
            use: { 
                loader: "babel-loader" 
                }, // весь JS обрабатывается пакетом babel-loader
            exclude: /node_modules/ // исключает папку node_modules
                },

                {
                test: /\.css$/i,
                use: [
                    (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
                        'css-loader', 
                        'postcss-loader'
                    ]
                },

                {
            test: /\.(gif|png|jpe?g|svg)$/i,//для работы с изображениями
            use: [
                'file-loader',
                {
                loader: 'image-webpack-loader',
                options: {
                    bypassOnDebug: true, // webpack@1.x
                    disable: true, // webpack@2.x and newer
                        },
                    },
                ],
            },

            {
            test: /\.(eot|svg|ttf|woff|woff2)$/, // для работы со шрифтами
            use: [
                    {
                        loader: 'file-loader?name=./vendor/fonts/[name].[ext]'
                    }
                ]
            }

            ]
        },
    plugins: [ 
        new HtmlWebpackPlugin({
            // Означает, что:
            inject: false, // стили НЕ нужно прописывать внутри тегов
            template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
          }),
        new MiniCssExtractPlugin({filename: 'style.[contenthash].css'}),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
       }),        
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                })
            ]
}