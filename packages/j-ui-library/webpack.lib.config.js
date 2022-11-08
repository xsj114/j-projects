const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const { VueLoaderPlugin } = require( 'vue-loader' );

module.exports = () => {
    const plugins = [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin( {
            filename: 'index.css',
        } ),
    ];

    const webpackLibConfig = {
        mode: 'production',
        devtool: 'cheap-module-source-map',
        entry: {
            main: path.resolve( __dirname, './src/index.js' )
        },
        output: {
            path: path.resolve( __dirname, './lib' ),
            clean: true,
            library: {
                name: 'j-ui-library',
                type: 'umd',
            },
        },
        plugins,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: path.resolve( __dirname, './src' ),
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
                            loader: MiniCssExtractPlugin.loader,
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
                            loader: MiniCssExtractPlugin.loader,
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
        /*
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
        */
        // experiments: {
        // outputModule: true,
        // },
    };

    return webpackLibConfig;
};

