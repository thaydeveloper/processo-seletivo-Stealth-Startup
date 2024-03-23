import axios from "axios";
import Web3 from "web3";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  headers: {
    "x-cg-demo-api-key": import.meta?.env?.API_KEY,
  },
});

const web3 = new Web3(window?.ethereum);

const cache: { [key: string]: any } = {};
const RETRY_DELAY = 30000;
const MAX_RETRIES = 3;

export const useApi = () => ({
  getListCoinsCryptoCurrencies: async () => {
    const cacheKey = "listCoinsCryptoCurrencies";
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }

    try {
      const response = await retryFetch(async () => {
        return await api.get(
          "coins/markets/?vs_currency=usd&order=market_cap_desc&per_page=10"
        );
      });
      cache[cacheKey] = response.data;
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        throw new Error("Too many requests. Please try again later.");
      } else {
        throw error;
      }
    }
  },

  getListCoinsCryptoGraphic: async ({ id }) => {
    const cacheKey = `listCoinsCryptoGraficos_${id?.id}`;
    if (cache[cacheKey]) {
      return cache[cacheKey];
    }
    try {
      const response = await retryFetch(async () => {
        return await api.get(
          `coins/${id?.id}/market_chart?vs_currency=${id?.currency}&days=${id?.days}
          `
        );
      });
      cache[cacheKey] = response.data;
      return response.data;
    } catch (error) {
      throw error;
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

async function retryFetch(fetchFunction, retries = MAX_RETRIES) {
  try {
    return await fetchFunction();
  } catch (error) {
    if (retries > 0) {
      console.warn(
        `Request failed, retrying in ${RETRY_DELAY}ms. Retries left: ${
          retries - 1
        }`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      return retryFetch(fetchFunction, retries - 1);
    } else {
      throw error;
    }
  }
}
