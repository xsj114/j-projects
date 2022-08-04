module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
    },
    'extends': [
        'google',
        'plugin:vue/recommended',
        '../../.eslintrc.js',
    ],
    'parser': 'vue-eslint-parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
        'ecmaFeatures': {
            'jsx': true,
        },
        'vueFeatures': {
        },
    },
    'rules': {
        'vue/html-indent': [
            'error', 4, {
                'attribute': 1,
            },
        ],
    },
};
