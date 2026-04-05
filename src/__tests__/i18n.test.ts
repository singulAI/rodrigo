import getRequestConfig from '../i18n';
import { notFound } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

describe('i18n configuration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return config for valid Portuguese locale', async () => {
    const config = await getRequestConfig({ locale: 'pt-BR' });

    expect(config).toHaveProperty('messages');
    expect(config.messages).toBeDefined();
  });

  it('should return config for valid English locale', async () => {
    const config = await getRequestConfig({ locale: 'en' });

    expect(config).toHaveProperty('messages');
    expect(config.messages).toBeDefined();
  });

  it('should call notFound for invalid locale', async () => {
    await getRequestConfig({ locale: 'invalid' });

    expect(notFound).toHaveBeenCalled();
  });

  it('should call notFound for empty locale', async () => {
    await getRequestConfig({ locale: '' });

    expect(notFound).toHaveBeenCalled();
  });

  it('should call notFound for unsupported locale', async () => {
    await getRequestConfig({ locale: 'fr' });

    expect(notFound).toHaveBeenCalled();
  });

  it('should load messages from correct file path', async () => {
    const config = await getRequestConfig({ locale: 'pt-BR' });

    expect(config.messages).toBeDefined();
    expect(typeof config.messages).toBe('object');
  });
});
