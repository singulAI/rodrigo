/**
 * @jest-environment node
 */

// Mock dependencies before importing
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  })),
}));

jest.mock('@neondatabase/serverless', () => ({
  Pool: jest.fn().mockImplementation(() => ({})),
  neonConfig: { webSocketConstructor: undefined },
}));

jest.mock('@prisma/adapter-neon', () => ({
  PrismaNeon: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('ws', () => ({}));

describe('Database configuration', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    jest.clearAllMocks();
    // Clear the module cache to get fresh imports
    jest.resetModules();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should create a standard Prisma client in local environment', () => {
    delete process.env.NETLIFY;
    delete process.env.DATABASE_URL;

    const { PrismaClient } = require('@prisma/client');
    const { prisma } = require('../db');

    expect(prisma).toBeDefined();
    expect(PrismaClient).toHaveBeenCalled();
  });

  it('should use Netlify database URL when NETLIFY is true', () => {
    process.env.NETLIFY = 'true';
    process.env.NETLIFY_DATABASE_URL = 'postgresql://netlify-url';

    // Re-import to get fresh instance
    jest.resetModules();
    const { Pool } = require('@neondatabase/serverless');
    const { PrismaNeon } = require('@prisma/adapter-neon');
    const { PrismaClient } = require('@prisma/client');
    const { prisma } = require('../db');

    expect(prisma).toBeDefined();
  });

  it('should use standard DATABASE_URL in non-Netlify environment', () => {
    delete process.env.NETLIFY;
    process.env.DATABASE_URL = 'postgresql://local-url';

    jest.resetModules();
    const { PrismaClient } = require('@prisma/client');
    const { prisma } = require('../db');

    expect(prisma).toBeDefined();
    expect(PrismaClient).toHaveBeenCalled();
  });

  it('should export prisma instance', () => {
    const { prisma } = require('../db');
    expect(prisma).toBeDefined();
  });

  it('should set neonConfig webSocketConstructor', () => {
    const { neonConfig } = require('@neondatabase/serverless');
    const db = require('../db');

    expect(neonConfig.webSocketConstructor).toBeDefined();
  });

  it('should create singleton instance', () => {
    const { prisma: prisma1 } = require('../db');
    const { prisma: prisma2 } = require('../db');

    expect(prisma1).toBe(prisma2);
  });
});

describe('Database client creation logic', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should handle missing environment variables gracefully', () => {
    delete process.env.DATABASE_URL;
    delete process.env.NETLIFY_DATABASE_URL;
    delete process.env.NETLIFY;

    const { PrismaClient } = require('@prisma/client');
    const { prisma } = require('../db');

    expect(prisma).toBeDefined();
    expect(PrismaClient).toHaveBeenCalled();
  });

  it('should prioritize Netlify configuration when flag is set', () => {
    process.env.NETLIFY = 'true';
    process.env.NETLIFY_DATABASE_URL = 'postgresql://netlify';
    process.env.DATABASE_URL = 'postgresql://standard';

    jest.resetModules();
    const { Pool } = require('@neondatabase/serverless');
    const db = require('../db');

    // When NETLIFY=true and NETLIFY_DATABASE_URL exists, Pool should be created
    expect(Pool).toHaveBeenCalled();
  });
});
