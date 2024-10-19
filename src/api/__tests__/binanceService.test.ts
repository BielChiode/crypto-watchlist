import { fetchSymbols } from '../binanceService';

global.fetch = jest.fn();

describe('fetchSymbols', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar a lista de símbolos ao receber uma resposta válida', async () => {
    const mockSymbols = [{ symbol: 'BTCUSDT' }, { symbol: 'ETHUSDT' }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ symbols: mockSymbols }),
    });

    const result = await fetchSymbols();
    expect(result).toEqual(mockSymbols);
    expect(fetch).toHaveBeenCalledWith(
      'https://api.binance.com/api/v3/exchangeInfo'
    );
  });

  it('deve lançar erro se a resposta não for ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const result = await fetchSymbols();
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      'Erro ao buscar os símbolos:',
      new Error('Erro na requisição: Not Found')
    );
  });

  it('deve retornar uma lista vazia se ocorrer um erro na requisição', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

    const result = await fetchSymbols();
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      'Erro ao buscar os símbolos:',
      new Error('Network Error')
    );
  });
});
