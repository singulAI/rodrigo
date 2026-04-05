# Testing Guide

## Quick Start

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (recommended during development)
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage

# Run a specific test file
npm test -- path/to/test.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="localization"
```

### Writing Your First Test

1. Create a test file next to the code you're testing:
   ```
   src/
     components/
       my-component.tsx
       __tests__/
         my-component.test.tsx
   ```

2. Write a basic test:
   ```typescript
   import { render, screen } from '@testing-library/react';
   import MyComponent from '../my-component';

   describe('MyComponent', () => {
     it('should render correctly', () => {
       render(<MyComponent />);
       expect(screen.getByText('Hello')).toBeInTheDocument();
     });
   });
   ```

## Test Organization

### Directory Structure

```
src/
  lib/
    __tests__/
      utils.test.ts
      data.test.ts
      db.test.ts
  components/
    __tests__/
      component-name.test.tsx
  hooks/
    __tests__/
      use-hook-name.test.tsx
  contexts/
    __tests__/
      context-name.test.tsx
  app/
    api/
      endpoint/
        __tests__/
          route.test.ts
  __tests__/
    i18n.test.ts
    middleware.test.ts
```

### Naming Conventions

- Test files: `*.test.ts` or `*.test.tsx`
- Test directories: `__tests__/`
- Test descriptions: Use clear, descriptive names
  - ✅ `it('should update language when changeLang is called', ...)`
  - ❌ `it('works', ...)`

## Common Testing Patterns

### Testing React Components

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import MyButton from '../my-button';

describe('MyButton', () => {
  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<MyButton onClick={handleClick}>Click me</MyButton>);

    fireEvent.click(screen.getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { useMyHook } from '../use-my-hook';

describe('useMyHook', () => {
  it('should update value', () => {
    const { result } = renderHook(() => useMyHook());

    act(() => {
      result.current.setValue('new value');
    });

    expect(result.current.value).toBe('new value');
  });
});
```

### Testing with Context Providers

```typescript
import { render } from '@testing-library/react';
import { MyProvider } from '@/contexts/my-context';
import MyComponent from '../my-component';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MyProvider>{children}</MyProvider>
);

describe('MyComponent with context', () => {
  it('should render with context', () => {
    const { result } = renderHook(() => useMyContext(), { wrapper });
    // ... assertions
  });
});
```

### Testing API Routes

```typescript
import { GET } from '../route';

describe('API Route', () => {
  it('should return expected data', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data).toHaveProperty('status');
  });
});
```

### Mocking Dependencies

```typescript
// Mock a module
jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findMany: jest.fn().mockResolvedValue([]),
    },
  },
}));

// Mock a function
const mockFunction = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;
```

## Best Practices

### 1. Test Behavior, Not Implementation

✅ **Good**: Test what the component does
```typescript
it('should display error message when validation fails', () => {
  render(<Form />);
  fireEvent.click(screen.getByText('Submit'));
  expect(screen.getByText('Required field')).toBeInTheDocument();
});
```

❌ **Bad**: Test implementation details
```typescript
it('should set hasError state to true', () => {
  const { rerender } = render(<Form />);
  // Testing internal state
});
```

### 2. Use Descriptive Test Names

Format: `should [expected behavior] when [condition]`

```typescript
describe('LoginForm', () => {
  it('should show error message when password is too short', () => {});
  it('should enable submit button when all fields are valid', () => {});
  it('should call onSubmit with form data when submitted', () => {});
});
```

### 3. Keep Tests Focused

Each test should verify one thing:

```typescript
// ✅ Good - one assertion per test
it('should display username', () => {
  render(<Profile user={mockUser} />);
  expect(screen.getByText(mockUser.name)).toBeInTheDocument();
});

it('should display email', () => {
  render(<Profile user={mockUser} />);
  expect(screen.getByText(mockUser.email)).toBeInTheDocument();
});

// ❌ Bad - too many assertions
it('should display user info', () => {
  render(<Profile user={mockUser} />);
  expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  expect(screen.getByText(mockUser.bio)).toBeInTheDocument();
  // ... many more
});
```

### 4. Clean Up After Tests

```typescript
describe('MyComponent', () => {
  beforeEach(() => {
    // Setup
    localStorage.clear();
  });

  afterEach(() => {
    // Cleanup
    jest.clearAllMocks();
  });
});
```

### 5. Test Edge Cases

```typescript
describe('parseInput', () => {
  it('should handle normal input', () => {});
  it('should handle empty string', () => {});
  it('should handle null', () => {});
  it('should handle undefined', () => {});
  it('should handle special characters', () => {});
});
```

## Debugging Tests

### Run a Single Test

```bash
npm test -- --testNamePattern="should render correctly"
```

### Use `only` During Development

```typescript
it.only('should test this one', () => {
  // This is the only test that will run
});
```

### Enable Verbose Output

```bash
npm test -- --verbose
```

### Use `debug` from Testing Library

```typescript
import { render, screen } from '@testing-library/react';

it('should debug output', () => {
  const { debug } = render(<MyComponent />);
  debug(); // Prints the DOM to console
});
```

## Common Issues and Solutions

### Issue: "Cannot find module"

**Solution**: Check your path aliases in `tsconfig.json` and `jest.config.js`

### Issue: "ReferenceError: localStorage is not defined"

**Solution**: Mock localStorage in your test or setup file

```typescript
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;
```

### Issue: "useContext returns null"

**Solution**: Wrap your component in the appropriate provider

```typescript
const wrapper = ({ children }) => (
  <MyProvider>{children}</MyProvider>
);

render(<MyComponent />, { wrapper });
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Getting Help

1. Check existing tests for examples
2. Review the [Testing Library documentation](https://testing-library.com/)
3. Ask in code reviews
4. Run tests with `--verbose` for more details

## Coverage Goals

- **Utilities**: 100% coverage
- **Components**: Minimum 80% coverage
- **Hooks**: 100% coverage
- **API Routes**: 100% coverage
- **Context Providers**: 100% coverage

Run coverage report:
```bash
npm test -- --coverage
```
