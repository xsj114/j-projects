import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    ...require( '../../jest.base.config.js' ),
    ...require( '../../jest.base.config.ts' ),
    'verbose': true,
    'testEnvironment': 'jsdom',
    'displayName': {
        name: 'j-is',
        color: 'blue',
    },
};

export default config;
