import {
  FETCH_SELLER_ORDER_DETAILS,
  PAYMENT_DISTANCE,
  FETCH_SELLER_NEW_ORDERS_COUNT,
  CLEAR_ORDER_DETAILS,
  STORE_LAT_LNG
} from "../actions/types";

const INITIAL_STATE = {
  sellerOrderDetails: [],
  distance: null,
  dashboard: null,
  latLng: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SELLER_ORDER_DETAILS:
      return { ...state, sellerOrderDetails: action.payload };
    case PAYMENT_DISTANCE:
      return { ...state, distance: action.payload };

    case FETCH_SELLER_NEW_ORDERS_COUNT:
      return { ...state, dashboard: action.payload };
    case CLEAR_ORDER_DETAILS:
      return {
        ...state,
        sellerOrderDetails: [],
        distance: null,
        dashboard: null
      };
    case STORE_LAT_LNG:
      return { ...state, latLng: action.payload };
    default:
      return state;
  }
};
