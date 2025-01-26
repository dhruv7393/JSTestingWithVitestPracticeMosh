import { describe, test, it, expect, assert } from "vitest";
import { max } from "../src/intro";

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
