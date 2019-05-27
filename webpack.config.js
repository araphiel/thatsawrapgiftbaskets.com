const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = (env, argv) => {
    return {
        entry: [
            resolve(__dirname, 'src', 'js', 'main.js'),
            resolve(__dirname, 'src', 'scss', 'main.scss'),
        ],

        output: {
            filename: '[name].js',
            path: resolve(__dirname, 'assets', 'dist'),
            publicPath: '/dist/'
        },

        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                                url: false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: { 
                                sourceMap: true,
                                implementation: require("sass")
                            }
                        }
                
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: ['file-loader']
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
            ]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: ['assets/dist']
            }),
            new FriendlyErrorsWebpackPlugin(),
        ],

        optimization: {
            splitChunks: {
                chunks: 'all'
            },
            minimizer: [new UglifyJsPlugin()]
        },
        
        performance: {
            maxEntrypointSize: 400000
        },

        watchOptions: {
            ignored: ['node_modules']
        },
    }
}