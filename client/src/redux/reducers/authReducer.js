import {
  LOG_IN,
  LOG_IN_FAILED,
  FETCH_USER,
  LOADING_START,
  LOADING_STOP,
  REGISTER,
  REGISTER_FAILED,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD,
  EDIT_USER,
  EDIT_USER_FAILED,
  FETCH_USER_FAILED,
  CHECKOUT_USER,
  CHECKOUT_USER_FAILED,
  UPDATE_PASSWORD_LOGGED_IN,
  UPDATE_PASSWORD_LOGGED_IN_FAILED,
  REGISTER_SELLER,
  SIGN_IN_CLICK,
  REGISTER_CLICK,
  FETCH_ORDERS_LOADING_START,
  FETCH_ORDERS_LOADING_STOP,
  FETCH_PENDING_REVIEWS_LOADING_START,
  FETCH_PENDING_REVIEWS_LOADING_STOP,
  FETCH_SELLER_ORDERS_START,
  FETCH_SELLER_ORDERS_STOP,
  FETCH_SELLER_PRODUCTS_START,
  FETCH_SELLER_PRODUCTS_STOP,
  SINGLE_CATEGORY_START,
  SINGLE_CATEGORY_STOP,
  FETCH_USER_START,
  FETCH_USER_STOP,
  CHECKOUT_USER_START,
  CHECKOUT_USER_STOP,
  LOG_IN_START,
  LOG_IN_STOP,
  SELLER_LOGIN_START,
  SELLER_LOGIN_STOP,
  REGISTER_START,
  REGISTER_STOP,
  CONTACT_US_START,
  CONTACT_US_STOP
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  user: null,
  error: null,
  registerError: null,
  loading: false,
  showEmailConfirm: false,
  success: null,
  editUserError: null,
  checkoutUserError: null,
  updatePasswordMessage: null,
  updatePasswordError: null,
  resetPasswordError: null,
  signInOpen: true,
  fetchOrdersLoading: false,
  pendingReviewsLoading: false,
  sellerOrdersLoading: false,
  sellerProductsLoading: false,
  singleCategoryLoading: false,
  checkoutUserLoading: false,
  loginLoading: false,
  sellerLoginLoading: false,
  registerLoading: false,
  contactUsLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, isSignedIn: true, user: action.payload };
    case LOG_IN_START:
      return { ...state, loginLoading: true };
    case LOG_IN_STOP:
      return { ...state, loginLoading: false };
    case SELLER_LOGIN_START:
      return { ...state, sellerLoginLoading: true };
    case SELLER_LOGIN_STOP:
      return { ...state, sellerLoginLoading: false };
    case REGISTER_START:
      return { ...state, registerLoading: true };
    case REGISTER_STOP:
      return { ...state, registerLoading: false };
    case LOG_IN_FAILED:
      return {
        ...state,
        isSignedIn: false,
        user: null,
        error:
          "The email and password you entered did not match our records. Please double-check and try again."
      };
    case FETCH_USER_FAILED:
      return { ...state, isSignedIn: false, user: null };
    case FETCH_USER:
      if (action.payload.isLoggedIn) {
        return {
          ...state,
          isSignedIn: action.payload.isLoggedIn,
          user: action.payload.user
        };
      }
      return { ...state, isSignedIn: false };
    case LOADING_START:
      return { ...state, loading: true };
    case LOADING_STOP:
      return { ...state, loading: false };
    case REGISTER:
      return { ...state, showEmailConfirm: true };
    case REGISTER_FAILED:
      return {
        ...state,
        registerError: "That email address is already in use"
      };
    case RESET_PASSWORD:
      return { ...state, success: action.payload.message };
    case RESET_PASSWORD_FAILED:
      return { ...state, resetPasswordError: "No user with that email found" };
    case EDIT_USER:
      if (action.payload.isLoggedIn) {
        return {
          ...state,
          isSignedIn: action.payload.isLoggedIn,
          user: action.payload.user
        };
      }
      return { ...state, isSignedIn: false };
    case CHECKOUT_USER:
      if (action.payload.isLoggedIn) {
        return {
          ...state,
          isSignedIn: action.payload.isLoggedIn,
          user: action.payload.user
        };
      }
      return { ...state, isSignedIn: false };
    case CHECKOUT_USER_START:
      return { ...state, checkoutUserLoading: true };
    case CHECKOUT_USER_STOP:
      return { ...state, checkoutUserLoading: false };
    case CHECKOUT_USER_FAILED:
      return { ...state, checkoutUserError: "Saving changes failed" };
    case EDIT_USER_FAILED:
      return { ...state, editUserError: "Saving changes failed" };
    case UPDATE_PASSWORD_LOGGED_IN:
      return { ...state, updatePasswordMessage: action.payload.message };
    case UPDATE_PASSWORD_LOGGED_IN_FAILED:
      return {
        ...state,
        updatePasswordError:
          "Update Password failed, Please double-check your current password and try again"
      };
    case REGISTER_SELLER:
      return { ...state, showEmailConfirm: true };
    case SIGN_IN_CLICK:
      return { ...state, signInOpen: true };
    case REGISTER_CLICK:
      return { ...state, signInOpen: false };
    case FETCH_ORDERS_LOADING_START:
      return { ...state, fetchOrdersLoading: true };
    case FETCH_ORDERS_LOADING_STOP:
      return { ...state, fetchOrdersLoading: false };
    case FETCH_PENDING_REVIEWS_LOADING_START:
      return { ...state, pendingReviewsLoading: true };
    case FETCH_PENDING_REVIEWS_LOADING_STOP:
      return { ...state, pendingReviewsLoading: false };
    case FETCH_SELLER_ORDERS_START:
      return { ...state, sellerOrdersLoading: true };
    case FETCH_SELLER_ORDERS_STOP:
      return { ...state, sellerOrdersLoading: false };
    case FETCH_SELLER_PRODUCTS_START:
      return { ...state, sellerProductsLoading: true };
    case FETCH_SELLER_PRODUCTS_STOP:
      return { ...state, sellerProductsLoading: false };
    case SINGLE_CATEGORY_START:
      return { ...state, singleCategoryLoading: true };
    case SINGLE_CATEGORY_STOP:
      return { ...state, singleCategoryLoading: false };
    case FETCH_USER_START:
      return { ...state, loading: true };
    case FETCH_USER_STOP:
      return { ...state, loading: false };
    case CONTACT_US_START:
      return { ...state, contactUsLoading: true };
    case CONTACT_US_STOP:
      return { ...state, contactUsLoading: false };
    default:
      return state;
  }
};
