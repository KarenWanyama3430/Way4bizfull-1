import {
  FETCH_SELLER,
  REGISTER_SELLER_FAILED,
  FETCH_SELLER_NUMBER,
  INVALID_VERIFICATION_CODE,
  RESET_TOKEN_CHECK,
  FETCH_SELLER_PRODUCTS,
  FETCH_SELLER_ORDERS,
  FETCH_VERIFIED_SELLERS,
  FETCH_SELLERS_START,
  FETCH_SELLERS_STOP,
  FETCH_VERIFIED_SELLER,
  FETCH_NEW_SELLER,
  FETCH_NEW_SELLERS_START,
  FETCH_NEW_SELLERS_STOP,
  ACCEPT_SELLER_REQUEST_START,
  ACCEPT_SELLER_REQUEST_STOP,
  FETCH_SELLER_START,
  FETCH_SELLER_STOP,
  REGISTER_SELLER_START,
  REGISTER_SELLER_STOP,
  VERIFIED_SELLER_START,
  VERIFIED_SELLER_STOP,
  SEND_REFERRAL_CODE_START,
  SEND_REFERRAL_CODE_STOP,
  REFERRAL_CODE_ERROR,
  SEND_REFERRAL_CODE,
  CLEAR_REFERRAL_ERROR_AND_SUCCESS,
  REDEEM_POINTS_ERROR,
  REDEEM_POINTS_START,
  REDEEM_POINTS_STOP,
  REDEEM_POINTS
} from "../actions/types";

const INITIAL_STATE = {
  seller: null,
  sellerNumber: null,
  sellerRegisterError: null,
  errorVerifying: null,
  resetToken: null,
  sellerProducts: null,
  sellerOrders: [],
  verifiedSellers: null,
  fetchSellersLoading: false,
  verifiedSeller: null,
  newSeller: null,
  newSellerLoading: false,
  sellerRequestLoading: false,
  fetchSellerLoading: false,
  sellerRegisterLoading: false,
  verifiedSellerLoading: false,
  referralCodeLoading: false,
  referralError: null,
  referralSuccess: null,
  redeemPointsError: null,
  redeemPointsLoading: false,
  redeemSuccess: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SELLER:
      return { ...state, seller: action.payload };
    case REGISTER_SELLER_FAILED:
      return {
        ...state,
        sellerRegisterError: action.payload
      };
    case FETCH_SELLER_NUMBER:
      return {
        ...state,
        sellerNumber:
          typeof action.payload === "number" ? { number: action.payload } : {}
      };
    case INVALID_VERIFICATION_CODE:
      return { ...state, errorVerifying: action.payload };
    case RESET_TOKEN_CHECK:
      return { ...state, resetToken: action.payload };
    case FETCH_SELLER_PRODUCTS:
      return { ...state, sellerProducts: action.payload };
    case FETCH_SELLER_ORDERS:
      return { ...state, sellerOrders: action.payload };
    case FETCH_VERIFIED_SELLERS:
      return { ...state, verifiedSellers: action.payload };
    case FETCH_SELLERS_START:
      return { ...state, fetchSellersLoading: true };
    case FETCH_SELLERS_STOP:
      return { ...state, fetchSellersLoading: false };
    case FETCH_VERIFIED_SELLER:
      return { ...state, verifiedSeller: action.payload };
    case FETCH_NEW_SELLER:
      return { ...state, newSeller: action.payload };
    case FETCH_NEW_SELLERS_START:
      return { ...state, newSellerLoading: true };
    case FETCH_NEW_SELLERS_STOP:
      return { ...state, newSellerLoading: false };
    case ACCEPT_SELLER_REQUEST_START:
      return { ...state, sellerRequestLoading: true };
    case ACCEPT_SELLER_REQUEST_STOP:
      return { ...state, sellerRequestLoading: false };
    case FETCH_SELLER_START:
      return { ...state, fetchSellerLoading: true };
    case FETCH_SELLER_STOP:
      return { ...state, fetchSellerLoading: false };
    case REGISTER_SELLER_START:
      return { ...state, sellerRegisterLoading: true };
    case REGISTER_SELLER_STOP:
      return { ...state, sellerRegisterLoading: false };
    case VERIFIED_SELLER_START:
      return { ...state, verifiedSellerLoading: true };
    case VERIFIED_SELLER_STOP:
      return { ...state, verifiedSellerLoading: false };
    case SEND_REFERRAL_CODE_START:
      return { ...state, referralCodeLoading: true };
    case SEND_REFERRAL_CODE_STOP:
      return { ...state, referralCodeLoading: false };
    case REFERRAL_CODE_ERROR:
      return { ...state, referralError: action.payload, referralSuccess: null };
    case SEND_REFERRAL_CODE:
      return { ...state, referralSuccess: "Success", referralError: null };
    case CLEAR_REFERRAL_ERROR_AND_SUCCESS:
      return { ...state, referralSuccess: null, referralError: null };
    case REDEEM_POINTS_ERROR:
      return { ...state, redeemPointsError: action.payload };
    case REDEEM_POINTS_START:
      return { ...state, redeemPointsLoading: true };
    case REDEEM_POINTS_STOP:
      return { ...state, redeemPointsLoading: false };
    case REDEEM_POINTS:
      return { ...state, redeemSuccess: action.payload };
    default:
      return state;
  }
};
