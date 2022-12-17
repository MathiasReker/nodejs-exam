module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: 'airbnb-base',
    plugins: [
        'svelte3'
    ],
    ignorePatterns: [
        'public/build/'
    ],
    overrides: [
        {
            files: ['*.svelte'],
            processor: 'svelte3/svelte3'
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {},
};
