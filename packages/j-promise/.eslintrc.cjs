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
        'max-len': [ 'error', { 'code': 150 } ]
    },
};

module.exports = eslintConfig;
