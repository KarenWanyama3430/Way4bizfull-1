import {
  FETCH_PRODUCTS_SEARCH,
  FETCH_PRODUCTS_FAILED,
  FETCH_PRODUCTS,
  FETCH_CATEGORIES,
  SINGLE_CATEGORY,
  FETCH_ALL_CATEGORIES,
  FETCH_BUYER_ORDERS,
  FETCH_BUYER_ORDER_DETAILS,
  FETCH_MORE_PRODUCTS,
  HAS_MORE_FALSE,
  MORE_SINGLE_CATEGORY_PRODUCTS,
  HAS_MORE_CATEGORY_FALSE,
  FETCH_SINGLE_PRODUCT,
  FETCH_RELATED_PRODUCTS,
  FETCH_PENDING_REVIEWS,
  SINGLE_PRODUCT_START,
  SINGLE_PRODUCT_STOP,
  PRODUCT_REVIEWS,
  FILTERED_PRODUCTS_START,
  FILTERED_PRODUCTS_STOP,
  FILTERED_PRODUCTS,
  FETCH_SELLER_REVIEWS,
  FETCH_SELLER_REVIEWS_START,
  FETCH_SELLER_REVIEWS_STOP,
  STORE_DESCRIPTION,
  REDIRECT_ON_FAIL_START,
  REDIRECT_ON_FAIL_STOP,
  STORE_IMAGE_START,
  STORE_IMAGE_STOP,
  FETCH_ALL_ADMIN_CATEGORIES,
  FETCH_SINGLE_CATEGORY,
  FETCH_SELLER_NEW_ORDERS_COUNT,
  FETCH_REVIEW_PRODUCT,
  ACCEPT_PRODUCT_START,
  ACCEPT_PRODUCT_STOP,
  REJECT_PRODUCT_START,
  REJECT_PRODUCT_STOP,
  FETCH_UNDER_REVIEW_START,
  FETCH_UNDER_REVIEW_STOP,
  REJECT_MESSAGE_START,
  REJECT_MESSAGE_STOP,
  FETCH_REJECTS,
  FETCH_STORE_PRODUCTS,
  NEW_COMPLAINT_START,
  NEW_COMPLAINT_STOP,
  FETCH_ALL_COMPLAINTS,
  FETCH_COMPLAINT,
  FETCH_COMPLAINT_START,
  FETCH_COMPLAINT_STOP,
  FETCH_BUYER_COMPLAINTS,
  FETCH_BUYER_COMPLAINT,
  FETCH_BUYER_COMPLAINT_START,
  FETCH_BUYER_COMPLAINT_STOP,
  FETCH_REJECTED_PRODUCTS,
  FETCH_SUB_CATEGORIES,
  EMPTY_SUB_CATEGORIES,
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_STOP,
  CONFIRM_DISPATCH_START,
  CONFIRM_DISPATCH_STOP,
  EDIT_CATEGORY_START,
  EDIT_CATEGORY_STOP,
  ADD_NEW_CATEGORY_START,
  ADD_NEW_CATEGORY_STOP,
  ADD_PRODUCT_ERROR,
  HERO_IMAGES,
  HERO_IMAGE_START,
  HERO_IMAGE_STOP,
  SAVE_ORDER_STOP,
  SAVE_ORDER_START
} from "../actions/types";
const INITIAL_STATE = {
  searchedProducts: [],
  productsError: null,
  products: [],
  categories: null,
  subCategories: null,
  singleCategoryProducts: [],
  buyerOrders: [],
  buyerOrderDetails: null,
  productCount: null,
  hasMore: true,
  hasMoreCategories: true,
  categoryProductCount: null,
  itemsToSkip: 0,
  product: null,
  relatedProducts: [],
  pendingReviewProducts: [],
  singleProductLoad: false,
  productReviews: [],
  filteredProductsLoading: false,
  hasMoreCategoryProducts: false,
  sellerReviews: [],
  sellerReviewsLoading: false,
  description: "",
  redirectOnFailLoading: false,
  storeImageLoading: false,
  payments: null,
  adminCategories: null,
  singleCategory: null,
  dashboard: null,
  reviewProduct: null,
  acceptProductLoading: false,
  rejectProductLoading: false,
  fetchReviewProductLoading: false,
  rejectReasonLoading: false,
  sellerRejects: null,
  storeProducts: null,
  complaintLoading: false,
  complaints: null,
  complaint: null,
  fetchComplaintLoading: false,
  buyerComplaint: null,
  buyerComplaints: null,
  buyerComplaintLoading: false,
  rejectedProducts: null,
  fetchProductsLoading: false,
  dispatchLoading: false,
  editCategoryLoading: false,
  addCategoryLoading: false,
  addProductError: null,
  heroImages: null,
  heroImageLoading: false,
  saveOrderLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SEARCH:
      return { ...state, searchedProducts: action.payload };
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        productCount: action.payload.productCount
      };
    case FETCH_MORE_PRODUCTS:
      const productIds = new Set(state.products.map(p => p._id));
      return {
        ...state,
        products: [
          ...state.products,
          ...action.payload.products.filter(prod => !productIds.has(prod._id))
        ]
      };

    case HAS_MORE_FALSE:
      return { ...state, hasMore: false };
    case HAS_MORE_CATEGORY_FALSE:
      return { ...state, hasMoreCategories: false };
    case FETCH_PRODUCTS_FAILED:
      return { ...state, productsError: "Fetching products failed" };
    case FETCH_CATEGORIES:
      return { ...state, categories: action.payload };

    case SINGLE_CATEGORY:
      return {
        ...state,
        singleCategoryProducts: action.payload.products,
        categoryProductCount: action.payload.productCount,
        itemsToSkip: state.itemsToSkip + 20
      };
    case MORE_SINGLE_CATEGORY_PRODUCTS:
      const prodIds = new Set(state.singleCategoryProducts.map(pro => pro._id));
      return {
        ...state,
        singleCategoryProducts: [
          ...state.singleCategoryProducts,
          ...action.payload.products.filter(prod => !prodIds.has(prod._id))
        ],
        itemsToSkip: state.itemsToSkip + 20
      };

    case FETCH_ALL_CATEGORIES:
      return { ...state, categories: action.payload };
    case FETCH_BUYER_ORDERS:
      return { ...state, buyerOrders: action.payload };
    case FETCH_BUYER_ORDER_DETAILS:
      return { ...state, buyerOrderDetails: action.payload };
    case FETCH_SINGLE_PRODUCT:
      return { ...state, product: action.payload };
    case FETCH_RELATED_PRODUCTS:
      return {
        ...state,
        relatedProducts: action.payload.filter(
          item => item._id !== state.product._id
        )
      };
    case FETCH_PENDING_REVIEWS:
      return { ...state, pendingReviewProducts: action.payload };
    case SINGLE_PRODUCT_START:
      return { ...state, singleProductLoad: true };
    case SINGLE_PRODUCT_STOP:
      return { ...state, singleProductLoad: false };
    case PRODUCT_REVIEWS:
      return { ...state, productReviews: action.payload };
    case FILTERED_PRODUCTS:
      return { ...state, singleCategoryProducts: action.payload };
    case FILTERED_PRODUCTS_START:
      return {
        ...state,
        filteredProductsLoading: true,
        hasMoreCategoryProducts: true
      };
    case FILTERED_PRODUCTS_STOP:
      return {
        ...state,
        filteredProductsLoading: false,
        hasMoreCategoryProducts: false
      };
    case FETCH_SELLER_REVIEWS:
      return { ...state, sellerReviews: action.payload };
    case FETCH_SELLER_REVIEWS_START:
      return { ...state, sellerReviewsLoading: true };
    case FETCH_SELLER_REVIEWS_STOP:
      return { ...state, sellerReviewsLoading: false };
    case STORE_DESCRIPTION:
      return { ...state, description: action.payload };
    case REDIRECT_ON_FAIL_START:
      return { ...state, redirectOnFailLoading: true };
    case REDIRECT_ON_FAIL_STOP:
      return { ...state, redirectOnFailLoading: false };
    case STORE_IMAGE_START:
      return { ...state, storeImageLoading: true };
    case STORE_IMAGE_STOP:
      return { ...state, storeImageLoading: false };
    case FETCH_ALL_ADMIN_CATEGORIES:
      return { ...state, adminCategories: action.payload };
    case FETCH_SINGLE_CATEGORY:
      return { ...state, singleCategory: action.payload };
    case FETCH_SELLER_NEW_ORDERS_COUNT:
      return { ...state, dashboard: action.payload };
    case FETCH_REVIEW_PRODUCT:
      return { ...state, reviewProduct: action.payload };
    case ACCEPT_PRODUCT_START:
      return { ...state, acceptProductLoading: true };
    case ACCEPT_PRODUCT_STOP:
      return { ...state, acceptProductLoading: false };
    case REJECT_PRODUCT_START:
      return { ...state, rejectProductLoading: true };
    case REJECT_PRODUCT_STOP:
      return { ...state, rejectProductLoading: false };
    case FETCH_UNDER_REVIEW_START:
      return { ...state, fetchReviewProductLoading: true };
    case FETCH_UNDER_REVIEW_STOP:
      return { ...state, fetchReviewProductLoading: false };
    case REJECT_MESSAGE_START:
      return { ...state, rejectReasonLoading: true };
    case REJECT_MESSAGE_STOP:
      return { ...state, rejectReasonLoading: false };
    case FETCH_REJECTS:
      return { ...state, sellerRejects: action.payload };
    case FETCH_STORE_PRODUCTS:
      return { ...state, storeProducts: action.payload };
    case NEW_COMPLAINT_START:
      return { ...state, complaintLoading: true };
    case NEW_COMPLAINT_STOP:
      return { ...state, complaintLoading: false };
    case FETCH_ALL_COMPLAINTS:
      return { ...state, complaints: action.payload };
    case FETCH_COMPLAINT:
      return { ...state, complaint: action.payload };
    case FETCH_COMPLAINT_START:
      return { ...state, complaintLoading: true };
    case FETCH_COMPLAINT_STOP:
      return { ...state, complaintLoading: false };
    case FETCH_BUYER_COMPLAINTS:
      return { ...state, buyerComplaints: action.payload };
    case FETCH_BUYER_COMPLAINT:
      return { ...state, buyerComplaint: action.payload };
    case FETCH_BUYER_COMPLAINT_START:
      return { ...state, buyerComplaintLoading: true };
    case FETCH_BUYER_COMPLAINT_STOP:
      return { ...state, buyerComplaintLoading: false };
    case FETCH_REJECTED_PRODUCTS:
      return { ...state, rejectedProducts: action.payload };
    case FETCH_SUB_CATEGORIES:
      return { ...state, subCategories: action.payload };
    case EMPTY_SUB_CATEGORIES:
      return { ...state, subCategories: null };
    case FETCH_PRODUCTS_START:
      return { ...state, fetchProductsLoading: true };
    case FETCH_PRODUCTS_STOP:
      return { ...state, fetchProductsLoading: false };
    case CONFIRM_DISPATCH_START:
      return { ...state, dispatchLoading: true };
    case CONFIRM_DISPATCH_STOP:
      return { ...state, dispatchLoading: false };
    case EDIT_CATEGORY_START:
      return { ...state, editCategoryLoading: true };
    case EDIT_CATEGORY_STOP:
      return { ...state, editCategoryLoading: false };
    case ADD_NEW_CATEGORY_START:
      return { ...state, addCategoryLoading: true };
    case ADD_NEW_CATEGORY_STOP:
      return { ...state, addCategoryLoading: false };
    case ADD_PRODUCT_ERROR:
      return { ...state, addProductError: action.payload };
    case HERO_IMAGES:
      return { ...state, heroImages: action.payload };
    case HERO_IMAGE_START:
      return { ...state, heroImageLoading: true };
    case HERO_IMAGE_STOP:
      return { ...state, heroImageLoading: false };
    case SAVE_ORDER_START:
      return { ...state, saveOrderLoading: true };
    case SAVE_ORDER_STOP:
      return { ...state, saveOrderLoading: false };
    default:
      return state;
  }
};
