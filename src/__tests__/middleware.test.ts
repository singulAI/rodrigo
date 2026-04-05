import middleware, { config } from '../middleware';

// Mock next-intl/middleware
jest.mock('next-intl/middleware', () => {
  return jest.fn((config) => {
    return (request: any) => {
      // Simple mock implementation
      return {
        ...config,
        request,
      };
    };
  });
});

describe('Middleware', () => {
  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should have correct matcher configuration', () => {
    expect(config).toHaveProperty('matcher');
    expect(Array.isArray(config.matcher)).toBe(true);
  });

  it('should match root path', () => {
    const matchers = config.matcher;
    expect(matchers).toContain('/');
  });

  it('should match internationalized pathnames', () => {
    const matchers = config.matcher;
    const intlMatcher = matchers.find((m: string) =>
      m.includes('pt-BR')
    );
    expect(intlMatcher).toBeDefined();
    expect(intlMatcher).toContain('en');
  });

  it('should include both supported locales in matcher', () => {
    const matchers = config.matcher;
    const intlMatcher = matchers.find((m: string) =>
      m.includes('pt-BR')
    ) as string;

    expect(intlMatcher).toContain('pt-BR');
    expect(intlMatcher).toContain('en');
  });
});

describe('Middleware configuration', () => {
  it('should export config object', () => {
    expect(config).toBeDefined();
    expect(typeof config).toBe('object');
  });

  it('should have matcher as array', () => {
    expect(Array.isArray(config.matcher)).toBe(true);
    expect(config.matcher.length).toBeGreaterThan(0);
  });

  it('should match expected number of patterns', () => {
    expect(config.matcher.length).toBe(2);
  });
});
