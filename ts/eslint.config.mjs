import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn'
        },
        ignores: ["dist/**"]
    },
    {
        files: ["**/*.test.ts", "src/test-utils.ts"],
        rules: {
            '@typescript-eslint/no-explicit-any': 'off'
        }
    }
);
