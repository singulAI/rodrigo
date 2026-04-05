import { GET } from '../route';
import { NextResponse } from 'next/server';

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data) => ({
      json: async () => data,
      status: 200,
    })),
  },
}));

describe('Health API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return healthy status', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data).toHaveProperty('status', 'healthy');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('environment');
  });

  it('should return a valid ISO timestamp', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data.timestamp).toBeDefined();
    const date = new Date(data.timestamp);
    expect(date.toISOString()).toBe(data.timestamp);
  });

  it('should detect Netlify environment', async () => {
    const originalEnv = process.env.NETLIFY;
    process.env.NETLIFY = 'true';

    const response = await GET();
    const data = await response.json();

    expect(data.environment).toBe('netlify');

    process.env.NETLIFY = originalEnv;
  });

  it('should detect local environment', async () => {
    const originalEnv = process.env.NETLIFY;
    delete process.env.NETLIFY;

    const response = await GET();
    const data = await response.json();

    expect(data.environment).toBe('local');

    process.env.NETLIFY = originalEnv;
  });

  it('should use NextResponse.json', async () => {
    await GET();
    expect(NextResponse.json).toHaveBeenCalled();
  });
});
