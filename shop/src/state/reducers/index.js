import { combineReducers } from "redux";
import cartReducer from "./amountReducer";

const allreducers = combineReducers({
  mycart: cartReducer,
});

export default allreducers;
