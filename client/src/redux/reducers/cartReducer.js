import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DELETE_FROM_CART,
  MAKE_ORDER,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  HANDLE_SEARCH_TERM,
  HANDLE_URL_SEARCH_TERM,
  CLEAR_SEARCH_TERM,
  FETCH_WISHLIST_PRODUCTS,
  FETCH_WISHLIST_PRODUCTS_START,
  FETCH_WISHLIST_PRODUCTS_STOP,
  FETCH_CART_ITEMS_START,
  FETCH_CART_ITEMS_STOP,
  FETCH_CART_ITEMS,
  PRE_MAKE_ORDER,
  SAVE_WISHLIST_START,
  SAVE_WISHLIST_STOP,
  FETCH_ORDER_SUCCESS,
  REMOVE_PENDING_AND_SUCCESS,
  FETCH_ORDER_SUCCESS_START,
  FETCH_ORDER_SUCCESS_STOP,
  DELETE_CART,
  DELETE_CART_START,
  DELETE_CART_STOP,
  P_TO_CHECKOUT_START,
  P_TO_CHECKOUT_STOP,
  FETCH_ITEMS_IN_CART,
  EMPTY_ITEMS_IN_CART,
  P_TO_CHECKOUT_CLEAR,
  UNVERIFIED_DATA,
  SET_URL,
  CLEAR_URL
} from "../actions/types";

const INITIAL_STATE = {
  cart: [],
  wishlist: [],
  typing: "",
  wishlistLoading: false,
  cartLoading: false,
  order: null,
  saveWishlistLoading: false,
  pendingOrder: null,
  orderSuccess: null,
  orderSuccessLoading: false,
  deleteCartLoading: false,
  pToCheckoutLoading: false,
  fetchedItems: null,
  unverifiedData: null,
  url: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const productExists =
        state.cart &&
        state.cart.find(
          product => product._id.toString() === action.payload._id.toString()
        );
      if (productExists) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item._id.toString() === action.payload._id.toString()
              ? { ...action.payload, quantity: item.quantity + 1 }
              : item
          )
        };
      }

      return {
        ...state,
        cart: [{ ...action.payload, quantity: 1 }, ...state.cart]
      };
    case REMOVE_FROM_CART:
      const existingCartItem = state.cart.find(
        item => item._id.toString() === action.payload._id.toString()
      );
      if (existingCartItem.quantity === 1) {
        return {
          ...state,
          cart: state.cart.filter(
            item => item._id.toString() !== action.payload._id.toString()
          )
        };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id.toString() === action.payload._id.toString()
            ? { ...action.payload, quantity: action.payload.quantity - 1 }
            : item
        )
      };
    case DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(
          item => item._id.toString() !== action.payload._id.toString()
        )
      };
    case MAKE_ORDER:
      return { ...state, cart: [], pendingOrder: action.payload };
    case ADD_TO_WISHLIST:
      return { ...state, wishlist: [action.payload, ...state.wishlist] };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item._id !== action.payload._id)
      };
    case HANDLE_SEARCH_TERM:
      return { ...state, typing: action.payload };
    case HANDLE_URL_SEARCH_TERM:
      return { ...state, typing: action.payload };
    case CLEAR_SEARCH_TERM:
      return { ...state, typing: "" };
    case FETCH_WISHLIST_PRODUCTS:
      return {
        ...state,
        wishlist: action.payload
      };
    case FETCH_WISHLIST_PRODUCTS_START:
      return { ...state, wishlistLoading: true };
    case FETCH_WISHLIST_PRODUCTS_STOP:
      return { ...state, wishlistLoading: false };
    case FETCH_CART_ITEMS_START:
      return { ...state, cartLoading: true };
    case FETCH_CART_ITEMS_STOP:
      return { ...state, cartLoading: false };
    case FETCH_CART_ITEMS:
      const productIds = new Set(state.cart.map(p => p._id));
      return {
        ...state,
        cart: [
          ...state.cart,
          ...action.payload.filter(prod => !productIds.has(prod._id))
        ]
      };
    case PRE_MAKE_ORDER:
      return { ...state, order: action.payload };
    case SAVE_WISHLIST_START:
      return { ...state, saveWishlistLoading: true };
    case SAVE_WISHLIST_STOP:
      return { ...state, saveWishlistLoading: false };
    case FETCH_ORDER_SUCCESS:
      return { ...state, orderSuccess: action.payload };
    case REMOVE_PENDING_AND_SUCCESS:
      return {
        ...state,
        pendingOrder: null,
        orderSuccess: null,
        unverifiedData: null
      };
    case FETCH_ORDER_SUCCESS_START:
      return { ...state, orderSuccessLoading: true };
    case FETCH_ORDER_SUCCESS_STOP:
      return { ...state, orderSuccessLoading: false };
    case DELETE_CART:
      return { ...state, cart: [], order: null };
    case DELETE_CART_START:
      return { ...state, deleteCartLoading: true };
    case DELETE_CART_STOP:
      return { ...state, deleteCartLoading: false };
    case P_TO_CHECKOUT_START:
      return { ...state, pToCheckoutLoading: true };
    case P_TO_CHECKOUT_STOP:
      return { ...state, pToCheckoutLoading: false };
    case FETCH_ITEMS_IN_CART:
      return { ...state, fetchedItems: action.payload };
    case EMPTY_ITEMS_IN_CART:
      return { ...state, fetchedItems: null };
    case P_TO_CHECKOUT_CLEAR:
      return { ...state, pToCheckoutLoading: false };
    case UNVERIFIED_DATA:
      return { ...state, unverifiedData: action.payload };
    case SET_URL:
      return { ...state, url: action.payload };
    case CLEAR_URL:
      return { ...state, url: null };
    default:
      return state;
  }
};
