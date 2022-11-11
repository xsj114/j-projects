const path = require( 'path' )
const fs = require('fs')
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );


let files = fs.readdirSync( path.resolve( __dirname, './src/packages/theme/src' ) ) 
const componentsStyle = {}
for (let file of files) {
    let fileName = file.replace( /\.styl$/, '' )
    componentsStyle[fileName] = path.resolve( __dirname, `./src/packages/theme/src/${file}`)
}

const entry = Object.assign( {}, { 
    index: path.resolve( __dirname, './src/packages/theme/index.styl' ) 
}, componentsStyle )
    

module.exports = () => {

    const webpackConfig = {
        mode: 'production',
        entry,
        output: {
            path: path.resolve( __dirname, './lib' ),
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
            mainFiles: [ 'index' ],
            modules: [ 'node_modules' ],
        },
        plugins: [
            new MiniCssExtractPlugin( {
                filename: 'theme/[name].css',
            } ),
        ],
        module: {
            rules: [
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
            ],
        },
    }


    return webpackConfig

}
