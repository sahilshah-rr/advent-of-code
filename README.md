# Advent of Code

## 2020

Using this year's challenges to learn Typescript / Javascript / Node and its ecosystem.
Some of the learnings are here:

1. Can use `npm init` to create a new JS project with a `package.json`
2. Can use `tsc --init` to create a new `tsconfig.json` file with all the possible options.
   I've set these to the strictest possible values to see how it helps/hinders development.
3. Using `ts-standard` as the linter. Allows a zero config linting experience, similar to `black` for Python.
4. Typescript/Node does not support ESM out of the box yet. It's [being worked upon](https://github.com/TypeStrong/ts-node/issues/1007). In the meantime, set tsc to put out CommonJS modules.
5. Need multiple tsconfig to keep tests out of the distro but have test files be linted, compiled, etc. by VSCode.
   A single tsconfig file could work if you are okay with having tests in your distro OR
   if you are using a more complex build process which picks the relevant files after tsc is done
6. `console.log` testing can be done by replacing the method with a mock for the scope of the test and then putting it back.
