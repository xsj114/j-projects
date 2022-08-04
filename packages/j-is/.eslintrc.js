const eslintConfig = {
    'env': {
        'browser': true,
        'es2021': true,
    },
    'extends': [
        'google',
        '../../.eslintrc.js',
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'rules': {
        'require-jsdoc': [ 'off' ],
    },
};

module.exports = eslintConfig;
