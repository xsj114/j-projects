const path = require( 'path' );

module.exports = {
    entry: path.resolve( __dirname, './src/index.js' ),
    mode: 'production',
    output: {
        filename: 'bundle.js',
        clean: true,
        path: path.resolve( __dirname, 'dist' ),
        library: {
            name: 'HttpCode',
            type: 'umd',
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets: [ '@babel/preset-env' ],
                    },
                },
            },
        ],
    },
};
