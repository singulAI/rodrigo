import { renderHook, act } from '@testing-library/react';
import { useLocalization } from '../use-localization';
import { LocalizationProvider } from '@/components/localization-provider';
import React from 'react';

describe('useLocalization hook', () => {
  it('should throw error when used outside LocalizationProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      renderHook(() => useLocalization());
    }).toThrow('useLocalization must be used within a LocalizationProvider');

    console.error = originalError;
  });

  it('should return localization context when used within provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LocalizationProvider initialLang="en">{children}</LocalizationProvider>
    );

    const { result } = renderHook(() => useLocalization(), { wrapper });

    expect(result.current).toHaveProperty('lang');
    expect(result.current).toHaveProperty('changeLang');
    expect(result.current).toHaveProperty('t');
    expect(result.current.lang).toBe('en');
  });

  it('should return correct language', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LocalizationProvider initialLang="pt">{children}</LocalizationProvider>
    );

    const { result } = renderHook(() => useLocalization(), { wrapper });

    expect(result.current.lang).toBe('pt');
  });

  it('should allow changing language', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LocalizationProvider initialLang="en">{children}</LocalizationProvider>
    );

    const { result } = renderHook(() => useLocalization(), { wrapper });

    act(() => {
      result.current.changeLang('pt');
    });

    expect(result.current.lang).toBe('pt');
  });

  it('should translate text correctly', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LocalizationProvider initialLang="pt">{children}</LocalizationProvider>
    );

    const { result } = renderHook(() => useLocalization(), { wrapper });

    const translation = result.current.t({
      pt: 'Olá',
      en: 'Hello',
    });

    expect(translation).toBe('Olá');
  });

  it('should fallback to English when translation is missing', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LocalizationProvider initialLang="pt">{children}</LocalizationProvider>
    );

    const { result } = renderHook(() => useLocalization(), { wrapper });

    const translation = result.current.t({
      en: 'Hello',
    } as any);

    expect(translation).toBe('Hello');
  });
});
