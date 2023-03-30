import {
  SET_LOGGED,
  SET_EXECUTION,
  SET_CANVAS,
  SET_GAPUPDOWN,
} from "../constants/constants";

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

// export const setGapUpDowndata = (state = initialstate, action) => {
//   //   console.log("HIIII", action.payload);

//   switch (action.type) {
//     case SET_GAPUPDOWN:
//       return {
//         ...state,
//         gapupDown: action.payload,
//         // logData: action.payload.logdata,
//       };

//     default:
//       return state;
//   }
// };
