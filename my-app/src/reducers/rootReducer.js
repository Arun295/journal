import { combineReducers } from "redux";
import { Logged } from "./Logged";
import { ReadData, niftyFiftyData } from "./ReadData";
import { checkOrder } from "./OrderData";
import { setOhldata } from "./OhlData";
import { setGapUpDowndata } from "./GapupDown";
import { activateOhl, activateReversalGap } from "./TimeTrading";
export default combineReducers({
  Log: Logged,
  DataCsv: ReadData,
  NiftyData: niftyFiftyData,
  Order: checkOrder,
  Ohl: setOhldata,
  GapUD: setGapUpDowndata,
  activateOhl: activateOhl,
  activatereversal: activateReversalGap,
});
