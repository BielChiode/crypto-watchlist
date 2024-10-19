import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MarketWatch from '../MarketWatch';
import { useStream } from '../../context/StreamContext';

jest.mock('../../context/StreamContext', () => ({
  useStream: jest.fn(),
}));

describe('MarketWatch', () => {
  test('exibe o loader enquanto os dados estão sendo buscados', () => {
    (useStream as jest.Mock).mockReturnValue({
      priceData: {},
      isFetching: true,
    });

    render(<MarketWatch />);

    const loader = screen.getByTestId('loading-spinner');
    expect(loader).toBeInTheDocument();
  });

  test('exibe mensagem de "No symbols available" quando não há dados', () => {
    (useStream as jest.Mock).mockReturnValue({
      priceData: {},
      isFetching: false,
    });

    render(<MarketWatch />);

    expect(
      screen.getByText('No symbols available to display')
    ).toBeInTheDocument();
  });

  test('renderiza corretamente a tabela com dados dos símbolos', () => {
    (useStream as jest.Mock).mockReturnValue({
      priceData: {
        BTCUSD: {
          last: '150.23',
          bid: '149.80',
          ask: '150.50',
          changePercent: '0.02',
        },
        ETHUSD: {
          last: '750.15',
          bid: '749.90',
          ask: '751.00',
          changePercent: '-0.01',
        },
      },
      isFetching: false,
    });

    render(<MarketWatch />);

    expect(screen.getByText('BTCUSD')).toBeInTheDocument();
    expect(screen.getByText('$150.2300')).toBeInTheDocument();
    expect(screen.getByText('$149.8000')).toBeInTheDocument();
    expect(screen.getByText('$150.5000')).toBeInTheDocument();
    expect(screen.getByText('2.00%')).toBeInTheDocument();

    expect(screen.getByText('ETHUSD')).toBeInTheDocument();
    expect(screen.getByText('$750.1500')).toBeInTheDocument();
    expect(screen.getByText('$749.9000')).toBeInTheDocument();
    expect(screen.getByText('$751.0000')).toBeInTheDocument();
    expect(screen.getByText('1.00%')).toBeInTheDocument();
  });
});
