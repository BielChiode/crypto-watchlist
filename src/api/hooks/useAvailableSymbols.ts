import { useEffect, useState } from 'react';
import { fetchSymbols } from '../binanceService';

interface MarketSymbol {
  symbol: string;
}

export function useAvailableSymbols() {
  const [availableSymbols, setAvailableSymbols] = useState<MarketSymbol[]>([]);

  useEffect(() => {
    async function fetchAvailableSymbols() {
      const result = await fetchSymbols();
      setAvailableSymbols(result);
    }
    fetchAvailableSymbols();
  }, []);

  return availableSymbols;
}
