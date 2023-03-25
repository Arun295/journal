import { combineReducers } from "redux";
import { Logged } from "./Logged";
import { ReadData, niftyFiftyData } from "./ReadData";
import { checkOrder } from "./OrderData";
import { setOhldata } from "./OhlData";

export default combineReducers({
  Log: Logged,
  DataCsv: ReadData,
  NiftyData: niftyFiftyData,
  Order: checkOrder,
  Ohl: setOhldata,
});
