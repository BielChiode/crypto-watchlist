import React, {
  createContext,
  useState,
  useContext,
  type ReactNode,
} from 'react';
import { useMarketStream } from '../api/hooks/useMarketStream';
import { PriceInfo } from '../types/PriceInfo';

interface StreamContextData {
  priceData: Record<string, PriceInfo>;
  registerSymbol: (symbol: string) => void;
  isFetching: boolean;
}

const StreamContext = createContext<StreamContextData | null>(null);

export const useStream = (): StreamContextData => {
  const context = useContext(StreamContext);
  if (!context) {
    throw new Error('useStream must be used within a StreamProvider');
  }
  return context;
};

export function StreamProvider({ children }: { children: ReactNode }) {
  const [symbols, setSymbols] = useState<string[]>([]);
  const { priceData, isFetching } = useMarketStream(symbols);

  const registerSymbol = (symbol: string) => {
    setSymbols((existing) =>
      existing.includes(symbol) ? existing : [...existing, symbol]
    );
  };

  return (
    <StreamContext.Provider value={{ priceData, registerSymbol, isFetching }}>
      {children}
    </StreamContext.Provider>
  );
}
