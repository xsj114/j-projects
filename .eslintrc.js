module.exports = {
    'root': true,
    'rules': {
        'space-in-parens': [ 'error', 'always' ],
        'indent': [ 'error', 4 ],
        'block-spacing': [ 'error', 'always' ],
        'comma-spacing': [ 'error', { 'before': false, 'after': true } ],
        'semi-spacing': [ 'error', { 'before': false, 'after': true } ],
        'space-infix-ops': [ 'error', { 'int32Hint': false } ],
        'array-bracket-spacing': [ 'error', 'always' ],
        'object-curly-spacing': [ 'error', 'always' ],
        'max-len': [ 'error', { 'code': 100 } ],
        'computed-property-spacing': [ 'error', 'always' ]
    },
    'overrides': [
        {
            'files': [ "*.ts" ],
            'parser': '@typescript-eslint/parser',
            'plugins': [ '@typescript-eslint' ],
            'extends': [
                'plugin:@typescript-eslint/recommended'
            ]
        }
    ]
}
