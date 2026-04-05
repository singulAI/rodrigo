import React from 'react';
import { render, screen, act } from '@testing-library/react';
import {
  HeroAnimationProvider,
  useHeroAnimation,
} from '../hero-animation-context';

// Test component that uses the hook
function TestComponent() {
  const { isSyncing, syncText, startSync } = useHeroAnimation();
  return (
    <div>
      <p data-testid="is-syncing">{isSyncing ? 'true' : 'false'}</p>
      <p data-testid="sync-text">{syncText}</p>
      <button
        onClick={() => startSync('Test Sync Text')}
        data-testid="start-sync"
      >
        Start Sync
      </button>
    </div>
  );
}

describe('HeroAnimationContext', () => {
  it('should render children', () => {
    render(
      <HeroAnimationProvider>
        <div data-testid="child">Test Child</div>
      </HeroAnimationProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should initialize with default values', () => {
    render(
      <HeroAnimationProvider>
        <TestComponent />
      </HeroAnimationProvider>
    );

    expect(screen.getByTestId('is-syncing')).toHaveTextContent('false');
    expect(screen.getByTestId('sync-text')).toHaveTextContent('');
  });

  it('should update isSyncing when startSync is called', () => {
    render(
      <HeroAnimationProvider>
        <TestComponent />
      </HeroAnimationProvider>
    );

    expect(screen.getByTestId('is-syncing')).toHaveTextContent('false');

    const button = screen.getByTestId('start-sync');
    act(() => {
      button.click();
    });

    expect(screen.getByTestId('is-syncing')).toHaveTextContent('true');
  });

  it('should update syncText when startSync is called', () => {
    render(
      <HeroAnimationProvider>
        <TestComponent />
      </HeroAnimationProvider>
    );

    expect(screen.getByTestId('sync-text')).toHaveTextContent('');

    const button = screen.getByTestId('start-sync');
    act(() => {
      button.click();
    });

    expect(screen.getByTestId('sync-text')).toHaveTextContent('Test Sync Text');
  });

  it('should throw error when useHeroAnimation is used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useHeroAnimation must be used within a HeroAnimationProvider');

    console.error = originalError;
  });

  it('should allow multiple startSync calls', () => {
    function MultiSyncComponent() {
      const { syncText, startSync } = useHeroAnimation();
      return (
        <div>
          <p data-testid="sync-text">{syncText}</p>
          <button
            onClick={() => startSync('First')}
            data-testid="sync-first"
          >
            First
          </button>
          <button
            onClick={() => startSync('Second')}
            data-testid="sync-second"
          >
            Second
          </button>
        </div>
      );
    }

    render(
      <HeroAnimationProvider>
        <MultiSyncComponent />
      </HeroAnimationProvider>
    );

    act(() => {
      screen.getByTestId('sync-first').click();
    });
    expect(screen.getByTestId('sync-text')).toHaveTextContent('First');

    act(() => {
      screen.getByTestId('sync-second').click();
    });
    expect(screen.getByTestId('sync-text')).toHaveTextContent('Second');
  });
});

describe('useHeroAnimation hook', () => {
  it('should return context values', () => {
    function TestHook() {
      const context = useHeroAnimation();
      return (
        <div>
          <p data-testid="has-context">
            {context ? 'has-context' : 'no-context'}
          </p>
        </div>
      );
    }

    render(
      <HeroAnimationProvider>
        <TestHook />
      </HeroAnimationProvider>
    );

    expect(screen.getByTestId('has-context')).toHaveTextContent('has-context');
  });

  it('should provide startSync function', () => {
    function TestStartSync() {
      const { startSync } = useHeroAnimation();
      return (
        <div>
          <p data-testid="has-start-sync">
            {typeof startSync === 'function' ? 'function' : 'not-function'}
          </p>
        </div>
      );
    }

    render(
      <HeroAnimationProvider>
        <TestStartSync />
      </HeroAnimationProvider>
    );

    expect(screen.getByTestId('has-start-sync')).toHaveTextContent('function');
  });
});
