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
