import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import SymbolList from '../SymbolList';
import { useStream } from '../../context/StreamContext';
import { useAvailableSymbols } from '../../api/hooks/useAvailableSymbols';

jest.mock('../../context/StreamContext', () => ({
  useStream: jest.fn(),
}));

jest.mock('../../api/hooks/useAvailableSymbols', () => ({
  useAvailableSymbols: jest.fn(),
}));

describe('SymbolList Component', () => {
  const mockRegisterSymbol = jest.fn();
  const mockUseStream = {
    registerSymbol: mockRegisterSymbol,
    isFetching: false,
  };

  const availableSymbolsMock = [
    { symbol: 'BTCUSD' },
    { symbol: 'ETHUSD' },
    { symbol: 'XRPUSD' },
    { symbol: 'BNBUSD' },
    { symbol: 'SOLUSD' },
    { symbol: 'AXSUSD' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useStream as jest.Mock).mockReturnValue(mockUseStream);
    (useAvailableSymbols as jest.Mock).mockReturnValue(availableSymbolsMock);
  });

  it('deve renderizar corretamente', () => {
    render(<SymbolList />);

    expect(screen.getByLabelText(/Find Symbol/i)).toBeInTheDocument();
    expect(screen.getByText(/Add symbols/i)).toBeInTheDocument();
  });

  it('deve mostrar os simbolos disponiveis', () => {
    render(<SymbolList />);

    availableSymbolsMock.forEach(({ symbol }) => {
      expect(screen.getByLabelText(symbol)).toBeInTheDocument();
    });
  });

  it('deve deixar selecionar e adicionar simbolos', () => {
    render(<SymbolList />);

    const appleCheckbox = screen.getByLabelText('BTCUSD');
    fireEvent.click(appleCheckbox);

    expect(appleCheckbox).toBeChecked();

    const addButton = screen.getByText(/Add symbols/i);
    fireEvent.click(addButton);

    expect(mockRegisterSymbol).toHaveBeenCalledWith('BTCUSD');
  });

  it('deve filtrar simbolos com base no input', () => {
    render(<SymbolList />);

    const searchInput = screen.getByLabelText(/Find Symbol/i);
    fireEvent.change(searchInput, { target: { value: 'ETHUSD' } });

    expect(screen.getByLabelText('ETHUSD')).toBeInTheDocument();
    expect(screen.queryByLabelText('BTCUSD')).not.toBeInTheDocument();
  });

  it('deve desabilitar o botao de adicionar quando nao tiver simbolos selecionados', () => {
    render(<SymbolList />);

    const addButton = screen.getByText(/Add symbols/i);
    expect(addButton).toBeDisabled();
  });

  it('deve limitar a selecao de simbolos ate 5', () => {
    render(<SymbolList />);

    availableSymbolsMock.slice(0, 5).forEach(({ symbol }) => {
      const checkbox = screen.getByLabelText(symbol);
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    const sixthCheckbox = screen.getByLabelText('SOLUSD');
    expect(sixthCheckbox).toBeDisabled();
  });
});
