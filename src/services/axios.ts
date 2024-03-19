import axios from "axios";
import Web3 from "web3";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  headers: {
    "x-cg-demo-api-key":
      import.meta?.env?.API_KEY || "CG-woMJyKpRGFyMqhVzpxLW6X7T",
  },
});

const web3 = new Web3(window?.ethereum);

const cache: { [key: string]: any } = {};

export const useApi = () => ({
  getListCoinsCryptoCurrencies: async () => {
    try {
      if (cache.listCoinsCryptoCurrencies) {
        return cache.listCoinsCryptoCurrencies;
      } else {
        const { data } = await api.get(
          "coins/markets/?vs_currency=usd&order=market_cap_desc&limit=10"
        );

        cache.listCoinsCryptoCurrencies = data;
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  },
  getListCoinsCryptoGraficos: async (coin: string) => {
    console.log(coin?.id);
    try {
      const cacheKey = `listCoinsCryptoGraficos_${coin.id}`;
      if (cache[cacheKey]) {
        return cache[cacheKey];
      } else {
        const { data } = await api.get(
          `coins/${coin?.id}/ohlc?vs_currency=usd&days=7&precision=full`
        );

        cache[cacheKey] = data;
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  },
});

async function connectToMetaMask() {
  try {
    const accounts = await window?.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length > 0) {
      const balance = await web3.eth.getBalance(accounts[0]);
      return {
        connected: true,
        address: accounts[0],
        balance: web3.utils.fromWei(balance, "ether"),
      };
    } else {
      throw new Error("Usuário não conectou a carteira.");
    }
  } catch (error) {
    console.error("Erro ao conectar a MetaMask:", error);
    throw error;
  }
}

async function getWalletData() {
  const { connected, address, balance } = await connectToMetaMask();
  return {
    connected,
    data: {
      address,
      balance: {
        eth: balance,
      },
    },
  };
}

export { connectToMetaMask, getWalletData };
