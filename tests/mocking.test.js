import { vi, describe, it, expect, beforeEach, beforeAll } from 'vitest';
import {
  getDiscount,
  getPriceInCurrency,
  getShippingInfo,
  isOnline,
  login,
  renderPage,
  signUp,
  submitOrder,
} from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';
import { charge } from '../src/libs/payment';
import { sendEmail } from '../src/libs/email';
import security from '../src/libs/security';

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment');
vi.mock('../src/libs/email', async (original) => {
  const originalFunctions = await original();
  return {
    ...originalFunctions,
    sendEmail: vi.fn(),
  };
});

describe('Mocking practice', () => {
  let mockfunc;
  beforeEach(() => {
    mockfunc = vi.fn();
  });
  it('mock function returns Mauli', () => {
    mockfunc.mockReturnValue('Mauli');
    expect(mockfunc()).toBe('Mauli');
    expect(mockfunc).toHaveBeenCalled();
  });

  it('should return Mauli on resolving', () => {
    mockfunc.mockResolvedValue('Mauli');
    mockfunc().then((value) => expect(value).toBe('Mauli'));
  });

  it('should return 3 on adding 1 and 2', () => {
    mockfunc.mockImplementation((a, b) => a + b);
    expect(mockfunc(1, 2)).toBe(3);
    expect(mockfunc).toHaveBeenCalledOnce(); // - will fail for beforeAll
    expect(mockfunc).toHaveBeenCalledWith(1, 2);
  });

  it('should return error', async () => {
    mockfunc.mockRejectedValue(new Error('error message'));
    try {
      await mockfunc();
    } catch (error) {
      expect(error.message).toMatch(/error/i);
    }

    //expect(async () => await mockfunc()).rejects.toThrow(/error/i);
  });
});

describe('Send Message Mock', () => {
  let mockfunc;
  beforeAll(() => {
    mockfunc = vi.fn();
  });
  it('should return message sent on success', () => {
    mockfunc.mockImplementation(() => 'message sent');
    expect(mockfunc('Hello')).toMatch(/sent/i);
  });
});

describe('getPriceInCurrency', () => {
  it('should return 15 for exchange rate', () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);
    expect(getPriceInCurrency(10, 'AUD')).toBe(15);
  });
});

describe('getShippingInfo', () => {
  it('should retrun shipping cost as 15 for 10 days', () => {
    vi.mocked(getShippingQuote).mockReturnValue({
      cost: 15,
      estimatedDays: 10,
    });
    expect(getShippingInfo('India')).toMatch(/15/i);
    expect(getShippingInfo('India')).toMatch(/10 Days/i);
  });

  it('should return quote unavilable for not known country', () => {
    vi.mocked(getShippingQuote).mockReturnValue(undefined);
    expect(getShippingInfo('USA')).toMatch(/unavailable/i);
  });
});

//Interaction testing
describe('renderPage', () => {
  it('should return content on rendering', async () => {
    expect(await renderPage()).toMatch(/content/i);
  });

  it('should call trackPageView for analytics', async () => {
    await renderPage();
    expect(trackPageView).toHaveBeenCalledWith('/home');
  });
});

describe('submitOrder', () => {
  it('should call charge with number as 100 and amount as 10', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' }); // need it else it will replaced by vi.fn() as whole file is mocked at top
    await submitOrder({ totalAmount: 10 }, 100);
    expect(charge).toBeCalledWith(100, 10);
  });

  it('should return error for false amount', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'failed' });
    expect((await submitOrder({ totalAmount: '10' }, 100)).error).toMatch(
      /error/i,
    );
  });

  it('should call charge with number as 100 and amount as 10 and should be success', async () => {
    vi.mocked(charge).mockResolvedValue({ status: 'success' });
    const result = await submitOrder({ totalAmount: 10 }, 100);
    expect(result.success).toBeTruthy();
  });
});

describe('signUp', () => {
  it('should return true for valid email', async () => {
    const email = 'dhruv7393@gmail.com';
    expect(await signUp(email)).toBeTruthy();
    expect(sendEmail).toHaveBeenCalledOnce();
    expect(sendEmail).toHaveBeenCalled();

    const mockvalues = vi.mocked(sendEmail).mock.calls[0];
    expect(mockvalues[0]).toBe(email);
    expect(mockvalues[1]).toMatch(/welcome/i);
  });

  it('should return false for invalid email', async () => {
    expect(await signUp('$')).toBeFalsy();
  });
});

describe('login', () => {
  it('should email otp', async () => {
    const email = 'dhruv7393@gmail.com';
    const spy = vi.spyOn(security, 'generateCode');
    await login(email);
    expect(sendEmail).toHaveBeenCalledWith(
      email,
      spy.mock.results[0].value.toString(),
    );
  });
});

describe('isOnline', () => {
  it('should return false for time prior opening', () => {
    vi.setSystemTime('2025-03-02 07:59');
    expect(isOnline()).toBeFalsy();
  });

  it('should return true for time in buisness hours', () => {
    vi.setSystemTime('2025-03-02 08:01');
    expect(isOnline()).toBeTruthy();
  });
});

describe('getDiscount', () => {
  it('should return discount for christmas day', () => {
    vi.setSystemTime('2025-12-25 08:00');
    expect(getDiscount()).toBe(0.2);
  });

  it('should return discount for christmas day', () => {
    vi.setSystemTime('2025-12-28 08:00');
    expect(getDiscount()).toBe(0);
  });
});
