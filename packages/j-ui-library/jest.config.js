module.exports = {
    ...require( '../../jest.base.config.js' ),
    'setupFilesAfterEnv': [ '<rootDir>/jest-setup.js' ],
    'moduleNameMapper': {
        // 在webpack 中配置了别名解析,也需要用moduleNameMapper选项为Jest增加一个匹配配置
        '^@utils(.*)$': '<rootDir>/src/utils/$1',
        '^@packages(.*)$': '<rootDir>/src/packages/$1',
        '^@mixins(.*)$': '<rootDir>/src/mixins/$1',
    },
    'moduleFileExtensions': [ 'js', 'json', 'vue' ],
    'testEnvironment': 'jsdom',
    'transform': {
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest',
    },
    'displayName': {
        name: 'j-ui-library',
        color: 'blue',
    },
};
