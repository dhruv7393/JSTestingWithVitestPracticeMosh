import { describe, it, test, expect } from "vitest";
import { getCoupons } from "../src/core";

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
