import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useApi } from "../../services/axios";

const initialState = {
  coinsData: [],
  coinsDataGraphic: [],
  loading: false,
  error: null,
};

const api = useApi();

export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
  try {
    const data = await api.getListCoinsCryptoCurrencies();

    return data;
  } catch (error) {
    throw new Error("Failed to fetch coins data");
  }
});
export const fetchCoinsGraphic = createAsyncThunk(
  "coins/fetchCoins/Graphic",
  async (id, days, currency) => {
    try {
      const data = await api.getListCoinsCryptoGraphic({ id, days, currency });

      return data;
    } catch (error) {
      throw new Error("Failed to fetch coins data");
    }
  }
);

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.coinsData = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch coins data";
      });
    builder
      .addCase(fetchCoinsGraphic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoinsGraphic.fulfilled, (state, action) => {
        state.loading = false;
        state.coinsDataGraphic = action.payload;
      })
      .addCase(fetchCoinsGraphic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch coins data";
      });
  },
});

export default coinsSlice.reducer;
