module.exports = {
    env: {
        browser: true,
        es2022: true
    },
    extends: [
        'airbnb-base',
        'plugin:svelte/base',
        'plugin:svelte/recommended',
    ],
    plugins: [],
    ignorePatterns: [
        'public/build/'
    ],
    overrides: [
        {
            files: ["*.svelte"],
            parser: "svelte-eslint-parser",
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        "import/extensions": "off",
        "import/prefer-default-export": "off",
        "import/no-named-as-default-member": "off",
        "import/no-mutable-exports": "off",
        "import/no-named-as-default": "off",
        "svelte/no-at-html-tags": "off",
        "max-len": ["error", {"code": 120}]
    },
};
