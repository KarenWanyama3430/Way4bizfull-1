import {
  HANDLE_CHANGE,
  HANDLE_CHECKBOX,
  REVERT_FILTER,
  RADIO_BUTTON
} from "../actions/types";

const INITIAL_STATE = {
  priceMax: null,
  priceMin: null,
  rating: false,
  freeShipping: false,
  price: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.event.name]: parseInt(action.payload.event.value)
      };
    case HANDLE_CHECKBOX:
      return {
        ...state,
        [action.payload.event.name]: action.payload.event.checked
      };
    case RADIO_BUTTON:
      return { ...state, price: action.payload.event.value };
    case REVERT_FILTER:
      return {
        ...state,
        priceMax: null,
        priceMin: null,
        rating: false,
        freeShipping: false
      };
    default:
      return state;
  }
};
