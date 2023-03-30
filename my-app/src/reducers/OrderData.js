import {
  SET_ORDER_DATA,
  SET_POSITION_PAGE,
  UNSET_ORDER_DATA,
  UNSET_POSITION_PAGE,
} from "../constants/constants";

const initialstate = {
  orderPlaced: false,
  orderData: undefined,
  OpenPositionPage: false,
};

export const checkOrder = (state = initialstate, action) => {
  // console.log(action.type);
  switch (action.type) {
    case UNSET_ORDER_DATA:
      return {
        ...state,
        orderPlaced: false,

        // logData: action.payload.logdata,
      };

    case UNSET_POSITION_PAGE:
      return {
        ...state,
        OpenPositionPage: action.payload,
      };

    case SET_ORDER_DATA:
      return {
        ...state,
        orderPlaced: true,
        orderData: action.payload,

        // logData: action.payload.logdata,
      };

    default:
      return state;
  }
};
