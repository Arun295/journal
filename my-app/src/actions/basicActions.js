import {
  SET_LOGGED,
  SET_ORDER_DATA,
  SET_READ_WHOLEDATA,
  SET_NIFTY_DATA,
  SET_EXECUTION,
  SET_CANVAS,
  UNSET_ORDER_DATA,
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
export const setOhldata = (payload) => {
  // console.log(payload);
  return { type: SET_EXECUTION, payload };
};

export const setCanvas = (payload) => {
  console.log(payload);
  return { type: SET_CANVAS, payload };
};
