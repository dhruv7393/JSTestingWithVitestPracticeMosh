import { it, expect, describe } from 'vitest';
import { calculateDiscount } from '../src/core';

describe('calculateDiscount', () => {
  it('should return invalid for negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });
  it('should return price for  invalid discountCode', () => {
    expect(calculateDiscount(10, '10')).toBe(10);
  });
  it('should return discounted price for  valid discountCode', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });
});
