import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/",
  headers: {
    "x-cg-demo-api-key": import.meta.env.API_KEY,
  },
});

export const useApi = () => ({
  getListCoinsCryptoCurrencies: async () => {
    const { data } = await api.get(
      "coins/markets/?vs_currency=usd&order=market_cap_desc&limit=10"
    );
    return data;
  },
});
