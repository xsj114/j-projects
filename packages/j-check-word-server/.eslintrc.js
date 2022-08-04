const eslintConfig = {
    'env': {
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
};

module.exports = eslintConfig;
