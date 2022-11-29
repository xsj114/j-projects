import { resolve } from 'path';
import commonjs from '@rollup/plugin-commonjs';
export default ( { mode } ) => {
    return {
        build: {
            lib: {
                entry: resolve( __dirname, './src/index.js' ),
                name: 'j-promise',
                formats: [
                    'es',
                    'cjs',
                    'umd',
                ],
            },
        },
        plugins: [
            mode === 'production' && commonjs(),
        ],
        optimizeDeps: {
            include: [ 'j-is' ],
        },
    };
};
