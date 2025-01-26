import { describe, test, it, expect, assert } from "vitest";
import { fizzBuzz, max } from "../src/intro";

describe("max", () => {
  it("should return first number if it is greater then second", () => {
    //Arrange
    const a = 7;
    const b = 5;
    //Aact
    const result = max(a, b);
    //Assert
    expect(result).toBe(7);
  });

  it("should return second number if it is greater then first", () => {
    expect(max(5, 7)).toBe(7);
  });

  it("should return first number if it is equal to second", () => {
    expect(max(5, 5)).toBe(5);
  });
});

describe("fizzBuzz", () => {
  it("is divisble by 3 and 5 should return FizzBuzz", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });
  it("is divisble just by 3 should return Fizz", () => {
    expect(fizzBuzz(9)).toBe("Fizz");
  });
  it("is divisble just by 5 should return Buzz", () => {
    expect(fizzBuzz(10)).toBe("Buzz");
  });
  it("is neither divisble by 3 nor by 5 should return number", () => {
    expect(fizzBuzz(7)).toBe("7");
  });
});
