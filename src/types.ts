export interface ICoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  ath: number;
  atl: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  last_updated: string;
}

export interface IWalletData {
  address: string;
  balance: {
    eth: number;
  };
}

export interface IAppContext {
  coinsData: ICoin[];
  coinsGraficData: ICoin[];
  isLoading: boolean;
  walletData: IWalletData | null;
  walletConnected: boolean;
  fetchCoins: () => Promise<void>;
  fetchGraficCoins: () => Promise<void>;
  connectToMetaMask: () => Promise<IWalletData>;
  updateWalletData: () => Promise<void>;
}
