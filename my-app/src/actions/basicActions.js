import {
  SET_LOGGED,
  SET_ORDER_DATA,
  SET_READ_WHOLEDATA,
  SET_NIFTY_DATA,
  SET_EXECUTION,
  SET_CANVAS,
  UNSET_ORDER_DATA,
  SET_GAPUPDOWN,
  SET_POSITION_PAGE,
  UNSET_POSITION_PAGE,
  ACTIVATE_REVERSAL_GAP,
  ACTIVATE_OHL,
} from "../constants/constants";

export const loger = (payload) => {
  //   console.log(payload);
  return { type: SET_LOGGED, payload };
};

export const readData = (payload) => {
  // console.log(payload);
  return { type: SET_READ_WHOLEDATA, payload };
};
export const niftyData = (payload) => {
  // console.log(payload);
  return { type: SET_NIFTY_DATA, payload };
};

export const orderData = (payload) => {
  // console.log(payload);
  return { type: SET_ORDER_DATA, payload };
};
export const unsetOrderData = (payload) => {
  // console.log(payload);
  return { type: UNSET_ORDER_DATA, payload };
};

// export const setPositionPage = () => {
//   console.log("PAYLOAD");
//   return { type: SET_POSITION_PAGE };
// };
export const unsetPositionPage = (payload) => {
  console.log("UNPAYLOAD");
  return { type: UNSET_POSITION_PAGE, payload };
};

export const setOhldata = (payload) => {
  // console.log(payload);
  return { type: SET_EXECUTION, payload };
};

export const setCanvas = (payload) => {
  // console.log(payload);
  return { type: SET_CANVAS, payload };
};

export const setGapUpDown = (payload) => {
  // console.log(payload);
  return { type: SET_GAPUPDOWN, payload };
};

export const activateReversal = (payload) => {
  // console.log(payload);
  return { type: ACTIVATE_REVERSAL_GAP, payload };
};

export const activateOhl = (payload) => {
  // console.log(payload);
  return { type: ACTIVATE_OHL, payload };
};
