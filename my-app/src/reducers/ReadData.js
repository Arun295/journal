import { SET_READ_WHOLEDATA, SET_NIFTY_DATA } from "../constants/constants";

const initialstate = {
  jsonData: undefined,
  niftyData: undefined,
};

export const ReadData = (state = initialstate, action) => {
  //   console.log("HIIII", action.payload);

  switch (action.type) {
    case SET_READ_WHOLEDATA:
      return {
        ...state,
        jsonData: action.payload,
      };

    default:
      return state;
  }
};

export const niftyFiftyData = (state = initialstate, action) => {
  //   console.log("HIIII", action.payload);

  switch (action.type) {
    case SET_NIFTY_DATA:
      return {
        ...state,
        niftyData: action.payload,
      };

    default:
      return state;
  }
};
