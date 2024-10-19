import { renderHook, waitFor } from '@testing-library/react';
import { useAvailableSymbols } from '../useAvailableSymbols';
import { fetchSymbols } from '../../binanceService';

jest.mock('../../binanceService');

describe('useAvailableSymbols', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar uma lista de símbolos disponíveis', async () => {
    const mockSymbols = [{ symbol: 'BTCUSDT' }, { symbol: 'ETHUSDT' }];
    (fetchSymbols as jest.Mock).mockResolvedValueOnce(mockSymbols);
    const { result } = renderHook(() => useAvailableSymbols());
    await waitFor(() => {
      expect(result.current).toEqual(mockSymbols);
    });
    expect(fetchSymbols).toHaveBeenCalledTimes(1);
  });

  it('deve retornar uma lista vazia quando ocorrer um erro', async () => {
    (fetchSymbols as jest.Mock).mockImplementation(
      () => new Error('Erro na requisição')
    );
    const { result } = renderHook(() => useAvailableSymbols());
    await waitFor(() => {
      expect(result.current).toEqual([]);
    });
    expect(fetchSymbols).toHaveBeenCalledTimes(1);
  });
});
