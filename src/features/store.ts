import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./Coins/ruducer";

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

export default store;
