### Characteristics of good test

- Maintainable
- Robust (resilint to change in code)
- trustworthy
- isolated

- Should have a clear name and single behaviour
- Should be small and varible should have clear name
- Test what function is supposed to do and not how
- do not write against messages as the words may change
- test boundary condition

### Assertion -

1. Equality -

- toBe for primitive e.g. num
- toEqual for object (toBe will not compare value but its same obj)

2. Truthiness -

- toBeTruthy
- toBeFalsy
- toBeNull
- toBeUndefined
- toBeDefined

3. Numbers-

- toBeGreaterThan
- toBeGreaterThanOrEqual
- toBeLessThan
- toBeLessThanOrEqual
- toBeCloseTo ( For floats)

4. String

- toMatch (some words are matched)

5. Object

- toMatchObject (subset of property matched)
- toHaveProperty (if it has particular property)

6. Array -

- toContain - has certian values
- toHaveLength - of length

7. Exceptions-

- toThrowError- if we expect function to throw exception

```
expect(...).toMatch(/not found/i)
// for regex
i - ignore case
```

```
expect([...]).toEqual(expect.arrayContaining[1,2,3])
- matches 1st array in any order to contain 1,2,3
```

- If you are checking for string also make sure its not empty
- Positive testing is how well code works in normal condition and negative testing is how well app handles unexpected or incorrect input
- `Covergae` helps to see which lines are pending
- `Boundary Testing` is testing technique where we focus on boundaries / edges of input value eg of isPriceInRange where we make sure to check price==min and price==max in test
- !string covers null, undefined and empty
- `Parameterized test` are a way to run same test multiple times with different set of input data

- it.each can be used for paramterized test and simplifies to great extent. To print values in it name use $ and object destructuring to get values

```
it("should return false for age less then legal driving age", () => {
    expect(canDrive(usLegalDrivingAge - 1, "US")).toBeFalsy();
    expect(canDrive(ukLegalDrivingAge - 1, "UK")).toBeFalsy();
  });
  it("should return true for age more then legal driving age", () => {
    expect(canDrive(usLegalDrivingAge + 10, "US")).toBeTruthy();
    expect(canDrive(ukLegalDrivingAge + 10, "UK")).toBeTruthy();
  });
  it("should return true for age equal to legal driving age", () => {
    expect(canDrive(usLegalDrivingAge, "US")).toBeTruthy();
    expect(canDrive(ukLegalDrivingAge, "UK")).toBeTruthy();
  });
```

cane be replaced with -

```
it.each([
    { age: usLegalDrivingAge - 1, country: "US", result: false },
    { age: usLegalDrivingAge + 10, country: "US", result: true },
    { age: usLegalDrivingAge, country: "US", result: true },
    { age: ukLegalDrivingAge - 1, country: "UK", result: false },
    { age: ukLegalDrivingAge + 10, country: "UK", result: true },
    { age: ukLegalDrivingAge, country: "UK", result: true },
  ])("should return $result for $age, $country", ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
  });
```

- For async returning promise we use then and the parameter passed needes to be tested

```
asyncFunc.then((result)=>{
  expect(result)...
})

or we can use await
const result = await asyncFunction()
The test function i.e. in it needs to be marked as async

if asynce retruns Promise.reject({reason: "abc"})
use try catch to handle it
```

- We can use `beforeEach, beforAll, aterEach, afterAll` for setup. They are defined in `describe`

- The following can be simplified to -

```
it("should return error on peek", () => {
    try {
      let popperElement = elementsOfArray.peek();
    } catch (error) {
      expect(error.message).toMatch(/empty/i);
    }
  });
```

```
it("should return error on peek", () => {
    expect(() => elementsOfArray.peek()).toThrow(/empty/i);
  });
```
