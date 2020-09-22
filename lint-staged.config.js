module.exports = {
  linters: {
    '(README|DEVELOPING).md': ['npm run format-doctoc', 'git add'],
    'package.json': ['npm run format-package-json', 'git add'],
    LICENSE: ['prettier --write', 'git add'],
    '**/*.md': ['markdownlint -i ".github/"'],
    '**/*.{gql,graphql,html,json,md,mdx,yaml,yml}': [
      'prettier --write',
      'git add',
    ],
    '**/*.{js,ts}': [
      'import-sort --write',
      'prettier --write',
      'git add',
      'jest --bail --passWithNoTests',
    ],
    'src/**/*': [
      // Run build without passing changed files to command: https://github.com/okonet/lint-staged/issues/174
      "bash -c 'npm run build'",
    ],
  },
  // The formatting tools are ordered to run sequentially
  concurrent: false,
}
