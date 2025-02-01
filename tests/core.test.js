import { describe, it, test, expect, beforeAll } from "vitest";
import {
  calculateDiscount,
  canDrive,
  fetchData,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  Stack,
  validateUserInput,
} from "../src/core";

describe("getCoupons", () => {
  it("returns an array", () => {
    expect(Array.isArray(getCoupons())).toBeTruthy();
  });

  it("returns an array with at least 1 element", () => {
    expect(getCoupons().length).toBeGreaterThanOrEqual(1);
  });

  it("returns an array with every element having key code", () => {
    getCoupons().forEach((coupon) => expect(coupon).toHaveProperty("code"));
  });

  it("returns an array with every element having key discount", () => {
    getCoupons().forEach((coupon) => expect(coupon).toHaveProperty("discount"));
  });

  it("returns an array with every element having code defined as string", () => {
    getCoupons().forEach((coupon) => expect(typeof coupon.code).toBe("string"));
  });

  it("returns an array with every element having discount defined in range 0 to 1", () => {
    getCoupons().forEach((coupon) =>
      expect(coupon.discount).toBeGreaterThanOrEqual(0).toBeLessThanOrEqual(1)
    );
  });
});

describe("calculateDiscount", () => {
  it("should return invalid for non-numeric price", () => {
    expect(calculateDiscount("10", "SAVE10")).toMatch(/invalid/i);
  });
  it("should return invalid for negative price", () => {
    expect(calculateDiscount(-10, "SAVE10")).toMatch(/invalid/i);
  });
  it("should return invalid for non-string discountCode", () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });
  it("should return price for  invalid discountCode", () => {
    expect(calculateDiscount(10, "10")).toBe(10);
  });
  it("should return discounted price for  valid discountCode", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });
});

describe("validateUserInput", () => {
  it("should return invalid for non-string username", () => {
    expect(validateUserInput(1, 21)).toMatch(/invalid/i);
  });
  it("should return invalid for username less then 3 characters", () => {
    expect(validateUserInput("ab", 21)).toMatch(/invalid/i);
  });
  it("should return invalid for non-numeric age", () => {
    expect(validateUserInput("abc", "21")).toMatch(/invalid/i);
  });
  it("should return invalid for age less then 18", () => {
    expect(validateUserInput("abc", 17)).toMatch(/invalid/i);
  });
  it("should return valid for age gretaer then or equal to 18 and username of 3 or more characters", () => {
    expect(validateUserInput("abc", 29)).toMatch(/valid/i);
  });
});
describe("isPriceInRange", () => {
  /*
  it("should retun false when price exceeds min or max value", () => {
    expect(isPriceInRange(-10, 0, 100)).toBeFalsy();
    expect(isPriceInRange(200, 0, 100)).toBeFalsy();
  });

  it("should retun true when price is in range", () => {
    expect(isPriceInRange(50, 0, 100)).toBeTruthy();
  });
*/
  let min = 0;
  let max = 100;
  it.each([
    { price: -10, result: false },
    { price: 200, result: false },
    { price: 50, result: true },
  ])(
    "should return $result for price $price and range " + min + "-" + max,
    ({ price, result }) => {
      expect(isPriceInRange(price, min, max)).toBe(result);
    }
  );
});

describe("isValidUsername", () => {
  it("should return false for very short username", () => {
    expect(isValidUsername("a".repeat(3))).toBeFalsy();
  });
  it("should return false for very long username", () => {
    expect(isValidUsername("a".repeat(20))).toBeFalsy();
  });
  it("should return true for username is at min or max length", () => {
    expect(isValidUsername("a".repeat(5))).toBeTruthy();
    expect(isValidUsername("a".repeat(15))).toBeTruthy();
  });
  it("should return true if username is within length constrain", () => {
    expect(isValidUsername("a".repeat(12))).toBeTruthy();
  });
  it("should return false for invalid input", () => {
    expect(isValidUsername(null)).toBeFalsy();
  });
});

describe("canDrive", () => {
  let usLegalDrivingAge = 16;
  let ukLegalDrivingAge = 17;
  /*
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
  */

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
  it("should return invalid if country code cannot be found", () => {
    expect(canDrive(25, "ind")).toMatch(/invalid/i);
  });
  it("should return false for invalid input to country code and age", () => {
    expect(canDrive(25, null)).toMatch(/invalid/i);
    expect(canDrive("25", "US")).toMatch(/invalid/i);
    expect(canDrive(0, "US")).toMatch(/invalid/i);
  });
});

describe("fetchData", () => {
  it("should return an array of number on resolve", async () => {
    const result = await fetchData();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("Stack", () => {
  let elementsOfArray;
  beforeAll(() => {
    elementsOfArray = new Stack([1, 2, 3]);
  });

  it("Stack should have elments and return false for empty", () => {
    expect(elementsOfArray.isEmpty()).toBe(false);
  });

  it("should return array with 4 elements on push", () => {
    elementsOfArray.push(4);
    expect(elementsOfArray.size()).toBe(4);
    expect(elementsOfArray.items).toContain(4);
  });

  it("should return last expected element on pop", () => {
    expect(elementsOfArray.pop()).toBe(4);
  });

  it("should return last expected element on peek", () => {
    expect(elementsOfArray.peek()).toBe(3);
  });

  it("should return size as 3", () => {
    expect(elementsOfArray.size()).toBe(3);
  });

  it("Should return empty as true on clear", () => {
    elementsOfArray.clear();
    expect(elementsOfArray.isEmpty()).toBe(true);
  });
});

describe("Stack-Empty", () => {
  let elementsOfArray;
  beforeAll(() => {
    elementsOfArray = new Stack([]);
  });

  it("Stack should return true for empty", () => {
    expect(elementsOfArray.isEmpty()).toBe(true);
  });

  it("should return error on pop", () => {
    expect(() => elementsOfArray.pop()).toThrow(/empty/i);
  });

  it("should return error on peek", () => {
    expect(() => elementsOfArray.peek()).toThrow(/empty/i);
  });

  it("should return size as 0", () => {
    expect(elementsOfArray.size()).toBe(0);
  });
});
