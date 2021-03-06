
# Run

```
npm start
```

This will run `src/app.ts` which is a simple _Hello World!_.

For any solution, run
```
npm run solve 1 1
```
This will print the solution to challenge 1 of day 1.

# Test

```
npm test
```
This will run tests for utils and shared code.

Challenge solutions are not unit tested -- getting the correct answer is _it_!


# Learnings

## Javascript

* `%` is _remainder_ operator **not** _modulo_ operator
  which mean different things w.r.t. to negative numbers.
  To get _modulo_ of negative numbers, do `((a % n ) + n ) % n`
* Bitwise operators truncate operands to `32` bits even though regular
  arithmetic supports upto `53` bits.

## New Node/Typescript project

* Can use `npm init` to create a new JS project with a `package.json`
* Can use `tsc --init` to create a new `tsconfig.json` file with all the possible options.
   I've set these to the strictest possible values to see how it helps/hinders development.
* Using `ts-standard` as the linter. Allows a zero config linting experience, similar to `black` for Python.
* Typescript/Node does not support ESM out of the box yet. It's [being worked upon](https://github.com/TypeStrong/ts-node/issues/1007). In the meantime, set tsc to put out CommonJS modules.
* Need multiple tsconfig to keep tests out of the distro but have test files be linted, compiled, etc. by VSCode.
  A single tsconfig file could work if
    - you are okay with having tests in your distro OR
    - if you are using a more complex build process which picks the relevant files after tsc is done

## J(T)esting

* `console.log` testing can be done by replacing the method with a mock for the scope of the test and then putting it back.
