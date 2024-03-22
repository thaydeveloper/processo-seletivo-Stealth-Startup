import { combineReducers } from "redux";
import cryptoReducer from "../features/Coins/ruducer";

const rootReducer = combineReducers({
  crypto: cryptoReducer,
});

export default rootReducer;
