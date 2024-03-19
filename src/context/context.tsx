import React, { createContext, useState, useEffect, useContext } from "react";
import { useApi, connectToMetaMask, getWalletData } from "../services/axios";
import { IAppContext, ICoin, IWalletData } from "../types";

const AppContext = createContext<IAppContext>({
  coinsData: [],
  coinsGraficData: [],
  isLoading: false,
  walletData: null,
  walletConnected: false,
  fetchCoins: async () => {},
  fetchGraficCoins: async () => {},
  connectToMetaMask: async () => ({ address: "", balance: { eth: 0 } }),
  updateWalletData: async () => {},
});

export const AppProvider: React.FC = ({ children }) => {
  const [coinsData, setCoinsData] = useState<ICoin[]>([]);
  const [coinsGraficData, setCoinsGraficData] = useState<ICoin[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [walletData, setWalletData] = useState<IWalletData | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);

  const api = useApi();

  const fetchCoins = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await api.getListCoinsCryptoCurrencies();
      setCoinsData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchGraficCoins = async (coin: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await api.getListCoinsCryptoGraficos(coin);
      setCoinsGraficData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateWalletData = async (): Promise<void> => {
    try {
      const data = await getWalletData();
      setWalletData(data?.data);
      setWalletConnected(data.connected);
    } catch (error) {
      console.error("Error fetching wallet data", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        coinsData,
        isLoading,
        fetchCoins,
        walletData,
        walletConnected,
        connectToMetaMask,
        coinsGraficData,
        fetchGraficCoins,
        updateWalletData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
