import { describe, it, expect } from 'vitest';
import { factorailCalc } from '../src/factorial';

describe('factorailCalc', () => {
  it('should retrun NaN if the supplied argument is not a number', () => {
    expect(factorailCalc('a')).toBe(NaN);
  });

  it('should return 1 for 0 factorial', () => {
    expect(factorailCalc(0)).toBe(1);
  });

  it('should return 1 for 1 factorial', () => {
    expect(factorailCalc(1)).toBe(1);
  });

  it('should return 6 for 3 factorial', () => {
    expect(factorailCalc(3)).toBe(6);
  });
});
