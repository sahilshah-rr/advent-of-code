# Advent of Code

## 2020

Using this year's challenges to learn Typescript / Javascript / Node and its ecosystem.
Some of the learnings are here:

1. Can use `npm init` to create a new JS project with a `package.json`
2. Can use `tsc --init` to create a new `tsconfig.json` file with all the possible options.
   I've set these to the strictest possible values to see how it helps/hinders development.
3. Using `ts-standard` as the linter. Allows a zero config linting experience, similar to `black` for Python.
4. Typescript does not support ESM out of the box yet. It's [being worked upon](https://github.com/TypeStrong/ts-node/issues/1007). In the meantime, set tsc to put put CommonJS modules.
