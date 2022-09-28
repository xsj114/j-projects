import type { Config } from 'jest';

const config: Config = {
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
