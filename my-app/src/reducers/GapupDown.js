import { SET_GAPUPDOWN } from "../constants/constants";

const initialstate = {
  gapupDown: 0,
};
export const setGapUpDowndata = (state = initialstate, action) => {
  //   console.log("HIIII", action.payload);

  switch (action.type) {
    case SET_GAPUPDOWN:
      return {
        ...state,
        gapupDown: action.payload,
        // logData: action.payload.logdata,
      };

    default:
      return state;
  }
};
