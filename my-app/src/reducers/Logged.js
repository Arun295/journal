import { SET_LOGGED, SET_EXECUTION, SET_CANVAS } from "../constants/constants";

const initialstate = {
  IsLogged: false,
  token: undefined,
  refreshToken: undefined,
  ohlData: 0,
  canvas: false,
};

export const Logged = (state = initialstate, action) => {
  //   console.log("HIIII", action.payload);

  switch (action.type) {
    case SET_LOGGED:
      return {
        ...state,
        IsLogged: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshtoken,
        // logData: action.payload.logdata,
      };

    default:
      return state;
  }
};

export const setCanvas = (state = initialstate, action) => {
  // console.log("HIIII", action.payload);

  switch (action.type) {
    case SET_CANVAS:
      return {
        ...state,
        canvas: action.payload,
        // logData: action.payload.logdata,
      };

    default:
      return state;
  }
};
