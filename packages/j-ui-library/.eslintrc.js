module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'jest': true,
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
        // You can use parserOptions.parser property to specify a custom parser to parse <script> tags.
        'parser': '@babel/eslint-parser',
    },
    'rules': {
        'require-jsdoc': [ 'off' ],
        'no-invalid-this': [ 'off' ],
        'prefer-rest-params': [ 'off' ],
        'prefer-spread': [ 'off' ],
        'vue/html-indent': [ 'error', 4, {
            'attribute': 1,
        } ],
    },
};
