module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'jest', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-return-await': 'off',
    '@typescript-eslint/return-await': ['error', 'always'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    // allow usage of Class.name as tests name
    'jest/valid-title': 'off',
    // expect usage of expect methods per test case
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: ['expect', 'waitForExpect', 'request.**.expect'],
      },
    ],
    'jest/no-duplicate-hooks': 'error',
    // check for parameters that fn was called with
    'jest/prefer-called-with': 'error',
    // use jest built in equality matchers for better test error results
    'jest/prefer-equality-matcher': 'error',
    // correct usage of async expects
    'jest/prefer-expect-resolves': 'error',
    // use Jest syntactic sugar shorthands
    'jest/prefer-mock-promise-shorthand': 'warn',
    // prefer jest.spOn instead of assigning jest.fn to a method
    'jest/prefer-spy-on': 'error',
    // Check that the results are exactly how you think they are
    'jest/prefer-strict-equal': 'error',
    // Test that Error thrown is of a correct value
    'jest/require-to-throw-message': 'error',
    // Use only one describe per file
    'jest/require-top-level-describe': [
      'error',
      {
        maxNumberOfTopLevelDescribes: 1,
      },
    ],
    // enforce usage of expect.assertions(n) for async expects - ensures that
    // expect finished to run before tests exit
    'jest/prefer-expect-assertions': [
      'error',
      { onlyFunctionsWithAsyncKeyword: true },
    ],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'import/order': ['error', { alphabetize: { order: 'asc' } }],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@nestjs/common',
            importNames: ['Logger'],
            message: 'Please use @devsbb/logger instead.',
          },

          {
            name: '@nestjs/config',
            message: 'Please use @app/common/config instead.',
          },
        ],
        // Allow every other nestjs package
        patterns: ['@nestjs/(?!config)'],
      },
    ],
  },
};
