import axios from "axios";
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
  FETCH_PRODUCTS_SEARCH,
  FETCH_PRODUCTS_FAILED,
  UPDATE_PASSWORD_LOGGED_IN,
  UPDATE_PASSWORD_LOGGED_IN_FAILED,
  REGISTER_SELLER,
  REGISTER_SELLER_FAILED,
  FETCH_SELLER,
  FETCH_SELLER_NUMBER,
  INVALID_VERIFICATION_CODE,
  RESET_TOKEN_CHECK,
  FETCH_SELLER_PRODUCTS,
  ADD_PRODUCT,
  FETCH_PRODUCTS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DELETE_FROM_CART,
  FETCH_CATEGORIES,
  SINGLE_CATEGORY,
  FETCH_ALL_CATEGORIES,
  MAKE_ORDER,
  FETCH_SELLER_ORDERS,
  FETCH_SELLER_ORDER_DETAILS,
  FETCH_BUYER_ORDERS,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  FETCH_BUYER_ORDER_DETAILS,
  FETCH_MORE_PRODUCTS,
  HAS_MORE_FALSE,
  MORE_SINGLE_CATEGORY_PRODUCTS,
  HAS_MORE_CATEGORY_FALSE,
  SIGN_IN_CLICK,
  REGISTER_CLICK,
  FETCH_SINGLE_PRODUCT,
  FETCH_RELATED_PRODUCTS,
  FETCH_PENDING_REVIEWS,
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
  SINGLE_PRODUCT_START,
  SINGLE_PRODUCT_STOP,
  PRODUCT_REVIEWS,
  FETCH_USER_START,
  FETCH_USER_STOP,
  FILTERED_PRODUCTS_START,
  FILTERED_PRODUCTS_STOP,
  HANDLE_CHECKBOX,
  HANDLE_CHANGE,
  REVERT_FILTER,
  RADIO_BUTTON,
  FETCH_SELLER_REVIEWS_START,
  FETCH_SELLER_REVIEWS_STOP,
  FETCH_SELLER_REVIEWS,
  STORE_DESCRIPTION,
  STORE_IMAGE,
  STORE_IMAGE_START,
  STORE_IMAGE_STOP,
  REDIRECT_ON_FAIL_START,
  REDIRECT_ON_FAIL_STOP,
  EDIT_PRODUCT,
  DELETE_IMAGE_START,
  DELETE_IMAGE_STOP,
  DELETE_IMAGE,
  UNPERSIST_IMAGE,
  PAYMENT_DISTANCE_START,
  PAYMENT_DISTANCE_STOP,
  PAYMENT_DISTANCE,
  GET_STOCK,
  GET_STOCK_START,
  GET_STOCK_STOP,
  FETCH_VERIFIED_SELLERS,
  FETCH_SELLERS_STOP,
  FETCH_SELLERS_START,
  FETCH_VERIFIED_SELLER,
  FETCH_NEW_SELLER,
  FETCH_NEW_SELLERS,
  FETCH_NEW_SELLERS_START,
  FETCH_NEW_SELLERS_STOP,
  FETCH_ADMIN_ORDERS,
  FETCH_ADMIN_ORDERS_START,
  FETCH_ADMIN_ORDERS_STOP,
  FETCH_ADMIN_PENDING_ORDERS,
  FETCH_ALL_ORDERS,
  HAS_MORE_ORDERS_FALSE,
  ADMIN_RADIO,
  FETCH_MORE_ALL_ORDERS,
  FETCH_ADMIN_ORDER,
  FETCH_ORDER_BY_ID,
  FETCH_ORDER_BY_ID_ERROR,
  FETCH_ORDER_BY_ID_START,
  FETCH_ORDER_BY_ID_STOP,
  FETCH_WEEKLY_SALES,
  FETCH_WEEKLY_SALES_START,
  FETCH_WEEKLY_SALES_STOP,
  SET_PENDING_ORDERS,
  ADD_NEW_CATEGORY,
  ADD_NEW_CATEGORY_START,
  ADD_NEW_CATEGORY_STOP,
  FETCH_ALL_ADMIN_CATEGORIES,
  FETCH_ALL_ADMIN_CATEGORIES_START,
  FETCH_ALL_ADMIN_CATEGORIES_STOP,
  FETCH_SINGLE_CATEGORY,
  FETCH_SINGLE_CATEGORY_START,
  FETCH_SINGLE_CATEGORY_STOP,
  EDIT_CATEGORY,
  EDIT_CATEGORY_START,
  EDIT_CATEGORY_STOP,
  FETCH_ADMIN_ORDER_START,
  FETCH_ADMIN_ORDER_STOP,
  HANDLE_INCREMENT_ACTION,
  HANDLE_DECREMENT_ACTION,
  HANDLE_CHECK_ACTION,
  STORE_SELLER_IMAGE,
  FETCH_SELLER_NEW_ORDERS_COUNT,
  DELETE_SELLER_IMAGE,
  ACCEPT_SELLER_REQUEST,
  ACCEPT_SELLER_REQUEST_START,
  ACCEPT_SELLER_REQUEST_STOP,
  FETCH_UNDER_REVIEW_START,
  FETCH_UNDER_REVIEW_STOP,
  FETCH_UNDER_REVIEW,
  FETCH_REVIEW_PRODUCT,
  ACCEPT_PRODUCT_START,
  ACCEPT_PRODUCT,
  ACCEPT_PRODUCT_STOP,
  REJECT_PRODUCT_START,
  REJECT_PRODUCT,
  REJECT_PRODUCT_STOP,
  REJECT_MESSAGE,
  REJECT_MESSAGE_START,
  REJECT_MESSAGE_STOP,
  FETCH_REJECTS,
  FETCH_REJECTS_START,
  FETCH_REJECTS_STOP,
  DELETE_SELLER_PRODUCT,
  DELETE_SELLER_PRODUCT_START,
  DELETE_SELLER_PRODUCT_STOP,
  FETCH_STORE_PRODUCTS_START,
  FETCH_STORE_PRODUCTS_STOP,
  FETCH_STORE_PRODUCTS,
  HANDLE_SEARCH_TERM,
  SEARCH_PRODUCTS,
  SEARCH_PRODUCTS_START,
  SEARCH_PRODUCTS_STOP,
  MORE_SEARCH_PRODUCTS,
  MORE_SEARCH_PRODUCTS_START,
  MORE_SEARCH_PRODUCTS_STOP,
  HAS_MORE_SEARCH_FALSE,
  HANDLE_URL_SEARCH_TERM,
  CLEAR_SEARCH_TERM,
  NEW_COMPLAINT,
  NEW_COMPLAINT_START,
  NEW_COMPLAINT_STOP,
  COUNT_COMPLAINTS,
  COUNT_COMPLAINTS_START,
  COUNT_COMPLAINTS_STOP,
  FETCH_ALL_COMPLAINTS,
  FETCH_COMPLAINT,
  FETCH_COMPLAINT_STOP,
  FETCH_COMPLAINT_START,
  FETCH_BUYER_COMPLAINTS,
  FETCH_BUYER_COMPLAINT_START,
  FETCH_BUYER_COMPLAINT,
  FETCH_BUYER_COMPLAINT_STOP,
  FETCH_REJECTED_PRODUCTS,
  FETCH_SUB_CATEGORIES,
  EMPTY_SUB_CATEGORIES,
  FETCH_LATEST_REJECTED_PRODUCTS,
  FETCH_SELLER_START,
  FETCH_SELLER_STOP,
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_STOP,
  FETCH_WISHLIST_PRODUCTS,
  FETCH_WISHLIST_PRODUCTS_START,
  FETCH_WISHLIST_PRODUCTS_STOP,
  SAVE_CART,
  FETCH_CART_ITEMS,
  FETCH_CART_ITEMS_START,
  FETCH_CART_ITEMS_STOP,
  SAVE_WISHLIST,
  PRE_MAKE_ORDER,
  SAVE_WISHLIST_STOP,
  SAVE_WISHLIST_START,
  FETCH_ORDER_SUCCESS,
  REMOVE_PENDING_AND_SUCCESS,
  FETCH_ORDER_SUCCESS_START,
  FETCH_ORDER_SUCCESS_STOP,
  DELETE_CART,
  CHECKOUT_USER_START,
  CHECKOUT_USER_STOP,
  DELETE_CART_START,
  DELETE_CART_STOP,
  CONFIRM_DISPATCH,
  CONFIRM_DISPATCH_START,
  CONFIRM_DISPATCH_STOP,
  CONFIRM_DELIVERY,
  CONFIRM_DELIVERY_START,
  CONFIRM_DELIVERY_STOP,
  REGISTER_SELLER_START,
  REGISTER_SELLER_STOP,
  LOG_IN_START,
  LOG_IN_STOP,
  SELLER_LOGIN_START,
  SELLER_LOGIN_STOP,
  REGISTER_START,
  REGISTER_STOP,
  SELF_COLLECTION_ADDRESS,
  SELF_COLLECTION_START,
  SELF_COLLECTION_STOP,
  VERIFIED_SELLER_START,
  VERIFIED_SELLER_STOP,
  REMOVE_ADDRESS,
  COLLECTION_OPEN_ACTION,
  COLLECTION_CLOSE_ACTION,
  CHECK_REFERRAL,
  SEND_REFERRAL_CODE,
  SEND_REFERRAL_CODE_START,
  SEND_REFERRAL_CODE_STOP,
  CONTACT_US_START,
  CONTACT_US_STOP,
  FETCH_ADMIN_INBOX,
  FETCH_ADMIN_INBOX_START,
  FETCH_ADMIN_INBOX_STOP,
  REFERRAL_CODE_ERROR,
  CLEAR_REFERRAL_ERROR_AND_SUCCESS,
  CLEAR_ORDER_DETAILS,
  REDEEM_POINTS_START,
  REDEEM_POINTS_STOP,
  REDEEM_POINTS_ERROR,
  REDEEM_POINTS,
  STORE_LAT_LNG,
  DELIVERY_OPEN_ACTION,
  DELIVERY_CLOSE_ACTION,
  MAKE_ORDER_START,
  MAKE_ORDER_STOP,
  REDEEM_COUNT,
  FETCH_REDEEMS,
  PAY_REDEEM,
  PAY_REDEEM_START,
  PAY_REDEEM_STOP,
  CLEAR_NEW_SELLER_DETAILS,
  UPLOAD_IMAGE_ERROR,
  ADD_PRODUCT_ERROR,
  HERO_IMAGE_START,
  HERO_IMAGE_STOP,
  HERO_IMAGES,
  FETCH_HERO_START,
  FETCH_HERO_STOP,
  DELETE_HERO_IMAGE_START,
  DELETE_HERO_IMAGE_STOP,
  SAVE_ORDER_START,
  SAVE_ORDER_STOP,
  RIDER_REGISTER_START,
  RIDER_REGISTERED,
  RIDER_REGISTER_ERROR,
  RIDER_LOGIN_START,
  RIDER_LOGGED_IN,
  RIDER_LOGIN_ERROR,
  P_TO_CHECKOUT_START,
  P_TO_CHECKOUT_STOP,
  ADMIN_INBOX_COUNT,
  FETCH_ITEMS_IN_CART,
  EMPTY_ITEMS_IN_CART,
  RIDER_CHANGE_PASSWORD_START,
  RIDER_CHANGE_PASSWORD_STOP,
  REQUEST_SERVICE_START,
  REQUEST_SERVICE_STOP,
  FETCH_DELIVERY,
  FETCH_CLIENTS,
  P_TO_CHECKOUT_CLEAR,
  FETCH_ALL_DRIVERS,
  FETCH_DRIVER_DETAILS,
  EMPTY_DRIVER_DETAILS,
  EMPTY_FETCHED_DELIVERY,
  CONFIRM_LOGISTICS_START,
  CONFIRM_LOGISTICS_STOP,
  FETCH_CLIENT_DELIVERIES,
  FETCH_SINGLE_DELIVERY,
  CLEAR_SINGLE_CATEGORY,
  UNVERIFIED_DATA,
  SET_URL,
  CLEAR_URL
  // FETCH_SUCCESSFUL_DELIVERIES_START,
  // SUCCESSFUL_DELIVERIES_FETCHED,
  // FETCH_SUCCESSFUL_DELIVERIES_STOP,
} from "./types";

const authCheck = error => {
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.buyer
  ) {
    return (window.location.href = "/sign-in");
  }
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.admin
  ) {
    return (window.location.href = "/");
  }
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.profiling
  ) {
    return (window.location.href = "/seller/profiling");
  }
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.seller
  ) {
    return (window.location.href = "/seller/sign-in");
  }
};

const pathCheck = (error, history) => {
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.stringValue
  ) {
    history.push("/notfound");
  }
  if (
    error &&
    error.response &&
    error.response.status &&
    error.response.status === 404
  ) {
    history.push("/notfound");
  }
};

export const logIn = (credentials, history) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOG_IN_START });
    const res = await axios.post("/api/login", credentials);

    if (res.data && res.data.phoneNumber) {
      res.data.phoneNumber = res.data.phoneNumber.toString();
    }
    dispatch({
      type: LOG_IN,
      payload: res.data
    });
    if (res.data.isAdmin) {
      history.push("/admin-dashboard");
      dispatch({ type: LOG_IN_STOP });
      return;
    }
    history.push("/");
    dispatch({ type: LOG_IN_STOP });
  } catch (error) {
    getState().form.LoginForm.values.password = "";
    dispatch({ type: LOG_IN_STOP });
    dispatch({ type: LOG_IN_FAILED });
  }
};
export const sellerLogIn = (credentials, history) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: SELLER_LOGIN_START });
    const res = await axios.post("/api/seller/login", credentials);
    if (res.data && res.data.phoneNumber) {
      res.data.phoneNumber = res.data.phoneNumber.toString();
    }
    dispatch({
      type: LOG_IN,
      payload: res.data
    });
    dispatch({ type: SELLER_LOGIN_STOP });
    history.push("/seller-dashboard");
  } catch (error) {
    getState().form.SellerLogin.values.password = "";
    dispatch({ type: SELLER_LOGIN_STOP });
    dispatch({ type: LOG_IN_FAILED });
  }
};
export const register = credentials => async (dispatch, getState) => {
  try {
    dispatch({ type: REGISTER_START });
    await axios.post("/api/register", credentials);
    dispatch({ type: REGISTER });
    dispatch({ type: REGISTER_STOP });
  } catch (error) {
    console.log(error);
    getState().form.RegisterForm.values.email = "";
    dispatch({ type: REGISTER_FAILED });
    dispatch({ type: REGISTER_STOP });
  }
};

export const fetchUser = () => async dispatch => {
  try {
    dispatch({ type: FETCH_USER_START });
    const res = await axios.get("/api/current_user");
    console.log("Cpus: ", res.data.Cpus);
    if (res.data.user.phoneNumber) {
      res.data.user.phoneNumber = res.data.user.phoneNumber.toString();
    }
    dispatch({ type: FETCH_USER, payload: res.data });
    dispatch({ type: FETCH_USER_STOP });
  } catch (error) {
    dispatch({ type: FETCH_USER_FAILED });
    authCheck(error);
    dispatch({ type: FETCH_USER_STOP });
  }
};
export const fetchCurrentSeller = () => async dispatch => {
  try {
    dispatch({ type: FETCH_SELLER_START });
    const res = await axios.get("/api/current_user");
    console.log("Cpus: ", res.data.Cpus);
    if (res.data.user.phoneNumber) {
      res.data.user.phoneNumber = res.data.user.phoneNumber.toString();
    }
    dispatch({ type: FETCH_USER, payload: res.data });
    dispatch({ type: FETCH_SELLER_STOP });
  } catch (error) {
    dispatch({ type: FETCH_USER_FAILED });
    authCheck(error);
    dispatch({ type: FETCH_SELLER_STOP });
  }
};

export const passwordReset = email => async dispatch => {
  try {
    dispatch({ type: LOADING_START });
    const res = await axios.post("/api/reset", email);
    dispatch({ type: RESET_PASSWORD, payload: res.data });
    dispatch({ type: LOADING_STOP });
  } catch (error) {
    console.log(error);
    dispatch({ type: RESET_PASSWORD_FAILED });
    dispatch({ type: LOADING_STOP });
  }
};

export const editUser = (credentials, history) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: LOADING_START });
    const res = await axios.patch(`/api/user/edit`, credentials);
    if (res.data.user.phoneNumber) {
      res.data.user.phoneNumber = res.data.user.phoneNumber.toString();
    }
    dispatch({ type: EDIT_USER, payload: res.data });
    if (history) {
      history.push("/");
    }
    dispatch({ type: LOADING_STOP });
  } catch (error) {
    console.log(error);
    dispatch({ type: EDIT_USER_FAILED });
    authCheck(error);
    dispatch({ type: LOADING_STOP });
  }
};
export const checkoutUser = (credentials, history) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: CHECKOUT_USER_START });
    dispatch({ type: LOADING_START });
    const res = await axios.patch(`/api/user/edit`, credentials);
    if (res.data.user.phoneNumber) {
      res.data.user.phoneNumber = res.data.user.phoneNumber.toString();
    }
    dispatch({ type: CHECKOUT_USER, payload: res.data });
    history.push("/checkout");
    dispatch({ type: CHECKOUT_USER_STOP });
  } catch (error) {
    console.log(error);
    dispatch({ type: CHECKOUT_USER_FAILED });
    authCheck(error);

    dispatch({ type: CHECKOUT_USER_STOP });
  }
};

export const fetchProductsSearch = searchTerm => async dispatch => {
  try {
    if (searchTerm.trim()) {
      const res = await axios.post("/api/product/search", {
        searchTerm
      });
      dispatch({ type: FETCH_PRODUCTS_SEARCH, payload: res.data });
    }
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILED });
    console.log(error.response);
  }
};

export const updatePasswordLoggedIn = (
  formValues,
  history
) => async dispatch => {
  try {
    dispatch({ type: LOADING_START });
    const { currentPassword, newPassword } = formValues;
    const res = await axios.patch("/api/loggedIn/reset/password", {
      currentPassword,
      newPassword
    });
    dispatch({ type: UPDATE_PASSWORD_LOGGED_IN, payload: res.data });
    dispatch({ type: LOADING_STOP });
    history.push("/");
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_LOGGED_IN_FAILED });
    authCheck(error);
    dispatch({ type: LOADING_STOP });
    console.log(error);
  }
};

export const registerSeller = credentials => async (dispatch, getState) => {
  try {
    dispatch({ type: REGISTER_SELLER_START });

    const res = await axios.post("/api/seller/register", credentials);

    dispatch({ type: REGISTER_SELLER, payload: res.data });
    dispatch({ type: REGISTER_SELLER_STOP });
  } catch (error) {
    console.log(error.response);
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.email
    ) {
      getState().form.seller.values.email = "";
      dispatch({
        type: REGISTER_SELLER_FAILED,
        payload: error.response.data.email
      });
      dispatch({ type: REGISTER_SELLER_STOP });
      return;
    }
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.keyPattern &&
      Object.keys(error.response.data.keyPattern)[0] === "phoneNumber"
    ) {
      dispatch({
        type: REGISTER_SELLER_FAILED,
        payload: "That phone number already exists"
      });
      dispatch({ type: REGISTER_SELLER_STOP });
      return;
    }
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.keyPattern &&
      error.response.data.keyPattern[0]
    ) {
      getState().form.seller.values[
        Object.keys(error.response.data.keyPattern)[0]
      ] = "";
      dispatch({
        type: REGISTER_SELLER_FAILED,
        payload: "That store name already exists"
      });
      dispatch({ type: REGISTER_SELLER_STOP });
      return;
    }
    dispatch({
      type: REGISTER_SELLER_FAILED,
      payload: "Error Registering, Please try again or contact us"
    });
    dispatch({ type: REGISTER_SELLER_STOP });
  }
};
export const updateSeller = (credentials, history) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: LOADING_START });
    const res = await axios.post("/api/seller/update/info", credentials);
    dispatch({ type: REGISTER_SELLER, payload: res.data });
    history.push("/seller-dashboard");
    dispatch({ type: LOADING_STOP });
  } catch (error) {
    authCheck(error);
    console.log(error.response);
    if (error.response.data.email) {
      getState().form.seller.values.email = "";
      dispatch({
        type: REGISTER_SELLER_FAILED,
        payload: error.response.data.email
      });
      dispatch({ type: LOADING_STOP });
      return;
    }
    dispatch({ type: LOADING_STOP });
  }
};

export const fetchSeller = () => async dispatch => {
  try {
    const res = await axios.get("/api/current_seller");
    if (res.data.phoneNumber) {
      res.data.phoneNumber = res.data.phoneNumber.toString();
    }
    dispatch({ type: FETCH_SELLER, payload: res.data });
  } catch (error) {
    authCheck(error);
    console.log(error);
  }
};

export const sendMessage = (formvalues, history) => async dispatch => {
  try {
    dispatch({ type: LOADING_START });
    await axios.post("/api/twilio", formvalues);
    dispatch({ type: LOADING_STOP });
    history.push("/number/verify");
  } catch (error) {
    dispatch({ type: LOADING_STOP });
    console.log(error.response);
  }
};
export const fetchSellerNumber = history => async dispatch => {
  try {
    dispatch({ type: LOADING_START });
    const res = await axios.get("/api/number/verify");
    dispatch({ type: FETCH_SELLER_NUMBER, payload: res.data });
    dispatch({ type: LOADING_STOP });
  } catch (error) {
    history.push("/seller/register");
    dispatch({ type: LOADING_STOP });
    console.log(error);
  }
};
export const verifyCode = (formValues, history) => async (
  dispatch,
  getState
) => {
  try {
    formValues.phoneNumber = getState().seller.sellerNumber.number;
    dispatch({ type: LOADING_START });
    await axios.post("/api/twilio/verify", formValues);
    dispatch({ type: LOADING_STOP });
    history.push("/seller/sign-in");
  } catch (error) {
    dispatch({ type: LOADING_STOP });
    getState().form.VerifySellerNumber.values.code = "";
    dispatch({
      type: INVALID_VERIFICATION_CODE,
      payload: "The Verification code you entered is invalid. Please try again"
    });
  }
};

export const resetTokenCheck = () => async dispatch => {
  try {
    dispatch({ type: LOADING_START });
    const res = await axios.get("/api/password/reset/callback");
    dispatch({ type: RESET_TOKEN_CHECK, payload: res.data });
    dispatch({ type: LOADING_STOP });
  } catch (error) {
    dispatch({ type: LOADING_STOP });
    console.log(error.response);
  }
};

export const forgotPassword = (formvalues, history) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: LOADING_START });
    await axios.post(`/api/reset/${getState().seller.resetToken}`, formvalues);
    dispatch({ type: LOADING_STOP });
    history.push("/sign-in");
  } catch (error) {
    dispatch({ type: LOADING_STOP });
    console.log(error.response);
  }
};

export const fetchSellerProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_SELLER_PRODUCTS_START });
    const res = await axios.get(`/api/products/seller`);
    dispatch({ type: FETCH_SELLER_PRODUCTS, payload: res.data });
    dispatch({ type: FETCH_SELLER_PRODUCTS_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_SELLER_PRODUCTS_STOP });
    console.log(error.response);
  }
};

export const addProduct = (product, history) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOADING_START });

    await axios.post(`/api/product/add`, product);
    dispatch({ type: ADD_PRODUCT });
    dispatch({ type: LOADING_STOP });
    history.push("/seller-products");
  } catch (error) {
    authCheck(error);
    dispatch({ type: ADD_PRODUCT_ERROR, payload: error.response.data.message });
    dispatch({ type: LOADING_STOP });
    console.log(error.response);
  }
};

export const storeImage = image => async dispatch => {
  try {
    dispatch({ type: STORE_IMAGE_START });
    const uploadConfig = await axios.get("/api/image/upload");
    if (uploadConfig.data.url) {
      await axios.put(uploadConfig.data.url, image, {
        headers: {
          "Content-Type": image.type
        }
      });
      if (!uploadConfig.data || (uploadConfig.data && !uploadConfig.data.key)) {
        console.log(uploadConfig);
        dispatch({
          type: UPLOAD_IMAGE_ERROR,
          payload:
            "Error uploading image, please refresh the page and try again"
        });
      }
      dispatch({
        type: STORE_IMAGE,
        payload: uploadConfig.data.key
      });

      dispatch({ type: STORE_IMAGE_STOP });
      return;
    }
    dispatch({ type: STORE_IMAGE_STOP });
    throw new Error("Error getting url");
  } catch (error) {
    authCheck(error);
    console.log(error.response.data);
    console.log(error);
    dispatch({ type: STORE_IMAGE_STOP });
  }
};
export const unpersistImage = () => {
  return {
    type: UNPERSIST_IMAGE
  };
};

export const editProduct = (formvalues, productId, history) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: LOADING_START });
    await axios.patch(`/api/product/edit/${productId}`, formvalues);
    dispatch({ type: EDIT_PRODUCT });
    dispatch({ type: LOADING_STOP });
    history.push("/seller-products");
  } catch (error) {
    authCheck(error);
    dispatch({ type: LOADING_STOP });
    console.log(error.response);
  }
};

export const addToCart = product => (dispatch, getState) => {
  const products = getState().product.products;
  let cart = getState().cartReducer.cart;
  const newCart =
    cart.length !== 0 &&
    cart.map(item => {
      const pro = products.find(p => p._id.toString() === item._id.toString());
      if (pro) {
        return {
          freeShipping: pro.freeShipping,
          name: pro.name,
          price: pro.price,
          stockQuantity: pro.stockQuantity,
          imageUrl: pro.imageUrl,
          seller: { storeName: pro.seller.storeName },
          _id: pro._id,
          quantity: item.quantity
        };
      }
      return item;
    });
  if (newCart) {
    getState().cartReducer.cart = newCart;
  }
  dispatch({
    type: ADD_TO_CART,
    payload: product
  });
};

export const removeFromCart = product => async dispatch => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: product
  });
};

export const deleteFromCart = product => async (dispatch, getState) => {
  try {
    // const isSignedIn = getState().auth.isSignedIn;
    // if (isSignedIn) {
    //   await axios.patch("/api/delete/cart", { productId: product._id });
    // }
    dispatch({
      type: DELETE_FROM_CART,
      payload: product
    });
    if (
      getState().cartReducer.cart.length === 0 &&
      getState().auth.isSignedIn
    ) {
      dispatch(saveCartItems(getState().cartReducer.cart));
    }
  } catch (error) {
    const isSignedIn = getState().auth.isSignedIn;
    if (isSignedIn) {
      authCheck(error);
    }
    console.log(error);
  }
};

export const fetchCategories = () => async dispatch => {
  try {
    dispatch({ type: LOADING_START });
    const res = await axios.get("/api/products/find/categories");
    dispatch({ type: FETCH_CATEGORIES, payload: res.data });
    dispatch({ type: LOADING_STOP });
  } catch (error) {
    dispatch({ type: LOADING_STOP });
    console.log(error.response);
  }
};

export const fetchSubCategories = category => async dispatch => {
  try {
    const res = await axios.get(`/api/products/find/subcategories/${category}`);
    dispatch({ type: FETCH_SUB_CATEGORIES, payload: res.data });
  } catch (error) {
    console.log(error.response);
  }
};
export const emptySubCategories = () => {
  return {
    type: EMPTY_SUB_CATEGORIES
  };
};

export const fetchAllCategories = () => async dispatch => {
  try {
    dispatch({ type: SINGLE_CATEGORY_START });
    const res = await axios.get("/api/fetch/all/categories");
    dispatch({ type: FETCH_ALL_CATEGORIES, payload: res.data });
    dispatch({ type: SINGLE_CATEGORY_STOP });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: SINGLE_CATEGORY_STOP });
  }
};

export const preMakeOrder = (credentials, history) => dispatch => {
  dispatch({ type: PRE_MAKE_ORDER, payload: credentials });
  if (credentials.formValues.payment === "mpesa") {
    return history.push("/mpesa-payment");
  }
  history.push("/card/payment");
};

export const makeOrder = (credentials, history) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: MAKE_ORDER_START });
    const distanceId =
      getState().detailsPersist.distance &&
      getState().detailsPersist.distance._id;
    const response = await fetch("/api/new/order", {
      method: "POST",
      body: JSON.stringify({
        ...credentials,
        distanceId
      }),
      headers: { "Content-Type": "application/json" }
    });
    const res = await response.json();
    dispatch({ type: MAKE_ORDER, payload: res });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_ORDER_SUCCESS, payload: error });
    dispatch({ type: MAKE_ORDER_STOP });
    console.log(error.response);
  }
};

export const fetchOrderSuccess = history => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_ORDER_SUCCESS_START });
    const orderId =
      getState().cartReducer.pendingOrder &&
      getState().cartReducer.pendingOrder._id;
    const cart = getState().cartReducer.cart;
    if (orderId) {
      const res = await axios.post(`/api/mpesa/paid/order`, {
        cart,
        orderId,
        checkoutRequestId: getState().cartReducer.pendingOrder.checkoutRequestId
      });
      dispatch({ type: FETCH_ORDER_SUCCESS, payload: res.data });
    }
    const orderSuccess = getState().cartReducer.orderSuccess;
    dispatch({ type: FETCH_ORDER_SUCCESS_STOP });

    if (
      orderSuccess &&
      Object.keys(orderSuccess).length > 1 &&
      orderSuccess.mpesaCode === 0
    ) {
      return history.push("/order/success");
    }
    if (
      orderSuccess &&
      Object.keys(orderSuccess).length > 1 &&
      orderSuccess.mpesaCode !== 0
    ) {
      return history.push("/mpesa/error");
    }
    if (orderSuccess && orderSuccess.message) {
      return history.push("/mpesa/error");
    }

    history.push("/order/success");
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_ORDER_SUCCESS_STOP });
    history.push("/mpesa/error");
    console.log(error.response);
  }
};

export const removePendingAndSuccess = () => {
  return {
    type: REMOVE_PENDING_AND_SUCCESS
  };
};

export const fetchSellerOrders = () => async dispatch => {
  try {
    dispatch({ type: FETCH_SELLER_ORDERS_START });
    const res = await axios.get("/api/seller/orders");
    dispatch({ type: FETCH_SELLER_ORDERS, payload: res.data });
    dispatch({ type: FETCH_SELLER_ORDERS_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_SELLER_ORDERS_STOP });
    console.log(error.response);
  }
};

export const fetchSellerOrderDetails = orderDetails => {
  return {
    type: FETCH_SELLER_ORDER_DETAILS,
    payload: orderDetails
  };
};

export const fetchBuyerOrders = () => async dispatch => {
  try {
    dispatch({ type: FETCH_ORDERS_LOADING_START });
    const res = await axios.get("/api/orders");
    dispatch({ type: FETCH_BUYER_ORDERS, payload: res.data });
    dispatch({ type: FETCH_ORDERS_LOADING_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_ORDERS_LOADING_STOP });
    console.log(error.response);
  }
};

export const addToWishlist = product => (dispatch, getState) => {
  const products = getState().product.products;
  let wishlist = getState().cartReducer.wishlist;
  const itemFound = wishlist.find(item => item._id === product._id);
  if (itemFound) {
    return;
  }
  const newWishlist =
    wishlist.length !== 0 &&
    wishlist.map(item => {
      const pro = products.find(p => p._id.toString() === item._id.toString());
      if (pro) {
        return {
          freeShipping: pro.freeShipping,
          name: pro.name,
          price: pro.price,
          stockQuantity: pro.stockQuantity,
          imageUrl: pro.imageUrl,
          seller: { storeName: pro.seller.storeName },
          _id: pro._id,
          quantity: item.quantity
        };
      }
      return item;
    });
  if (newWishlist) {
    getState().cartReducer.wishlist = newWishlist;
  }
  dispatch({
    type: ADD_TO_WISHLIST,
    payload: product
  });
};

export const removeFromWishlist = product => async (dispatch, getState) => {
  try {
    // await axios.patch("/api/delete/wishlist", { productId: product._id });
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: product
    });
    await dispatch(saveWishlistItems(getState().cartReducer.wishlist));
    dispatch(fetchWishlistProducts());
  } catch (error) {
    authCheck(error);
    console.log(error.response);
  }
};

export const fetchBuyerOrderDetails = (orderId, history) => async dispatch => {
  try {
    dispatch({ type: FETCH_ORDERS_LOADING_START });
    const res = await axios.get(`/api/buyer/order/details/${orderId}`);
    dispatch({ type: FETCH_BUYER_ORDER_DETAILS, payload: res.data });
    dispatch({ type: FETCH_ORDERS_LOADING_STOP });
  } catch (error) {
    authCheck(error);
    pathCheck(error, history);
    dispatch({ type: FETCH_ORDERS_LOADING_STOP });
    console.log(error.response);
  }
};

export const hasMoreFalse = () => {
  return {
    type: HAS_MORE_FALSE
  };
};
export const hasMoreCategoryFalse = () => {
  return {
    type: HAS_MORE_CATEGORY_FALSE
  };
};

export const hasMoreSearchFalse = () => {
  return {
    type: HAS_MORE_SEARCH_FALSE
  };
};
export const fetchProducts = () => async dispatch => {
  try {
    dispatch({ type: FETCH_PRODUCTS_START });
    const res = await axios.post(`/api/products`, { itemsToSkip: 0 });
    dispatch({ type: FETCH_PRODUCTS, payload: res.data });
    dispatch({ type: FETCH_PRODUCTS_STOP });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_STOP });
    console.log(error.response);
  }
};
export const fetchMoreProducts = () => async (dispatch, getState) => {
  try {
    const itemsToSkip = getState().product.products.length;
    dispatch({ type: LOADING_START });
    const res = await axios.post("/api/products", { itemsToSkip });
    dispatch({ type: FETCH_MORE_PRODUCTS, payload: res.data });
    dispatch({ type: LOADING_STOP });
  } catch (error) {
    dispatch({ type: LOADING_STOP });
    console.log(error.response);
  }
};

export const signInClick = () => {
  return {
    type: SIGN_IN_CLICK
  };
};

export const registerClick = () => {
  return {
    type: REGISTER_CLICK
  };
};

export const fetchSingleProduct = (productId, history) => async dispatch => {
  try {
    dispatch({ type: SINGLE_PRODUCT_START });
    const res = await axios.get(`/api/product/${productId}`);
    dispatch({ type: FETCH_SINGLE_PRODUCT, payload: res.data });
    dispatch({ type: SINGLE_PRODUCT_STOP });
  } catch (error) {
    dispatch({ type: SINGLE_PRODUCT_STOP });
    console.log(error.response);
    pathCheck(error, history);
  }
};

export const fetchRelatedProducts = subcategory => async dispatch => {
  try {
    dispatch({ type: LOADING_START });
    const res = await axios.get(
      `/api/products/category/subcategory/${subcategory}`
    );
    dispatch({ type: FETCH_RELATED_PRODUCTS, payload: res.data });
    dispatch({ type: LOADING_STOP });
  } catch (error) {
    dispatch({ type: LOADING_STOP });
    console.log(error.response);
  }
};

export const fetchPendingReviews = () => async dispatch => {
  try {
    dispatch({ type: FETCH_PENDING_REVIEWS_LOADING_START });
    const res = await axios.get("/api/pending/reviews");
    dispatch({ type: FETCH_PENDING_REVIEWS, payload: res.data });
    dispatch({ type: FETCH_PENDING_REVIEWS_LOADING_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_PENDING_REVIEWS_LOADING_STOP });
    console.log(error.response);
  }
};

export const submitReview = (
  review,
  rating,
  productId,
  orderId,
  history
) => async dispatch => {
  try {
    dispatch({ type: FETCH_SELLER_REVIEWS_START });
    await axios.post(`/api/new/review/${productId}/${orderId}`, {
      title: review.title,
      body: review.body,
      rating
    });
    dispatch({ type: FETCH_SELLER_REVIEWS_STOP });
    history.push("/pending/reviews");
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_SELLER_REVIEWS_STOP });
    console.log(error.response);
  }
};
export const redirectOnFail = (
  productId,
  orderId,
  history
) => async dispatch => {
  try {
    dispatch({ type: REDIRECT_ON_FAIL_START });
    const res = await axios.get(`/api/url/add/review/${productId}/${orderId}`);
    if (!res.data.order) {
      history.push("/");
    }
    dispatch({ type: REDIRECT_ON_FAIL_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: REDIRECT_ON_FAIL_STOP });
    history.push("/");
  }
};
export const redirectOnNotDelivered = (
  productId,
  orderId,
  history
) => async dispatch => {
  try {
    dispatch({ type: REDIRECT_ON_FAIL_START });
    const res = await axios.get(
      `/api/redirect/on/not/delivered/${productId}/${orderId}`
    );
    if (!res.data.order) {
      history.push("/");
    }
    dispatch({ type: REDIRECT_ON_FAIL_STOP });
  } catch (error) {
    authCheck(error);
    pathCheck(error, history);
    dispatch({ type: REDIRECT_ON_FAIL_STOP });
  }
};

export const fetchProductReviews = (productId, history) => async dispatch => {
  try {
    dispatch({ type: FETCH_ORDERS_LOADING_START });
    const res = await axios.get(`/api/product/reviews/${productId}`);
    dispatch({ type: PRODUCT_REVIEWS, payload: res.data });
    dispatch({ type: FETCH_ORDERS_LOADING_STOP });
  } catch (error) {
    dispatch({ type: FETCH_ORDERS_LOADING_STOP });
    console.log(error);
    console.log(error.response);
    pathCheck(error, history);
  }
};
export const singleCategory = (category, filter, history) => async (
  dispatch,
  getState
) => {
  try {
    const test = {};
    const sort = {};

    if (filter.rating) {
      test.rating = { $gte: 4 };
    }
    if (filter.freeShipping) {
      test.freeShipping = true;
    }

    if (filter.priceMin) {
      test.price = { $gte: filter.priceMin };
    }
    if (filter.priceMax) {
      test.price = { ...test.price, $lte: filter.priceMax };
    }
    if (filter.priceMin > filter.priceMax) {
      test.price = { $gte: filter.priceMax, $lte: filter.priceMin };
    }
    if (filter.price === "highestPrice") {
      sort.price = -1;
    }
    if (filter.price === "lowestPrice") {
      sort.price = 1;
    }
    test.category = category;
    if (Object.keys(sort).length === 0) {
      sort.price = 1;
    }
    dispatch({ type: SINGLE_CATEGORY_START });
    const res = await axios.post(`/api/products/skip/category`, {
      itemsToSkip: 0,
      test,
      sort
    });
    dispatch({ type: SINGLE_CATEGORY, payload: res.data });
    dispatch({ type: SINGLE_CATEGORY_STOP });
    // history.push(`/products/category/${category}`);
  } catch (error) {
    dispatch({ type: SINGLE_CATEGORY_STOP });
    console.log(error.response);
    history.push("/categories");
  }
};
export const moreSingleCategoryProducts = (category, filter) => async (
  dispatch,
  getState
) => {
  try {
    const test = {};
    const sort = {};
    if (filter.rating) {
      test.rating = { $gte: 4 };
    }
    if (filter.freeShipping) {
      test.freeShipping = true;
    }
    if (filter.priceMin) {
      test.price = { $gte: filter.priceMin };
    }
    if (filter.priceMax) {
      test.price = { ...test.price, $lte: filter.priceMax };
    }
    if (filter.priceMin > filter.priceMax) {
      test.price = { $gte: filter.priceMax, $lte: filter.priceMin };
    }

    if (filter.price === "highestPrice") {
      sort.price = -1;
    }
    if (filter.price === "lowestPrice") {
      sort.price = 1;
    }
    test.category = category;
    if (Object.keys(sort).length === 0) {
      sort.price = 1;
    }
    // const itemsToSkip = getState().product.itemsToSkip;
    const prodCount = getState().product.categoryProductCount;
    const singleProdLength = getState().product.singleCategoryProducts.length;
    if (singleProdLength < prodCount) {
      dispatch({ type: FILTERED_PRODUCTS_START });
      const res = await axios.post(`/api/products/skip/category`, {
        itemsToSkip: singleProdLength,
        test,
        sort
      });
      dispatch({ type: MORE_SINGLE_CATEGORY_PRODUCTS, payload: res.data });
    }
    dispatch({ type: FILTERED_PRODUCTS_STOP });
  } catch (error) {
    dispatch({ type: FILTERED_PRODUCTS_STOP });
    console.log(error);
    console.log(error.response);
  }
};
export const searchTermProducts = (
  filter,
  history,
  searchTerm
) => async dispatch => {
  try {
    const test = {};
    const sort = {};
    if (filter.rating) {
      test.rating = { $gte: 4 };
    }
    if (filter.freeShipping) {
      test.freeShipping = true;
    }

    if (filter.priceMin) {
      test.price = { $gte: filter.priceMin };
    }
    if (filter.priceMax) {
      test.price = { ...test.price, $lte: filter.priceMax };
    }
    if (filter.priceMin > filter.priceMax) {
      test.price = { $gte: filter.priceMax, $lte: filter.priceMin };
    }
    if (filter.price === "highestPrice") {
      sort.price = -1;
    }
    if (filter.price === "lowestPrice") {
      sort.price = 1;
    }
    if (Object.keys(sort).length === 0) {
      sort.price = 1;
    }
    dispatch({ type: SEARCH_PRODUCTS_START });
    const res = await axios.post(`/api/products/search/term`, {
      itemsToSkip: 0,
      searchTerm,
      test,
      sort
    });
    dispatch({ type: SEARCH_PRODUCTS, payload: res.data });
    dispatch({ type: SEARCH_PRODUCTS_STOP });
    // history.push(`/products/category/${category}`);
  } catch (error) {
    dispatch({ type: SEARCH_PRODUCTS_STOP });
    console.log(error.response);
    history.push("/");
  }
};
export const moreSearchTermProducts = (filter, searchTerm) => async (
  dispatch,
  getState
) => {
  try {
    const test = {};
    const sort = {};
    if (filter.rating) {
      test.rating = { $gte: 4 };
    }
    if (filter.freeShipping) {
      test.freeShipping = true;
    }
    if (filter.priceMin) {
      test.price = { $gte: filter.priceMin };
    }
    if (filter.priceMax) {
      test.price = { ...test.price, $lte: filter.priceMax };
    }
    if (filter.priceMin > filter.priceMax) {
      test.price = { $gte: filter.priceMax, $lte: filter.priceMin };
    }

    if (filter.price === "highestPrice") {
      sort.price = -1;
    }
    if (filter.price === "lowestPrice") {
      sort.price = 1;
    }

    if (Object.keys(sort).length === 0) {
      sort.price = 1;
    }
    // const itemsToSkip = getState().product.itemsToSkip;
    const prodCount = getState().search.searchProductCount;
    const singleProdLength = getState().search.searchProducts.length;

    if (singleProdLength < prodCount) {
      dispatch({ type: MORE_SEARCH_PRODUCTS_START });
      const res = await axios.post(`/api/products/search/term`, {
        itemsToSkip: singleProdLength,
        test,
        searchTerm,
        sort
      });
      dispatch({ type: MORE_SEARCH_PRODUCTS, payload: res.data });
    }
    dispatch({ type: MORE_SEARCH_PRODUCTS_STOP });
  } catch (error) {
    dispatch({ type: MORE_SEARCH_PRODUCTS_STOP });
    console.log(error);
    console.log(error.response);
  }
};
export const handleSearchTerm = term => dispatch => {
  if (term.trim() === "") {
    dispatch(clearSearchTerm());
  }
  dispatch({
    type: HANDLE_SEARCH_TERM,
    payload: term
  });
};

export const handleUrlSearchTerm = (filter, history, term) => dispatch => {
  dispatch(searchTermProducts(filter, history, term));
  dispatch({
    type: HANDLE_URL_SEARCH_TERM,
    payload: term
  });
};

export const clearSearchTerm = () => (dispatch, getState) => {
  getState().search.searchItemsToSkip = 0;
  getState().product.searchedProducts = [];
  dispatch({
    type: CLEAR_SEARCH_TERM
  });
};

export const handleCheckboxAction = (event, category, history, searchTerm) => (
  dispatch,
  getState
) => {
  dispatch({ type: HANDLE_CHECKBOX, payload: { event } });
  const filter = getState().filter;
  getState().product.singleCategoryProducts = [];
  getState().product.itemsToSkip = 0;

  if (category) {
    return dispatch(singleCategory(category, filter, history));
  }
  if (searchTerm) {
    dispatch(searchTermProducts(filter, history, searchTerm));
  }
};
export const handleChangeAction = event => (dispatch, getState) => {
  // getState().product.itemsToSkip = 0;
  // getState().product.singleCategoryProducts = [];
  dispatch({
    type: HANDLE_CHANGE,
    payload: {
      event
    }
  });
};

export const revertFilter = (category, filter, history) => (
  dispatch,
  getState
) => {
  dispatch({
    type: REVERT_FILTER
  });
  if (category) {
    dispatch(singleCategory(category, getState().filter, history));
  }
};
export const handleRadioButtonAction = (
  category,
  event,
  history,
  searchTerm
) => (dispatch, getState) => {
  getState().product.singleCategoryProducts = [];
  getState().product.itemsToSkip = 0;

  dispatch({
    type: RADIO_BUTTON,
    payload: {
      event
    }
  });
  const filter = getState().filter;

  if (category) {
    return dispatch(singleCategory(category, filter, history));
  }
  if (searchTerm) {
    dispatch(searchTermProducts(filter, history, searchTerm));
  }
};
export const handleOkayButton = (category, history) => (dispatch, getState) => {
  const filter = getState().filter;
  const searchTerm = getState().cartReducer.typing;

  if (category) {
    return dispatch(singleCategory(category, filter, history));
  }
  if (searchTerm) {
    dispatch(searchTermProducts(filter, history, searchTerm));
  }
};
export const fetchSellerReviews = () => async dispatch => {
  try {
    dispatch({ type: FETCH_SELLER_REVIEWS_START });
    const res = await axios.get(`/api/seller/reviews`);
    dispatch({ type: FETCH_SELLER_REVIEWS, payload: res.data });
    dispatch({ type: FETCH_SELLER_REVIEWS_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_SELLER_REVIEWS_STOP });
    console.log(error.response);
  }
};

export const storeDescription = description => {
  return {
    type: STORE_DESCRIPTION,
    payload: description
  };
};

export const deleteImage = (imageUrl, productId) => async dispatch => {
  try {
    dispatch({ type: DELETE_IMAGE_START });
    await axios.post(`/api/images/delete/${productId}`, {
      imageUrl
    });
    await dispatch(fetchSellerProducts());
    dispatch({ type: DELETE_IMAGE, payload: imageUrl });
    dispatch({ type: DELETE_IMAGE_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: DELETE_IMAGE_STOP });
    console.log(error.response.data);
  }
};

export const paymentPerDistance = details => async dispatch => {
  try {
    dispatch({ type: PAYMENT_DISTANCE_START });
    const res = await axios.post(`/api/buyer/destination`, details);
    dispatch({ type: PAYMENT_DISTANCE, payload: res.data });
    dispatch({ type: PAYMENT_DISTANCE_STOP });
    if (details.deliveryMethod) {
      dispatch(deliveryCloseAction());
    }
  } catch (error) {
    authCheck(error);
    dispatch({ type: PAYMENT_DISTANCE_STOP });
    console.log(error.response);
  }
};
// PROTECT THIS ROUTE LATER
export const getStock = () => async dispatch => {
  try {
    dispatch({ type: GET_STOCK_START });
    const res = await axios.get("/api/root/admin/stock/report");
    dispatch({ type: GET_STOCK, payload: res.data });
    dispatch({ type: GET_STOCK_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: GET_STOCK_STOP });
    console.log(error.response);
  }
};

export const fetchVerifiedSellers = () => async dispatch => {
  try {
    dispatch({ type: FETCH_SELLERS_START });
    const res = await axios.get("/api/verified/sellers");
    dispatch({
      type: FETCH_VERIFIED_SELLERS,
      payload: res.data.verifiedSellers
    });
    dispatch({ type: FETCH_SELLERS_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_SELLERS_STOP });
    console.log(error.response);
  }
};

export const fetchVerifiedSeller = (sellerId, history) => async dispatch => {
  try {
    dispatch({ type: VERIFIED_SELLER_START });
    const res = await axios.get(`/api/verified/seller/${sellerId}`);
    dispatch({ type: FETCH_VERIFIED_SELLER, payload: res.data });
    dispatch({ type: VERIFIED_SELLER_STOP });
  } catch (error) {
    authCheck(error);
    pathCheck(error, history);
    dispatch({ type: VERIFIED_SELLER_STOP });
    history.push("/");
  }
};

export const fetchNewSellers = () => async dispatch => {
  try {
    dispatch({ type: FETCH_SELLERS_START });
    const res = await axios.get("/api/new/sellers");
    dispatch({ type: FETCH_NEW_SELLERS, payload: res.data });
    dispatch({ type: FETCH_SELLERS_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_SELLERS_STOP });
    console.log(error.response);
  }
};
export const fetchNewSeller = (sellerId, history) => async dispatch => {
  try {
    dispatch({ type: FETCH_NEW_SELLERS_START });
    const res = await axios.get(`/api/new/seller/${sellerId}`);
    dispatch({ type: FETCH_NEW_SELLER, payload: res.data });
    dispatch({ type: FETCH_NEW_SELLERS_STOP });
  } catch (error) {
    authCheck(error);
    pathCheck(error, history);
    dispatch({ type: FETCH_NEW_SELLERS_STOP });
    console.log(error.response);
  }
};

export const fetchAdminOrders = () => async dispatch => {
  try {
    dispatch({ type: FETCH_ADMIN_ORDERS_START });
    const res = await axios.get("/api/root/admin/orders");
    dispatch({ type: FETCH_ADMIN_ORDERS, payload: res.data });
    dispatch({ type: FETCH_ADMIN_ORDERS_STOP });
  } catch (error) {
    authCheck(error);
  }
};

export const fetchAdminPendingOrders = () => async dispatch => {
  try {
    dispatch({ type: FETCH_ADMIN_ORDERS_START });
    const res = await axios.get("/api/root/admin/pending/orders");
    dispatch({ type: FETCH_ADMIN_PENDING_ORDERS, payload: res.data });
    dispatch({ type: FETCH_ADMIN_ORDERS_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_ADMIN_ORDERS_STOP });
    console.log(error.response);
  }
};

export const fetchAllOrders = filter => async dispatch => {
  try {
    let test = {};
    test.paid = true;

    if (filter && filter === "today") {
      test = Date.now() - 60 * 60 * 24 * 1000;
    }
    if (filter && filter === "lastWeek") {
      test = Date.now() - 60 * 60 * 24 * 1000 * 7;
    }
    if (filter && filter === "lastMonth") {
      test = Date.now() - 60 * 60 * 24 * 1000 * 30;
    }
    if (filter && filter === "pendingOrders") {
      test.delivered = false;
    }
    dispatch({ type: FETCH_ADMIN_ORDERS_START });
    const res = await axios.post("/api/root/admin/all/orders", {
      itemsToSkip: 0,
      test
    });
    dispatch({ type: FETCH_ALL_ORDERS, payload: res.data });
    dispatch({ type: FETCH_ADMIN_ORDERS_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_ADMIN_ORDERS_STOP });
    console.log(error.response);
  }
};

export const adminRadio = event => (dispatch, getState) => {
  getState().admin.ordersToSkip = 0;
  getState().admin.orderCount = 0;
  dispatch({
    type: ADMIN_RADIO,
    payload: {
      event
    }
  });
};

export const fetchMoreAllOrders = filter => async (dispatch, getState) => {
  try {
    let test = {};
    test.paid = true;
    if (filter && filter === "today") {
      test = Date.now() - 60 * 60 * 24 * 1000;
    }
    if (filter && filter === "lastWeek") {
      test = Date.now() - 60 * 60 * 24 * 1000 * 7;
    }
    if (filter && filter === "lastMonth") {
      test = Date.now() - 60 * 60 * 24 * 1000 * 30;
    }
    if (filter && filter === "pendingOrders") {
      test.delivered = false;
    }
    dispatch({ type: FETCH_ADMIN_ORDERS_START });
    const prodCount = getState().admin.orderCount;
    const singleProdLength = getState().admin.allAdminOrders.length;
    if (singleProdLength < prodCount) {
      const res = await axios.post("/api/root/admin/all/orders", {
        itemsToSkip: singleProdLength,
        test
      });
      dispatch({ type: FETCH_MORE_ALL_ORDERS, payload: res.data });
    }
    dispatch({ type: FETCH_ADMIN_ORDERS_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_ADMIN_ORDERS_STOP });
    console.log(error.response);
  }
};

export const resetSkipAndCount = () => (dispatch, getState) => {
  getState().admin.ordersToSkip = 0;
  getState().admin.orderCount = 0;
};

export const hasMoreOrdersFalse = () => {
  return {
    type: HAS_MORE_ORDERS_FALSE
  };
};

export const fetchAdminOrder = (orderId, history) => async dispatch => {
  try {
    dispatch({ type: FETCH_ADMIN_ORDER_START });
    const res = await axios.get(`/api/root/admin/order/${orderId}`);
    dispatch({ type: FETCH_ADMIN_ORDER, payload: res.data });
    dispatch({ type: FETCH_ADMIN_ORDER_STOP });
  } catch (error) {
    authCheck(error);
    pathCheck(error, history);
    dispatch({ type: FETCH_ADMIN_ORDERS_STOP });
    console.log(error.response);
  }
};

export const fetchOrderById = orderId => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_ORDER_BY_ID_START });
    const res = await axios.get(`/api/admin/fetch/order/by/id/${orderId}`);
    dispatch({ type: FETCH_ORDER_BY_ID, payload: res.data });
    dispatch({ type: FETCH_ORDER_BY_ID_STOP });
  } catch (error) {
    authCheck(error);
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.stringValue
    ) {
      dispatch({ type: FETCH_ORDER_BY_ID_ERROR });
    }
    console.log(error.response);
    dispatch({ type: FETCH_ORDER_BY_ID_STOP });
  }
};

export const fetchWeeklySales = () => async dispatch => {
  try {
    dispatch({ type: FETCH_WEEKLY_SALES_START });
    const res = await axios.get("/api/fetch/weekly/sales");
    dispatch({ type: FETCH_WEEKLY_SALES, payload: res.data });
    dispatch({ type: FETCH_WEEKLY_SALES_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_WEEKLY_SALES_STOP });
    console.log(error.response);
  }
};

export const setPendingOrders = () => {
  return {
    type: SET_PENDING_ORDERS
  };
};
export const addNewCategory = (category, history) => async dispatch => {
  try {
    dispatch({ type: ADD_NEW_CATEGORY_START });
    await axios.post("/api/root/admin/add/new/category", {
      category
    });
    dispatch({ type: ADD_NEW_CATEGORY });
    dispatch({ type: ADD_NEW_CATEGORY_STOP });
    history.push("/admin-categories");
  } catch (error) {
    authCheck(error);
    dispatch({ type: ADD_NEW_CATEGORY_STOP });
    console.log(error.response);
  }
};
export const fetchAllAdminCategories = () => async dispatch => {
  try {
    dispatch({ type: FETCH_ALL_ADMIN_CATEGORIES_START });
    const res = await axios.get("/api/root/admin/fetch/all/categories");
    dispatch({ type: FETCH_ALL_ADMIN_CATEGORIES, payload: res.data });
    dispatch({ type: FETCH_ALL_ADMIN_CATEGORIES_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_ALL_ADMIN_CATEGORIES_STOP });
    console.log(error.response);
  }
};
export const fetchAllSellerCategories = () => async dispatch => {
  try {
    dispatch({ type: FETCH_ALL_ADMIN_CATEGORIES_START });
    const res = await axios.get("/api/seller/all/categories");
    dispatch({ type: FETCH_ALL_ADMIN_CATEGORIES, payload: res.data });
    dispatch({ type: FETCH_ALL_ADMIN_CATEGORIES_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_ALL_ADMIN_CATEGORIES_STOP });
    console.log(error.response);
  }
};

export const fetchSingleCategory = (categoryId, history) => async dispatch => {
  try {
    dispatch({ type: FETCH_SINGLE_CATEGORY_START });
    const res = await axios.get(`/api/root/admin/category/${categoryId}`);
    dispatch({ type: FETCH_SINGLE_CATEGORY, payload: res.data });
    dispatch({ type: FETCH_SINGLE_CATEGORY_STOP });
  } catch (error) {
    authCheck(error);
    pathCheck(error, history);
    dispatch({ type: FETCH_SINGLE_CATEGORY_STOP });
    console.log(error.response);
  }
};
export const editCategory = (
  categoryId,
  history,
  category
) => async dispatch => {
  try {
    dispatch({ type: EDIT_CATEGORY_START });
    await axios.patch(`/api/root/admin/edit/category/${categoryId}`, {
      category
    });
    dispatch({ type: EDIT_CATEGORY });
    dispatch({ type: EDIT_CATEGORY_STOP });
    history.push("/admin-categories");
  } catch (error) {
    authCheck(error);
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.stringValue
    ) {
      history.push("/");
    }
    dispatch({ type: EDIT_CATEGORY_STOP });
    console.log(error.response);
  }
};
export const handleIncrementAction = () => {
  return {
    type: HANDLE_INCREMENT_ACTION
  };
};
export const handleDecrementAction = () => {
  return {
    type: HANDLE_DECREMENT_ACTION
  };
};

export const handleCheckAction = bool => {
  return {
    type: HANDLE_CHECK_ACTION,
    payload: bool
  };
};

export const storeSellerImage = image => async (dispatch, getState) => {
  try {
    dispatch({ type: STORE_IMAGE_START });
    const uploadConfig = await axios.get("/api/image/upload/seller/details");
    if (uploadConfig.data.url) {
      await axios.put(uploadConfig.data.url, image, {
        headers: {
          "Content-Type": image.type
        }
      });
      dispatch({
        type: STORE_SELLER_IMAGE,
        payload: uploadConfig.data.key
      });
      const sellerImageUrl = getState().sellerDetails.sellerImageUrl;
      await axios.post("/api/store/seller/imageUrl", {
        imageUrl: sellerImageUrl
      });
      dispatch({ type: STORE_IMAGE_STOP });
      return;
    }
    dispatch({ type: STORE_IMAGE_STOP });
    throw new Error("Error getting url");
  } catch (error) {
    authCheck(error);
    console.log(error.response.data);
    dispatch({ type: STORE_IMAGE_STOP });
  }
};

export const fetchSellerNewOrdersCount = () => async dispatch => {
  try {
    dispatch({ type: FETCH_SELLER_ORDERS_START });
    const res = await axios.get("/api/seller/new/orders");
    dispatch({ type: FETCH_SELLER_NEW_ORDERS_COUNT, payload: res.data });
    dispatch({ type: FETCH_SELLER_ORDERS_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_SELLER_ORDERS_STOP });
  }
};

export const deleteSellerImage = imageUrl => async dispatch => {
  try {
    dispatch({ type: DELETE_IMAGE_START });
    await axios.post(`/api/seller/images/delete`, {
      imageUrl
    });
    dispatch({ type: DELETE_SELLER_IMAGE, payload: imageUrl });
    dispatch({ type: DELETE_IMAGE_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: DELETE_IMAGE_STOP });
    console.log(error.response.data);
  }
};

export const acceptSellerRequest = (history, sellerId) => async dispatch => {
  try {
    dispatch({ type: ACCEPT_SELLER_REQUEST_START });
    await axios.post(`/api/accept/seller/request/${sellerId}`);
    dispatch({ type: ACCEPT_SELLER_REQUEST });
    dispatch({ type: ACCEPT_SELLER_REQUEST_STOP });
    history.push("/admin-new-sellers");
  } catch (error) {
    authCheck(error);
    dispatch({ type: ACCEPT_SELLER_REQUEST_STOP });
    console.log(error.response);
  }
};

export const fetchUnderReview = () => async dispatch => {
  try {
    dispatch({ type: FETCH_UNDER_REVIEW_START });
    const res = await axios.get("/api/root/admin/new/products");
    dispatch({ type: FETCH_UNDER_REVIEW, payload: res.data });
    dispatch({ type: FETCH_UNDER_REVIEW_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_UNDER_REVIEW_STOP });
    console.log(error.response);
  }
};

export const fetchReviewProduct = (productId, history) => async dispatch => {
  try {
    dispatch({ type: FETCH_UNDER_REVIEW_START });
    const res = await axios.get(`/api/root/admin/review/product/${productId}`);
    dispatch({ type: FETCH_REVIEW_PRODUCT, payload: res.data });
    dispatch({ type: FETCH_UNDER_REVIEW_STOP });
  } catch (error) {
    authCheck(error);
    pathCheck(error, history);
    dispatch({ type: FETCH_UNDER_REVIEW_STOP });
    console.log(error.response);
  }
};

export const acceptProduct = (productId, history) => async dispatch => {
  try {
    dispatch({ type: ACCEPT_PRODUCT_START });
    await axios.post(`/api/root/admin/accept/product/${productId}`);
    dispatch({ type: ACCEPT_PRODUCT });
    await dispatch(fetchUnderReview());
    history.push("/admin/new-products");
    dispatch({ type: ACCEPT_PRODUCT_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: ACCEPT_PRODUCT_STOP });
    console.log(error.response);
  }
};
export const rejectProduct = (productId, history) => async dispatch => {
  try {
    dispatch({ type: REJECT_PRODUCT_START });
    await axios.post(`/api/root/admin/reject/product/${productId}`);
    dispatch({ type: REJECT_PRODUCT });
    history.push(`/admin/root/new-product/why-reject/${productId}`);
    dispatch({ type: REJECT_PRODUCT_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: REJECT_PRODUCT_STOP });
    console.log(error.response);
  }
};

export const rejectMessage = (
  productId,
  message,
  history
) => async dispatch => {
  try {
    dispatch({ type: REJECT_MESSAGE_START });
    await axios.post("/api/root/reject/message", { message, productId });
    dispatch({ type: REJECT_MESSAGE });
    history.push("/admin/new-products");
    dispatch({ type: REJECT_MESSAGE_STOP });
  } catch (error) {
    authCheck(error);
    pathCheck(error, history);
    dispatch({ type: REJECT_MESSAGE_STOP });
    console.log(error.response);
  }
};

export const fetchRejects = () => async dispatch => {
  try {
    dispatch({ type: FETCH_REJECTS_START });
    const res = await axios.get("/api/seller/product/rejects");
    dispatch({ type: FETCH_REJECTS, payload: res.data });
    dispatch({ type: FETCH_REJECTS_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_REJECTS_STOP });
    console.log(error.response);
  }
};

export const deleteSellerProduct = (productId, history) => async dispatch => {
  try {
    dispatch({ type: DELETE_SELLER_PRODUCT_START });
    await axios.delete(`/api/seller/product/delete/${productId}`);
    dispatch({ type: DELETE_SELLER_PRODUCT });
    await dispatch(fetchSellerProducts());
    history.push("/seller-products");
    dispatch({ type: DELETE_SELLER_PRODUCT_STOP });
  } catch (error) {
    authCheck(error);
    history.push("/seller-products");
    dispatch({ type: DELETE_SELLER_PRODUCT_STOP });
    console.log(error.response);
  }
};
export const fetchStoreProducts = (sellerId, history) => async dispatch => {
  try {
    dispatch({ type: FETCH_STORE_PRODUCTS_START });
    const res = await axios.get(`/api/fetch/store/products/${sellerId}`);
    dispatch({ type: FETCH_STORE_PRODUCTS, payload: res.data });
    dispatch({ type: FETCH_STORE_PRODUCTS_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_STORE_PRODUCTS_STOP });
    pathCheck(error, history);
    if (
      error &&
      error.response &&
      Object.keys(error.response.data).length === 0
    ) {
      return (window.location.href = "/");
    }
    console.log(error.response);
  }
};

export const newComplaint = (
  body,
  orderId,
  productId,
  history
) => async dispatch => {
  try {
    dispatch({ type: NEW_COMPLAINT_START });
    await axios.post(`/api/buyer/new/complaint/${orderId}/${productId}`, {
      body
    });
    dispatch({ type: NEW_COMPLAINT });
    history.push("/orders");
    dispatch({ type: NEW_COMPLAINT_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: NEW_COMPLAINT_STOP });
    console.log(error.response);
  }
};

export const countComplaints = () => async dispatch => {
  try {
    dispatch({ type: COUNT_COMPLAINTS_START });
    const res = await axios.get("/api/complaints/count");
    dispatch({ type: COUNT_COMPLAINTS, payload: res.data });
    dispatch({ type: COUNT_COMPLAINTS_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: COUNT_COMPLAINTS_STOP });
    console.log(error.response);
  }
};

export const fetchAllComplaints = () => async dispatch => {
  try {
    const res = await axios.get("/api/root/admin/complaints");
    dispatch({ type: FETCH_ALL_COMPLAINTS, payload: res.data });
  } catch (error) {
    authCheck(error);
    console.log(error.response);
  }
};

export const fetchComplaint = (complaintId, history) => async dispatch => {
  try {
    dispatch({ type: FETCH_COMPLAINT_START });
    const res = await axios.get(`/api/root/admin/complaint/${complaintId}`);
    dispatch({ type: FETCH_COMPLAINT, payload: res.data.complaint });
    dispatch({ type: FETCH_COMPLAINT_STOP });
  } catch (error) {
    authCheck(error);
    pathCheck(error, history);
    dispatch({ type: FETCH_COMPLAINT_STOP });
    console.log(error.response);
  }
};

export const fetchBuyerComplaints = () => async dispatch => {
  try {
    const res = await axios.get("/api/fetch/buyer/complaints");
    dispatch({ type: FETCH_BUYER_COMPLAINTS, payload: res.data });
  } catch (error) {
    authCheck(error);
    console.log(error.response);
  }
};

export const fetchBuyerComplaint = (complaintId, history) => async dispatch => {
  try {
    dispatch({ type: FETCH_BUYER_COMPLAINT_START });
    const res = await axios.get(`/api/fetch/buyer/complaint/${complaintId}`);
    dispatch({ type: FETCH_BUYER_COMPLAINT, payload: res.data.complaint });
    dispatch({ type: FETCH_BUYER_COMPLAINT_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_BUYER_COMPLAINT_STOP });
    console.log(error.response);
    pathCheck(error, history);
  }
};

export const fetchRejectedProducts = () => async dispatch => {
  try {
    const res = await axios.get("/api/root/admin/fetch/rejected/products");
    dispatch({ type: FETCH_REJECTED_PRODUCTS, payload: res.data });
  } catch (error) {
    authCheck(error);
    console.log(error.response);
  }
};

export const fetchLatestRejectedProducts = () => async dispatch => {
  try {
    const res = await axios.get("/api/latest/rejected/products");
    dispatch({ type: FETCH_LATEST_REJECTED_PRODUCTS, payload: res.data });
  } catch (error) {
    authCheck(error);
    console.log(error.response);
  }
};

// MUST BE ITEMS IN WISHLIST
export const fetchWishlistProducts = () => async dispatch => {
  try {
    dispatch({ type: FETCH_WISHLIST_PRODUCTS_START });
    const res = await axios.get("/api/fetch/wishlits/products");
    dispatch({ type: FETCH_WISHLIST_PRODUCTS, payload: res.data });
    dispatch({ type: FETCH_WISHLIST_PRODUCTS_STOP });
  } catch (error) {
    dispatch({ type: FETCH_WISHLIST_PRODUCTS_STOP });
    console.log(error.response);
  }
};

export const saveCartItems = cart => async dispatch => {
  try {
    await axios.post("/api/user/new/cart", {
      cart: cart.map(item => ({
        product: item._id,
        quantity: item.quantity
      }))
    });
    dispatch({ type: SAVE_CART });
    dispatch(fetchCartItems());
  } catch (error) {
    authCheck(error);
    console.log(error.response);
  }
};
export const saveWishlistItems = wishlist => async dispatch => {
  try {
    dispatch({ type: SAVE_WISHLIST_START });
    await axios.post("/api/user/new/wishlist", { wishlist });
    dispatch({ type: SAVE_WISHLIST });
    dispatch({ type: SAVE_WISHLIST_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: SAVE_WISHLIST_STOP });
    console.log(error.response);
  }
};

export const fetchCartItems = () => async dispatch => {
  try {
    dispatch({ type: FETCH_CART_ITEMS_START });
    const res = await axios.get("/api/user/fetch/cart/items");
    dispatch({ type: FETCH_CART_ITEMS, payload: res.data });
    dispatch({ type: FETCH_CART_ITEMS_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_CART_ITEMS_STOP });
    console.log(error.response);
  }
};

export const deleteCart = () => async dispatch => {
  try {
    dispatch({ type: DELETE_CART_START });
    await axios.delete("/api/delete/whole/cart");
    dispatch({ type: DELETE_CART });
    dispatch({ type: DELETE_CART_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: DELETE_CART_STOP });
    console.log(error.response);
  }
};

export const confirmDispatch = (
  orderId,
  productIds,
  history
) => async dispatch => {
  try {
    dispatch({ type: CONFIRM_DISPATCH_START });
    await axios.post("/api/confirm/seller/dispatch", { orderId, productIds });
    dispatch({ type: CONFIRM_DISPATCH });
    dispatch(fetchSellerNewOrdersCount());
    history.push("/seller-orders");
    dispatch({ type: CONFIRM_DISPATCH_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: CONFIRM_DISPATCH_STOP });
  }
};

export const confirmDelivery = (orderId, history) => async dispatch => {
  try {
    dispatch({ type: CONFIRM_DELIVERY_START });
    await axios.post("/api/confirm/admin/delivery", { orderId });
    dispatch({ type: CONFIRM_DELIVERY });
    dispatch({ type: SET_PENDING_ORDERS });
    history.push("/admin-orders");
    dispatch({ type: CONFIRM_DELIVERY_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: CONFIRM_DELIVERY_STOP });
  }
};

export const selfCollectionAddress = latLng => async (dispatch, getState) => {
  try {
    const lat = latLng.lat;
    const lng = latLng.lng;
    const details = {
      destination: [`${lat},${lng}`],
      origins: [getState().selfCollection.city]
    };
    dispatch({ type: SELF_COLLECTION_START });
    const res = await axios.post(`/api/buyer/destination`, details);
    dispatch({ type: SELF_COLLECTION_STOP });
    dispatch({ type: PAYMENT_DISTANCE, payload: res.data });
    dispatch({
      type: SELF_COLLECTION_ADDRESS,
      payload: latLng
    });
    dispatch(collectionCloseAction());
  } catch (error) {
    dispatch({ type: SELF_COLLECTION_STOP });
    authCheck(error);
    console.log(error.response);
  }
};

export const removeAddress = () => {
  return {
    type: REMOVE_ADDRESS
  };
};

export const collectionOpenAction = () => {
  return {
    type: COLLECTION_OPEN_ACTION
  };
};
export const collectionCloseAction = () => {
  return {
    type: COLLECTION_CLOSE_ACTION
  };
};
export const deliveryOpenAction = () => {
  return {
    type: DELIVERY_OPEN_ACTION
  };
};
export const deliveryCloseAction = () => {
  return {
    type: DELIVERY_CLOSE_ACTION
  };
};
export const sendReferralCode = (referralBody, reset) => async dispatch => {
  try {
    dispatch({ type: SEND_REFERRAL_CODE_START });
    await axios.post("/api/send/referral/code", referralBody);
    dispatch(reset("EarnPoints"));
    dispatch({ type: SEND_REFERRAL_CODE });
    dispatch({ type: SEND_REFERRAL_CODE_STOP });
  } catch (error) {
    authCheck(error);
    if (error.response) {
      dispatch({
        type: REFERRAL_CODE_ERROR,
        payload: error.response.data.message
      });
    }
    dispatch(reset("EarnPoints"));
    dispatch({ type: SEND_REFERRAL_CODE_STOP });
    console.log(error.response);
  }
};

export const checkReferral = (referralCode, history) => async dispatch => {
  try {
    await axios.post(`/api/seller/register/referral/${referralCode}`);
    dispatch({ type: CHECK_REFERRAL });
  } catch (error) {
    history.push("/seller/register");
  }
};

export const contactUs = (formValues, history) => async dispatch => {
  try {
    dispatch({ type: CONTACT_US_START });
    await axios.post("/api/contact/admin", formValues);
    dispatch({ type: CONTACT_US_STOP });
    history.push("/");
  } catch (error) {
    authCheck(error);
    dispatch({ type: CONTACT_US_STOP });
  }
};
export const fetchAdminInbox = optional => async dispatch => {
  try {
    dispatch({ type: FETCH_ADMIN_INBOX_START });
    if (optional) {
      const res = await axios.post("/api/fetch/admin/inbox", {
        filter: optional
      });
      dispatch({ type: FETCH_ADMIN_INBOX, payload: res.data });
      dispatch({ type: FETCH_ADMIN_INBOX_STOP });
      return;
    }
    const res = await axios.post("/api/fetch/admin/inbox");
    dispatch({ type: FETCH_ADMIN_INBOX, payload: res.data });
    dispatch({ type: FETCH_ADMIN_INBOX_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: FETCH_ADMIN_INBOX_STOP });
  }
};

export const clearReferralErrorAndSuccess = () => {
  return {
    type: CLEAR_REFERRAL_ERROR_AND_SUCCESS
  };
};

export const clearOrderDetails = () => {
  return {
    type: CLEAR_ORDER_DETAILS
  };
};

export const redeemPoints = () => async dispatch => {
  try {
    dispatch({ type: REDEEM_POINTS_START });
    await axios.post("/api/seller/redeem/points");
    dispatch({ type: REDEEM_POINTS, payload: "sucess" });
    dispatch({ type: REDEEM_POINTS_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: REDEEM_POINTS_STOP });
    dispatch({ type: REDEEM_POINTS_ERROR, payload: "Error redeeming points" });
  }
};

export const storeLatLng = latLng => {
  return {
    type: STORE_LAT_LNG,
    payload: latLng
  };
};

export const redeemCountAction = () => async dispatch => {
  try {
    const res = await axios.get("/api/fetch/admin/redeem/count");
    dispatch({ type: REDEEM_COUNT, payload: res.data });
  } catch (error) {
    authCheck(error);
  }
};

export const fetchRedeems = () => async dispatch => {
  try {
    const res = await axios.get("/api/fetch/admin/redeems");
    dispatch({ type: FETCH_REDEEMS, payload: res.data });
  } catch (error) {
    authCheck(error);
  }
};

export const payRedeem = redeemId => async dispatch => {
  try {
    dispatch({ type: PAY_REDEEM_START });
    await axios.post("/api/admin/pay/redeem", { redeemId });
    dispatch({ type: PAY_REDEEM });
    dispatch(fetchRedeems());
    dispatch(redeemCountAction());
    dispatch({ type: PAY_REDEEM_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: PAY_REDEEM_STOP });
    console.log(error.response);
  }
};
export const clearNewSellerDetails = () => {
  return {
    type: CLEAR_NEW_SELLER_DETAILS
  };
};

export const uploadHeroImage = (image, category) => async dispatch => {
  try {
    dispatch({ type: HERO_IMAGE_START });
    const uploadConfig = await axios.get("/api/admin/image/upload");
    if (uploadConfig.data.url) {
      await axios.put(uploadConfig.data.url, image, {
        headers: {
          "Content-Type": image.type
        }
      });
      if (!uploadConfig.data || (uploadConfig.data && !uploadConfig.data.key)) {
        console.log(uploadConfig);
        dispatch({
          type: UPLOAD_IMAGE_ERROR,
          payload:
            "Error uploading image, please refresh the page and try again"
        });
        dispatch({ type: HERO_IMAGE_STOP });
        return;
      }
      await axios.post("/api/admin/add/hero/image", {
        imageUrl: uploadConfig.data.key,
        category
      });
      dispatch(fetchHeroImages());
      dispatch({ type: HERO_IMAGE_STOP });
      return;
    }
    dispatch({
      type: UPLOAD_IMAGE_ERROR,
      payload: "Error uploading image, please refresh the page and try again"
    });
    dispatch({ type: HERO_IMAGE_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: HERO_IMAGE_STOP });
  }
};

export const fetchHeroImages = () => async dispatch => {
  try {
    dispatch({ type: FETCH_HERO_START });
    const res = await axios.get("/api/fetch/hero/images");
    dispatch({ type: HERO_IMAGES, payload: res.data });
    dispatch({ type: FETCH_HERO_STOP });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: FETCH_HERO_STOP });
  }
};

export const deleteHeroImage = imageUrl => async dispatch => {
  try {
    dispatch({ type: DELETE_HERO_IMAGE_START });
    await axios.post("api/admin/delete/hero/image", { imageUrl });
    dispatch(fetchHeroImages());
    dispatch({ type: DELETE_HERO_IMAGE_STOP });
  } catch (error) {
    authCheck(error);
    dispatch({ type: DELETE_HERO_IMAGE_STOP });
  }
};

export const saveOrder = history => async (dispatch, getState) => {
  try {
    dispatch({ type: SAVE_ORDER_START });
    const cart = getState().cartReducer.order.cart;
    const distanceId = getState().detailsPersist.distance._id;
    const formValues = getState().cartReducer.order.formValues;
    const email = getState().auth.user.email;
    const phoneNumber = getState().auth.user.phoneNumber;
    const firstName = getState().auth.user.firstName;
    const lastName = getState().auth.user.lastName;
    const res = await axios.post("/api/save/card/order", {
      cart,
      distanceId,
      formValues
    });
    dispatch({ type: SAVE_ORDER_STOP });
    // SAVE ORDER FIRST
    window.FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-889190263261a396bbf7c25822758bb9-X",
      tx_ref: res.data._id,
      amount: res.data.totalPrice,
      currency: "KES",
      country: "KE",
      payment_options: "card",
      customer: {
        email,
        phone_number: `0${phoneNumber}`,
        name: `${firstName} ${lastName}`
      },
      callback: async function (data) {
        // specified callback function
        try {
          dispatch({ type: UNVERIFIED_DATA, payload: data });

          const response = await axios.post("/api/verify/flutterwave/payment", {
            ...data,
            cart
          });
          dispatch({
            type: FETCH_ORDER_SUCCESS,
            payload: { ...response.data.data, ...response.data.order }
          });
          history.push("/order/success");
        } catch (error) {
          authCheck(error);
          console.log(error.response);
          dispatch({
            type: FETCH_ORDER_SUCCESS,
            payload: "error validating purchase"
          });
          history.push("/card/error");
        }
      },
      onclose: async function () {
        const orderSuccess = getState().cartReducer.orderSuccess;
        const unverifiedData = getState().cartReducer.unverifiedData;
        if (!orderSuccess && unverifiedData) {
          try {
            const response = await axios.post(
              "/api/verify/flutterwave/payment",
              {
                ...unverifiedData,
                cart
              }
            );
            dispatch({
              type: FETCH_ORDER_SUCCESS,
              payload: { ...response.data.data, ...response.data.order }
            });
            return history.push("/order/success");
          } catch (error) {
            dispatch({
              type: FETCH_ORDER_SUCCESS,
              payload: "error validating purchase"
            });
            return history.push("/card/error");
          }
        }
        if (!orderSuccess && !unverifiedData) {
          dispatch({
            type: FETCH_ORDER_SUCCESS,
            payload: "error validating purchase"
          });
          return history.push("/card/error");
        }
      },
      customizations: {
        title: "Way4Biz",
        description: `Payment for items in cart for ${firstName} ${lastName}`,
        logo:
          "https://e-commerce-gig.s3.eu-west-2.amazonaws.com/5efd9987b53dfa39cc27bae9/fav.jpg"
      }
    });
  } catch (error) {
    authCheck(error);
    dispatch({ type: SAVE_ORDER_STOP });
  }
};

const riderRegisterStart = () => {
  return {
    type: RIDER_REGISTER_START
  };
};

const riderRegistered = () => {
  return {
    type: RIDER_REGISTERED
  };
};

// const riderRegisterStop = () => {
//   return {
//     type: RIDER_REGISTER_STOP,
//   };
// };

const riderRegisterError = error => {
  return {
    type: RIDER_REGISTER_ERROR,
    data: error
  };
};

export const riderRegister = (data, history) => async dispatch => {
  dispatch(riderRegisterStart());
  try {
    const res = await axios.post("/api/driver/register", data);
    console.log(res.data);
    history.push("/admin-dashboard");
    dispatch(riderRegistered());
  } catch (error) {
    console.log(error.response);
    authCheck(error);
    dispatch(riderRegisterError(error.response.message));
  }
};

const riderLoginLoading = () => {
  return {
    type: RIDER_LOGIN_START
  };
};

const riderLoggedIn = () => {
  return {
    type: RIDER_LOGGED_IN
  };
};

const riderLoginError = error => {
  return {
    type: RIDER_LOGIN_ERROR,
    data: error
  };
};

export const riderLogIn = (data, history) => async dispatch => {
  try {
    dispatch(riderLoginLoading());
    await axios.post("/api/driver/login", data);
    await dispatch(fetchUser());
    history.push("/riders");
    dispatch(riderLoggedIn());
  } catch (error) {
    console.log(error);
    if (error.response) {
      dispatch(riderLoginError(error.response.data.message));
    }
  }
};

export const proceedToCheckout = (history, location) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: P_TO_CHECKOUT_START });
    let cart = getState().cartReducer.cart;
    cart = cart.map(item => ({ _id: item._id, quantity: item.quantity }));
    await axios.post("/api/proceed/to/checkout", { cart });

    history.push(location);

    dispatch({ type: P_TO_CHECKOUT_STOP });
  } catch (error) {
    console.log(error.response);
    history.push("/cart/redirect");
    dispatch({ type: P_TO_CHECKOUT_STOP });
  }
};

export const adminInboxCount = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/admin/inbox/count");
    dispatch({ type: ADMIN_INBOX_COUNT, payload: data });
  } catch (error) {
    console.log(error.response);
  }
};

export const markAsRead = (id, history) => async dispatch => {
  try {
    await axios.post("/api/mark/as/read", { _id: id });
    await dispatch(fetchAdminInbox());
    history.push("/admin-inbox");
  } catch (error) {
    authCheck(error);
    console.log(error.response);
  }
};

export const fetchItemsInCart = history => async (dispatch, getState) => {
  try {
    let cart = getState().cartReducer.cart;
    if (cart.length !== 0) {
      cart = cart.map(item => ({ _id: item._id, quantity: item.quantity }));
    }
    const res = await axios.post("/api/fetch/items/in/cart", { cart });
    let test =
      res.data.length !== 0 &&
      res.data.map(item => {
        const cartItem = cart.find(
          it => it._id.toString() === item._id.toString()
        );
        if (cartItem.quantity > item.stockQuantity) {
          return item;
        }
        return undefined;
      });
    test = test.filter(it => it !== undefined);
    if (!test || (test && test.length === 0)) {
      return history.goBack();
    }
    dispatch({ type: FETCH_ITEMS_IN_CART, payload: test });
  } catch (error) {
    console.log(error.response);
    console.log(error);
  }
};

export const emptyItemsInCart = () => {
  return {
    type: EMPTY_ITEMS_IN_CART
  };
};

export const riderChangePassword = (formValues, history) => async dispatch => {
  try {
    dispatch({ type: RIDER_CHANGE_PASSWORD_START });
    await axios.post("/api/change/password", formValues);
    history.push("/riders");
    dispatch({ type: RIDER_CHANGE_PASSWORD_STOP, payload: null });
  } catch (error) {
    authCheck(error);
    if (error.response) {
      dispatch({
        type: RIDER_CHANGE_PASSWORD_STOP,
        payload: error.response.data.message
      });
    }
    console.log(error.response);
  }
};

export const requestService = (formValues, history) => async dispatch => {
  try {
    dispatch({ type: REQUEST_SERVICE_START });
    const {
      firstName,
      lastName,
      phoneNumber,
      town,
      city,
      address
    } = formValues;
    await dispatch(
      editUser({ firstName, lastName, phoneNumber, town, city, address })
    );
    const res = await axios.post("/api/request/service", formValues);
    if (res.data.delivery) {
      history.push(`/logistics/confirm/${res.data.delivery._id}`);
      dispatch({ type: REQUEST_SERVICE_STOP, payload: null });
      return;
    }
    history.push("/logistics-404");
    dispatch({ type: REQUEST_SERVICE_STOP, payload: {} });
  } catch (error) {
    authCheck(error);
    dispatch({ type: REQUEST_SERVICE_STOP, payload: {} });
    history.push("/logistics-404");
    console.log(error.response);
  }
};

export const fetchDelivery = (deliveryId, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/fetch/delivery/${deliveryId}`);
    dispatch({ type: FETCH_DELIVERY, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_DELIVERY, payload: "" });
    authCheck(error);
    pathCheck(error, history);
  }
};

export const fetchClients = () => async dispatch => {
  try {
    const res = await axios.get("/api/driver/clients");
    dispatch({ type: FETCH_CLIENTS, payload: res.data });
  } catch (error) {
    authCheck(error);
  }
};

export const pToCheckoutClear = () => {
  return {
    type: P_TO_CHECKOUT_CLEAR
  };
};

export const fetchAllDrivers = () => async dispatch => {
  try {
    const res = await axios.get("/api/fetch/all/drivers");
    dispatch({ type: FETCH_ALL_DRIVERS, payload: res.data });
  } catch (error) {
    authCheck(error);
    console.log(error.response);
  }
};

export const fetchDriverDetails = (driverId, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/fetch/driver/details/${driverId}`);
    dispatch({ type: FETCH_DRIVER_DETAILS, payload: res.data });
  } catch (error) {
    authCheck(error);
    pathCheck(error, history);
    console.log(error.response);
  }
};

export const emptyDriverDetails = () => {
  return {
    type: EMPTY_DRIVER_DETAILS
  };
};

export const confirmLogisticsDelivery = deliveryId => async dispatch => {
  try {
    dispatch({ type: CONFIRM_LOGISTICS_START });
    await axios.post("/api/confirm/delivery", { deliveryId });

    await dispatch(fetchDelivery(deliveryId));
    dispatch({ type: CONFIRM_LOGISTICS_STOP });
  } catch (error) {
    dispatch({ type: CONFIRM_LOGISTICS_STOP });
    authCheck(error);
    console.log(error.response);
  }
};
export const emptyFetchedDelivery = () => {
  return {
    type: EMPTY_FETCHED_DELIVERY
  };
};

export const fetchClientDeliveries = () => async dispatch => {
  try {
    const res = await axios.get("/api/fetch/client/deliveries");
    dispatch({ type: FETCH_CLIENT_DELIVERIES, payload: res.data });
  } catch (error) {
    authCheck(error);
    console.log(error.response);
  }
};

export const fetchSingleDelivery = (deliveryId, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/fetch/single/delivery/${deliveryId}`);
    dispatch({ type: FETCH_SINGLE_DELIVERY, payload: res.data });
  } catch (error) {
    authCheck(error);
    pathCheck(error, history);
    console.log(error.response);
  }
};

export const clearSingleCategory = () => {
  return {
    type: CLEAR_SINGLE_CATEGORY
  };
};

export const setUrl = url => {
  return {
    type: SET_URL,
    payload: url
  };
};

export const clearUrl = () => {
  return {
    type: CLEAR_URL
  };
};
