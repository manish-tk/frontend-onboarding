module.exports = {
    env: {
        browser: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'prettier/prettier': ['error', { tabWidth: 4 }],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    // Add file extensions here
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
        },
    ],
    // Specify files/directories to ignore
    ignorePatterns: ['node_modules/', 'dist/', 'build/'],
};
