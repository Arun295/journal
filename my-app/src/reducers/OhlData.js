import { SET_LOGGED, SET_EXECUTION, SET_CANVAS } from "../constants/constants";

const initialstate = {
  ohlData: 0,
};

export const setOhldata = (state = initialstate, action) => {
  //   console.log("HIIII", action.payload);

  switch (action.type) {
    case SET_EXECUTION:
      return {
        ...state,
        ohlData: action.payload,
        // logData: action.payload.logdata,
      };

    default:
      return state;
  }
};
