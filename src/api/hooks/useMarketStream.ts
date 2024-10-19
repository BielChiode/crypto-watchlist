import { useState, useEffect, useRef } from 'react';
import { PriceInfo } from '../../types/PriceInfo';

export const useMarketStream = (symbols: string[]) => {
  const [priceData, updatePriceData] = useState<Record<string, PriceInfo>>({});
  const [isFetching, setFetching] = useState<boolean>(true);

  const socket = useRef<WebSocket | null>(null);
  const bufferedUpdates = useRef<Record<string, PriceInfo>>({});

  useEffect(() => {
    if (symbols.length === 0) {
      setFetching(false);
      updatePriceData({});
      return;
    }

    setFetching(true);
    bufferedUpdates.current = {};

    if (socket.current) {
      socket.current.close();
    }

    const streamPaths = symbols
      .map((s) => `${s.toLowerCase()}@ticker`)
      .join('/');
    const endpoint = `wss://stream.binance.com:9443/stream?streams=${streamPaths}`;

    const wsConnection = new WebSocket(endpoint);
    socket.current = wsConnection;

    wsConnection.onmessage = (msg) => {
      const parsed = JSON.parse(msg.data);

      if (parsed?.data) {
        const {
          s: sym,
          c: last,
          P: changePercent,
          b: bid,
          a: ask,
        } = parsed.data;

        bufferedUpdates.current[sym] = { last, changePercent, bid, ask };
        updatePriceData((prev) => ({ ...prev, ...bufferedUpdates.current }));
        setFetching(false);
      }
    };

    wsConnection.onclose = () => {
      socket.current = null;
    };

    return () => {
      if (socket.current?.readyState === WebSocket.OPEN) {
        socket.current.close();
      }
    };
  }, [symbols]);

  return { priceData, isFetching };
};
