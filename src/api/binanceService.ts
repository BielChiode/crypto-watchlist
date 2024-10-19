export async function fetchSymbols(): Promise<{ symbol: string }[]> {
  try {
    const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data.symbols;
  } catch (error) {
    console.error('Erro ao buscar os símbolos:', error);
    return [];
  }
}
