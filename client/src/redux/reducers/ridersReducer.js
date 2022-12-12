import {
  RIDER_REGISTER_START,
  RIDER_REGISTERED,
  RIDER_REGISTER_ERROR,
  RIDER_LOGIN_START,
  RIDER_LOGGED_IN,
  RIDER_LOGIN_ERROR,
  FETCH_SUCCESSFUL_DELIVERIES_START,
  SUCCESSFUL_DELIVERIES_FETCHED,
  FETCH_SUCCESSFUL_DELIVERIES_STOP,
  FETCH_PENDING_DELIVERIES_START,
  FETCH_PENDING_DELIVERIES_STOP,
  PENDING_DELIVERIES_FETCHED,
  RIDER_CHANGE_PASSWORD_START,
  RIDER_CHANGE_PASSWORD_STOP,
  FETCH_CLIENTS
} from "../actions/types";

const initialState = {
  riderRegisterLoading: false,
  riderRegisterError: null,
  riderLoginLoading: false,
  riderLoginError: null,
  fetchingSuccessfulDeliveries: false,
  successfulDeliveriesFetched: false,
  fetchingPendingDeliveries: false,
  pendingDeliveriesDetched: false,
  riderChangePasswordLoading: false,
  riderChangePasswordError: null,
  clients: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RIDER_REGISTER_START:
      return { ...state, riderRegisterLoading: true };
    case RIDER_REGISTERED:
      return { ...state, riderRegisterLoading: false };
    case RIDER_REGISTER_ERROR:
      return {
        ...state,
        riderRegisterLoading: false,
        riderRegisterError: action.data
      };
    case RIDER_LOGIN_START:
      return { ...state, riderLoginLoading: true };
    case RIDER_LOGGED_IN:
      return { ...state, riderLoginLoading: false };
    case RIDER_LOGIN_ERROR:
      return {
        ...state,
        riderLoginLoading: false,
        riderLoginError: action.data
      };
    case FETCH_SUCCESSFUL_DELIVERIES_START:
      return { ...state, fetchingSuccessfulDeliveries: true };
    case SUCCESSFUL_DELIVERIES_FETCHED:
      return {
        ...state,
        fetchingSuccessfulDeliveries: false,
        successfulDeliveriesFetched: true
      };
    case FETCH_SUCCESSFUL_DELIVERIES_STOP:
      return { ...state, fetchingSuccessfulDeliveries: false };
    case FETCH_PENDING_DELIVERIES_START:
      return { ...state, fetchingPendingDeliveries: true };
    case PENDING_DELIVERIES_FETCHED:
      return {
        ...state,
        fetchingPendingDeliveries: false,
        pendingDeliveriesDetched: true
      };
    case FETCH_PENDING_DELIVERIES_STOP:
      return { ...state, fetchingPendingDeliveries: false };
    case RIDER_CHANGE_PASSWORD_START:
      return { ...state, riderChangePasswordLoading: true };
    case RIDER_CHANGE_PASSWORD_STOP:
      return {
        ...state,
        riderChangePasswordLoading: false,
        riderChangePasswordError: action.payload
      };
    case FETCH_CLIENTS:
      return { ...state, clients: action.payload };
    default:
      return state;
  }
};
