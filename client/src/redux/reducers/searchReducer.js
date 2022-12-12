import {
  SEARCH_PRODUCTS,
  MORE_SEARCH_PRODUCTS,
  SEARCH_PRODUCTS_START,
  SEARCH_PRODUCTS_STOP,
  MORE_SEARCH_PRODUCTS_START,
  HAS_MORE_SEARCH_FALSE
} from "../actions/types";

const INITIAL_STATE = {
  searchProducts: [],
  hasMoreSearchProducts: false,
  searchItemsToSkip: 0,
  searchProductCount: 0,
  searchProductsLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_PRODUCTS:
      return {
        ...state,
        searchProducts: action.payload.products,
        searchProductCount: action.payload.productCount,
        searchItemsToSkip: state.searchItemsToSkip + 6
      };
    case MORE_SEARCH_PRODUCTS:
      const prodIds = new Set(state.searchProducts.map(pro => pro._id));
      return {
        ...state,
        searchProducts: [
          ...state.searchProducts,
          ...action.payload.products.filter(prod => !prodIds.has(prod._id))
        ],
        searchItemsToSkip: state.searchProducts.length
      };
    case SEARCH_PRODUCTS_START:
      return { ...state, searchProductsLoading: true };
    case SEARCH_PRODUCTS_STOP:
      return { ...state, searchProductsLoading: false };
    case MORE_SEARCH_PRODUCTS_START:
      return { ...state, hasMoreSearchProducts: true };
    // case MORE_SEARCH_PRODUCTS_STOP:
    //   return { ...state, hasMoreSearchProducts: false };
    case HAS_MORE_SEARCH_FALSE:
      return { ...state, hasMoreSearchProducts: false };
    default:
      return state;
  }
};
