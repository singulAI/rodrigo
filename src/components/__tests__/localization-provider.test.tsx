import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { LocalizationProvider, Language } from '../localization-provider';
import { useLocalization } from '@/hooks/use-localization';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Test component that uses the hook
function TestComponent() {
  const { lang, changeLang, t } = useLocalization();
  return (
    <div>
      <p data-testid="current-lang">{lang}</p>
      <p data-testid="translation">
        {t({ pt: 'Olá Mundo', en: 'Hello World' })}
      </p>
      <button onClick={() => changeLang('en')} data-testid="change-to-en">
        Change to EN
      </button>
      <button onClick={() => changeLang('pt')} data-testid="change-to-pt">
        Change to PT
      </button>
    </div>
  );
}

describe('LocalizationProvider', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should render children', () => {
    render(
      <LocalizationProvider initialLang="en">
        <div data-testid="child">Test Child</div>
      </LocalizationProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should use initial language', () => {
    render(
      <LocalizationProvider initialLang="en">
        <TestComponent />
      </LocalizationProvider>
    );

    expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
  });

  it('should default to Portuguese when no initial language provided', () => {
    render(
      <LocalizationProvider>
        <TestComponent />
      </LocalizationProvider>
    );

    expect(screen.getByTestId('current-lang')).toHaveTextContent('pt');
  });

  it('should change language when changeLang is called', async () => {
    render(
      <LocalizationProvider initialLang="pt">
        <TestComponent />
      </LocalizationProvider>
    );

    expect(screen.getByTestId('current-lang')).toHaveTextContent('pt');

    const button = screen.getByTestId('change-to-en');
    act(() => {
      button.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
    });
  });

  it('should translate text based on current language', () => {
    render(
      <LocalizationProvider initialLang="pt">
        <TestComponent />
      </LocalizationProvider>
    );

    expect(screen.getByTestId('translation')).toHaveTextContent('Olá Mundo');
  });

  it('should update translation when language changes', async () => {
    render(
      <LocalizationProvider initialLang="pt">
        <TestComponent />
      </LocalizationProvider>
    );

    expect(screen.getByTestId('translation')).toHaveTextContent('Olá Mundo');

    const button = screen.getByTestId('change-to-en');
    act(() => {
      button.click();
    });

    await waitFor(() => {
      expect(screen.getByTestId('translation')).toHaveTextContent('Hello World');
    });
  });

  it('should save language to localStorage when changed', async () => {
    render(
      <LocalizationProvider initialLang="pt">
        <TestComponent />
      </LocalizationProvider>
    );

    const button = screen.getByTestId('change-to-en');
    act(() => {
      button.click();
    });

    await waitFor(() => {
      expect(localStorageMock.getItem('lang')).toBe('en');
    });
  });

  it('should load language from localStorage on mount', async () => {
    localStorageMock.setItem('lang', 'en');

    render(
      <LocalizationProvider>
        <TestComponent />
      </LocalizationProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
    });
  });

  it('should prioritize initialLang over localStorage', () => {
    localStorageMock.setItem('lang', 'en');

    render(
      <LocalizationProvider initialLang="pt">
        <TestComponent />
      </LocalizationProvider>
    );

    expect(screen.getByTestId('current-lang')).toHaveTextContent('pt');
  });

  it('should fallback to English translation when current language not available', () => {
    function TestFallback() {
      const { t } = useLocalization();
      return (
        <p data-testid="fallback-translation">
          {t({ en: 'English Only' } as any)}
        </p>
      );
    }

    render(
      <LocalizationProvider initialLang="pt">
        <TestFallback />
      </LocalizationProvider>
    );

    expect(screen.getByTestId('fallback-translation')).toHaveTextContent(
      'English Only'
    );
  });

  it('should ignore invalid localStorage values', async () => {
    localStorageMock.setItem('lang', 'invalid-lang');

    render(
      <LocalizationProvider>
        <TestComponent />
      </LocalizationProvider>
    );

    // Should default to 'pt' since invalid value is ignored
    await waitFor(() => {
      expect(screen.getByTestId('current-lang')).toHaveTextContent('pt');
    });
  });
});
