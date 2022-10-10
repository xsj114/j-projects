const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { VueLoaderPlugin } = require( 'vue-loader' );
const { merge } = require( 'webpack-merge' );

module.exports = ( env ) => {
    const __DEV__ = env.prod ? false : true;


    const devServerConfig = {
        devServer: {
            static: './dist',
            open: true,
            port: 3000,
            hot: 'only',
            historyApiFallback: true,
            client: {
                overlay: {
                    errors: true,
                    warnings: true,
                },
            },
        },
    };

    let plugins = [
        new HtmlWebpackPlugin( {
            title: 'Vue',
            template: path.resolve( __dirname, './public/index.html' ),
        } ),
        new VueLoaderPlugin(),
    ];

    if ( __DEV__ ) {
        const devPlugins = [];
        plugins = plugins.concat( devPlugins );
    } else {
        const prodPlugins = [
            new MiniCssExtractPlugin( {
                filename: 'css/[name].[contenthash].css',
            } ),
        ];
        plugins = plugins.concat( prodPlugins );
    }


    const webpackConfig = {
        mode: __DEV__ ? 'development' : 'production',
        devtool: __DEV__ ? 'eval-cheap-module-source-map' : 'cheap-module-source-map',
        entry: {
            main: path.resolve( __dirname, './src/examples/main.js' ),
        },
        target: 'web',
        output: {
            path: path.resolve( __dirname, './dist' ),
            filename: 'js/[name].[contenthash].js',
            clean: true,
            publicPath: '/',
        },
        plugins,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: path.resolve( __dirname, './node_modules' ),
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [ '@babel/preset-env' ],
                            plugins: [ '@babel/plugin-transform-runtime' ],
                            cacheDirectory: true,
                        },
                    },
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    sideEffects: true,
                    include: path.resolve( __dirname, './src' ),
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                                importLoaders: 1,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                    ],
                    include: path.resolve( __dirname, './src' ),
                },
                {
                    test: /\.styl(us)?$/i,
                    use: [
                        {
                            loader: __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                                importLoaders: 2,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'stylus-loader',
                        },
                    ],
                    include: path.resolve( __dirname, './src' ),
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset',
                    include: path.resolve( __dirname, './src' ),
                    generator: {
                        filename: 'static/images/[name]_[hash][ext]',
                    },
                    parser: {
                        dataUrlCondition: {
                            maxSize: 8 * 1024,
                        },
                    },
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                    type: 'asset/resource',
                    include: path.resolve( __dirname, './src' ),
                    generator: {
                        filename: 'static/fonts/[name]_[hash][ext]',
                    },
                },
            ],
        },
        resolve: {
            alias: {
                '@utils': path.resolve( __dirname, 'src/utils' ),
                '@components': path.resolve( __dirname, 'src/components' ),
                '@assets': path.resolve( __dirname, 'src/assets' ),
                '@examples': path.resolve( __dirname, 'src/examples' ),
                '@packages': path.resolve( __dirname, 'src/packages' ),
                '@mixins': path.resolve( __dirname, 'src/mixins' ),
            },
            extensions: [ '.js', '.vue', '.json' ],
            mainFiles: [ 'index' ],
            modules: [ 'node_modules' ],
        },
        optimization: {
            usedExports: true,
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'async',
                minSize: 20000,
                minRemainingSize: 0,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                enforceSizeThreshold: 50000,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
        },
    };

    return __DEV__ ? merge( webpackConfig, devServerConfig ) : webpackConfig;
};

