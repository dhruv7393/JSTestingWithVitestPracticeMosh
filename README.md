- Mock function immitates behaviour of real function.
- Meant to test unit in isolation for e.g func A calls func B, in such cases decoupling is required
- vi.jest.mock is used to define mock func and mockReturnValue is used to define return value
- `mockReturnValue` returns value
- `mockResolvedValue` retuns promise that resolves to value
- `mockImplementation` is used to define function that processes and returns
- `toHaveBeenCalled` makes sure the function was called
- `toHaveBeenCalledWith` makes sure the function was called but with specific arg value
- `toHaveBeenCalledOnce` for scenario where it should only be called once
- `mockRejectedValue` returns promise with error

```
describe("Mocking practice", () => {
  let mockfunc;
  beforeEach(() => {
    mockfunc = vi.fn();
  });
  it("mock function returns Mauli", () => {
    mockfunc.mockReturnValue("Mauli");
    expect(mockfunc()).toBe("Mauli");
    expect(mockfunc).toHaveBeenCalled();
  });

  it("should return Mauli on resolving", () => {
    mockfunc.mockResolvedValue("Mauli");
    mockfunc().then((value) => expect(value).toBe("Mauli"));
  });

  it("should return 3 on adding 1 and 2", () => {
    mockfunc.mockImplementation((a, b) => a + b);
    expect(mockfunc(1, 2)).toBe(3);
    expect(mockfunc).toHaveBeenCalledOnce();
    expect(mockfunc).toHaveBeenCalledWith(1, 2);
  });
});
```

For reject -

```
it("should return error", async () => {
    mockfunc.mockRejectedValue(new Error("error message"));
    try {
      await mockfunc();
    } catch (error) {
      expect(error.message).toMatch(/error/i);
    }

    //expect(async () => await mockfunc()).rejects.toThrow(/error/i);
  });
```

- `vi.mock(path from current place)` is used to mock module
- `vi.mocked(func).mockReturnValue()` to mock the function in file

- `Interaction testing` is meant to make sure connection between functions , `toHaveBeenCalled...` plays a major role. Mocked need not be used for this purpose

- `vi.mock` replaces every fuction with `vi.fn()` to avoid this and to use original

```
vi.mock("../src/libs/email", async (original) => {
  const originalFunctions = await original();
  return {
    ...originalFunctions,
    sendEmail: vi.fn(),
  };
});
```

- To get seperately arguments of mocked fucntion use - `vi.mocked(func).mock.calls[0]`

- `Spying function` is to monitor function during execution

- To get value passed by called fucntion we use `spy.mock.results[0].value`. Spy takes 2 param - 1st file ref from import and 2nd the method as string

```
describe("login", () => {
  it("should email otp", async () => {
    const email = "dhruv7393@gmail.com";
    const spy = vi.spyOn(security, "generateCode");
    await login(email);
    expect(sendEmail).toHaveBeenCalledWith(
      email,
      spy.mock.results[0].value.toString()
    );
  });
});
```

- It is preffered to clear mock functions before/ after each test
  `mockClear` - clears all info

```
vi.mocked(sendEmail).mockClear()
```

`mockReset` - mockClear, implementation is made empty
`mockRestore` - mockClear, restores to original implementation

- use specially with spy since vi clear and set to fn
- for spy implementation can be changed to spy.mockImplementation
- For multiple mock function we can use `vi.clearAllMocks()`

- Configs for vitest can be added in `vitest.config.js` - refer file for info
- Mocks should only be used with external service, db, api .. to avoid implementation related dependency

- `vi.setSystemTime('yyyy-mm-dd hh:mm')` can be used to simulate system time for testing
