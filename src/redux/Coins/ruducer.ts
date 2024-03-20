import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICoin } from "../../types";

interface CryptoState {
  coins: ICoin[];
}

const initialState: CryptoState = {
  coins: [],
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCoins(state, action: PayloadAction<any[]>) {
      state.coins = action.payload;
    },
  },
});

export const { setCoins } = cryptoSlice.actions;

export default cryptoSlice.reducer;
