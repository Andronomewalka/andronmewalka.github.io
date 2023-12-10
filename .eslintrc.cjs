module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        "plugin:import/warnings",
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', "simple-import-sort"],
    rules: {
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "import/newline-after-import": ["error", { "count": 2, considerComments: true }],
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        "@typescript-eslint/no-unused-vars": "warn",
        "import/no-named-as-default": "off"
    },
    overrides: [
        {
            files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
            rules: {
                "quotes": [1, "double", { "avoidEscape": true }],
                "simple-import-sort/imports": [
                    "error",
                    {
                        groups: [
                            // Packages `react` related packages come first.
                            ["^react", "^@?\\w"],
                            // Other relative imports. Put same-folder imports and `.` last.
                            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                            // Style imports and side effect imports.
                            ["^.+\\.?(scss)$", "^.+\\.?(less)$", "^.+\\.?(css)$", "^\\u0000"]
                        ]
                    }
                ]
            }
        }
    ]
};
