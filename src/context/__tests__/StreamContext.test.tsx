import React, { act } from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import { PriceInfo } from '../../types/PriceInfo';
import { StreamProvider, useStream } from '../StreamContext';

jest.mock('../../api/hooks/useMarketStream', () => ({
  useMarketStream: (symbols: string[]) => ({
    priceData: symbols.reduce<Record<string, PriceInfo>>((acc, symbol) => {
      acc[symbol] = {
        last: '100.00',
        changePercent: '0.05',
        bid: '99.50',
        ask: '100.50',
      };
      return acc;
    }, {}),
    isFetching: false,
  }),
}));

const TestComponent = () => {
  const { priceData, registerSymbol, isFetching } = useStream();

  React.useEffect(() => {
    registerSymbol('BTCUSD');
  }, [registerSymbol]);

  return (
    <div>
      <div data-testid="is-fetching">
        {isFetching ? 'Fetching' : 'Not Fetching'}
      </div>
      <div data-testid="price-data">{JSON.stringify(priceData)}</div>
    </div>
  );
};

describe('StreamProvider', () => {
  it('renderiza filhos e fornece valores do contexto', () => {
    render(
      <StreamProvider>
        <TestComponent />
      </StreamProvider>
    );

    expect(screen.getByTestId('is-fetching')).toHaveTextContent('Not Fetching');
    expect(screen.getByTestId('price-data')).toHaveTextContent(
      JSON.stringify({
        BTCUSD: {
          last: '100.00',
          changePercent: '0.05',
          bid: '99.50',
          ask: '100.50',
        },
      })
    );
  });

  it('lança erro quando useStream é usado fora do StreamProvider', () => {
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'useStream must be used within a StreamProvider'
    );

    consoleErrorMock.mockRestore();
  });

  it('registra símbolos corretamente', () => {
    render(
      <StreamProvider>
        <TestComponent />
      </StreamProvider>
    );

    expect(screen.getByTestId('price-data')).toHaveTextContent('BTCUSD');
  });

  it('assegura que registerSymbol evita símbolos duplicados', () => {
    const { result } = renderHook(() => useStream(), {
      wrapper: StreamProvider,
    });

    act(() => {
      result.current.registerSymbol('BTCUSD');
      result.current.registerSymbol('BTCUSD');
    });

    expect(Object.keys(result.current.priceData)).toEqual(['BTCUSD']);
  });
});
