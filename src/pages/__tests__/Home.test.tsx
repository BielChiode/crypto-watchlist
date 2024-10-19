import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';
import { StreamProvider } from '../../context/StreamContext';

describe('Home Component', () => {
  beforeEach(() => {
    render(
      <StreamProvider>
        <Home />
      </StreamProvider>
    );
  });

  it('deve renderizar o componente SymbolList', () => {
    const symbolList = screen.getByTestId('symbol-list');
    expect(symbolList).toBeInTheDocument();
  });

  it('deve renderizar o componente MarketWatch', () => {
    const marketWatch = screen.getByTestId('market-watch');
    expect(marketWatch).toBeInTheDocument();
  });

  it('deve renderizar ambos os componentes dentro do Container', () => {
    const container = screen.getByTestId('grid-container');
    expect(container).toContainElement(screen.getByTestId('symbol-list'));
    expect(container).toContainElement(screen.getByTestId('market-watch'));
  });
});
