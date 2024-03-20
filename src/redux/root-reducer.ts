import { combineReducers } from "redux";
import cryptoReducer from "./Coins/ruducer";

const rootReducer = combineReducers({
  cryptoReducer,
});

export default rootReducer;
