const path = require( 'path' )
const { VueLoaderPlugin } = require( 'vue-loader' );
const components = require( './components.json' )

module.exports = () => {

    const webpackConfig = {
        mode: 'production',
        entry: components,
        output: {
            path: path.resolve( __dirname, './lib' ),
            filename: '[name].js',
            library: {
                type: 'commonjs2'
            }
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
        plugins: [
            new VueLoaderPlugin(),
        ],
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
    }


    return webpackConfig

}
