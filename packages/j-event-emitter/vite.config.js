import { resolve } from 'path';
import commonjs from '@rollup/plugin-commonjs';
export default {
    build: {
        lib: {
            entry: resolve( __dirname, './src/index.js' ),
            name: 'j-event-emitter',
            formats: [
                'es',
                'cjs',
                'umd',
            ],
        },
    },
    plugins: [
        commonjs(),
    ],
};
