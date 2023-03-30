import { ACTIVATE_OHL, ACTIVATE_REVERSAL_GAP } from "../constants/constants";

const initialstate = {
  ohlActivated: false,
  reversalTrade: false,
};
export const activateOhl = (state = initialstate, action) => {
  //   console.log("HIIII", action.payload);

  switch (action.type) {
    case ACTIVATE_OHL:
      return {
        ...state,
        ohlActivated: action.payload,
        // logData: action.payload.logdata,
      };

    default:
      return state;
  }
};
export const activateReversalGap = (state = initialstate, action) => {
  //   console.log("HIIII", action.payload);

  switch (action.type) {
    case ACTIVATE_REVERSAL_GAP:
      return {
        ...state,
        reversalTrade: action.payload,
        // logData: action.payload.logdata,
      };

    default:
      return state;
  }
};
