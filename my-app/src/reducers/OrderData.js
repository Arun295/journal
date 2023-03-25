import { SET_ORDER_DATA, UNSET_ORDER_DATA } from "../constants/constants";

const initialstate = {
  orderPlaced: false,
  orderData: undefined,
};

export const checkOrder = (state = initialstate, action) => {
  switch (action.type) {
    case UNSET_ORDER_DATA:
      return {
        ...state,
        orderPlaced: false,
        // logData: action.payload.logdata,
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
