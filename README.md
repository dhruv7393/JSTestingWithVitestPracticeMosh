- `Static analysis tool` help to analyze code without executing it
- catch error early, improve code quality, consistency

- For prettier - `npm i -D prettier`
- To run - `npx prettier . --write`
- For custom formatting use .prettierrc.json - here we changed from " to '
- To add it to package script - `"format": "prettier . --write"`

- ESLint helps to catch common mistake early
- To install `npm init @eslint/config@latest`
- For unning `npx eslint .`
- Configs can be added to `.eslintrc.json`
- `npx eslint . --fix` can be used to fix potential issue
- Prettier adds semicolon, eslint removes it to fix the issue add semi:["error", "always"] to rule

- To install ts -> `npm i -D typescript`
- for first time init `npx tsc --init` - creates tsconfig
- then run `npx tsx` - will generate js code, eslint will error on it
- set outdir to dist -> `"outDir": "./dist",`
- Add `"ignorePatterns": ["dist/"],` above rules to avoid eslint checking dist folder

- [Husky](https://typicode.github.io/husky/) can be used for automating code quality
- lint-staged is used to format only staged files
- we removed `npm test` from husky as it makes it too slow
- Add configs to .lintsatgedrc.json
- For single run of vitest we use - `npx vitest run`
- pre-commit is for prior commit, pre-push for prior push
