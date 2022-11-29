const eslintConfig = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
    },
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'extends': [
        'google',
        '../../.eslintrc.js',
    ],
    'rules': {
        'require-jsdoc': [ 'off' ],
    },
};

module.exports = eslintConfig;
