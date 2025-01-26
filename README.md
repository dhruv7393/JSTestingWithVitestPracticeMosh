### What is unit testing?

- A form of autmated testing where we write code to test our code.
- **Test runner** helps to run all test
- Helps us to
  - identify bugs early in code.
  - refactor (changing structure without changing behaviour)
  - improve code quality
  - doumentation of how code should behave
- Fixing a bug in prod after deployment can be **5x** more expensive then coding phase
- Types of test -> unit, integartion and end-to-end
- Integration test deals with how different components / application work together as a whole
- End-to-end deal with entire system simulation
- No. of Unit test > integration > end-to-end. This is refered to as **testing pyramid**
- **Testing framework** is a set of tools for writing and running test. It includes -
  - Test runner
  - Assertion Lib
  - Mocking Tools
  - Test coverage tools
  - and many other tools
- Popular framework include -
  - Jest -> most popular, setup for ECMA is experimental
  - Mocha
  - Jasmine
  - Vitest -> latest, supports ecma, ts and jsx
  - Cypress
  - Playright

### Vitest -

- Setting up -

```
npm i -D vitest
```

- Add to package scripts -

```
"test": "vitest"
```

- To run -

```
npm run test  / npm t
```

- descibe - for creating test suite / group of related test
- test - to create test case
- it - to create test case
- expect

- describe has 2 args
  1. name of test suite - use name of function / unit under test
  2. function called by test runner
- test/ it can be used interchangeably
- Follow AAA(arrange-act-assert) pattern
- A basic setup for this -

```
import { describe, test, it, expect } from "vitest";
describe('max',()=>{
    it('should return first number if it is greater then second',()=>{
        //Arrange
        //Aact
        //Assert
    })
})
```
