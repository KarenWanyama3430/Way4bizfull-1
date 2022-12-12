import {
  FETCH_ADMIN_INBOX,
  FETCH_ADMIN_INBOX_START,
  FETCH_ADMIN_INBOX_STOP,
  FETCH_ADMIN_ORDERS,
  FETCH_ALL_ORDERS,
  FETCH_MORE_ALL_ORDERS,
  FETCH_ORDER_BY_ID,
  FETCH_ORDER_BY_ID_ERROR,
  HAS_MORE_ORDERS_FALSE,
  ADMIN_RADIO,
  SET_PENDING_ORDERS,
  FETCH_ADMIN_ORDER,
  FETCH_ADMIN_ORDERS_START,
  FETCH_ADMIN_ORDERS_STOP,
  FETCH_ADMIN_ORDER_START,
  FETCH_ADMIN_ORDER_STOP,
  FETCH_ORDER_BY_ID_START,
  FETCH_ORDER_BY_ID_STOP,
  CONFIRM_DELIVERY_START,
  CONFIRM_DELIVERY_STOP,
  REDEEM_COUNT,
  FETCH_REDEEMS,
  PAY_REDEEM_START,
  PAY_REDEEM_STOP,
  GET_STOCK,
  GET_STOCK_START,
  GET_STOCK_STOP,
  FETCH_ADMIN_PENDING_ORDERS,
  COUNT_COMPLAINTS,
  FETCH_LATEST_REJECTED_PRODUCTS,
  FETCH_UNDER_REVIEW,
  FETCH_WEEKLY_SALES,
  FETCH_NEW_SELLERS,
  DELETE_HERO_IMAGE_START,
  DELETE_HERO_IMAGE_STOP,
  ADMIN_INBOX_COUNT,
  FETCH_ALL_DRIVERS,
  FETCH_DRIVER_DETAILS,
  EMPTY_DRIVER_DETAILS
} from "../actions/types";

const INITIAL_STATE = {
  inbox: null,
  inboxLoading: false,
  adminOrders: null,
  allAdminOrders: null,
  orderCount: null,
  ordersToSkip: 0,
  radioLoading: false,
  orderError: null,
  hasMoreOrders: true,
  ordersDate: null,
  adminOrdersLoading: false,
  adminOrderLoading: false,
  adminOrder: null,
  deliveryLoading: false,
  redeemCount: null,
  redeems: null,
  payRedeemLoading: false,
  stockLoading: false,
  adminPendingOrders: null,
  complaintsCount: null,
  newSellers: null,
  latestRejectedProducts: null,
  underReview: null,
  weeklySales: null,
  stock: [],
  deleteHeroImageLoading: false,
  inboxCount: null,
  addingDriver: false,
  drivers: null,
  driverDetails: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ADMIN_INBOX:
      return { ...state, inbox: action.payload };
    case FETCH_ADMIN_INBOX_START:
      return { ...state, inboxLoading: true };
    case FETCH_ADMIN_INBOX_STOP:
      return { ...state, inboxLoading: false };
    case FETCH_ADMIN_ORDERS:
      return { ...state, adminOrders: action.payload };
    case FETCH_ALL_ORDERS:
      return {
        ...state,
        allAdminOrders: action.payload.orders,
        orderCount: action.payload.ordersCount,
        ordersToSkip: state.ordersToSkip + 20,
        radioLoading: false,
        orderError: null
      };
    case FETCH_MORE_ALL_ORDERS:
      const orderIds = new Set(state.allAdminOrders.map(order => order._id));
      return {
        ...state,
        allAdminOrders: [
          ...state.allAdminOrders,
          ...action.payload.orders.filter(order => !orderIds.has(order._id))
        ],
        ordersToSkip: state.ordersToSkip + 20,
        orderError: null
      };
    case FETCH_ORDER_BY_ID:
      return {
        ...state,
        allAdminOrders: [action.payload],
        hasMoreOrders: false,
        ordersToSkip: 2,
        orderCount: 1,
        orderError: null
      };
    case FETCH_ORDER_BY_ID_ERROR:
      return {
        ...state,
        orderError: "No Order with that ID",
        hasMoreOrders: false,
        ordersToSkip: 2,
        orderCount: 1,
        allAdminOrders: []
      };
    case HAS_MORE_ORDERS_FALSE:
      return { ...state, hasMoreOrders: false };
    case ADMIN_RADIO:
      return {
        ...state,
        ordersDate: action.payload.event.value,
        radioLoading: true
      };
    case SET_PENDING_ORDERS:
      return { ...state, ordersDate: "pendingOrders" };
    case FETCH_ADMIN_ORDER:
      return { ...state, adminOrder: action.payload, orderError: null };
    case FETCH_ADMIN_ORDERS_START:
      return { ...state, adminOrdersLoading: true };
    case FETCH_ADMIN_ORDERS_STOP:
      return { ...state, adminOrdersLoading: false };
    case FETCH_ADMIN_ORDER_START:
      return { ...state, adminOrderLoading: true };
    case FETCH_ADMIN_ORDER_STOP:
      return { ...state, adminOrderLoading: false };
    case FETCH_ORDER_BY_ID_START:
      return { ...state, adminOrderLoading: true };
    case FETCH_ORDER_BY_ID_STOP:
      return { ...state, adminOrderLoading: false };
    case CONFIRM_DELIVERY_START:
      return { ...state, deliveryLoading: true };
    case CONFIRM_DELIVERY_STOP:
      return { ...state, deliveryLoading: false };
    case REDEEM_COUNT:
      return { ...state, redeemCount: action.payload };
    case FETCH_REDEEMS:
      return { ...state, redeems: action.payload };
    case PAY_REDEEM_START:
      return { ...state, payRedeemLoading: true };
    case PAY_REDEEM_STOP:
      return { ...state, payRedeemLoading: false };
    case GET_STOCK_START:
      return { ...state, stockLoading: true };
    case GET_STOCK_STOP:
      return { ...state, stockLoading: false };
    case GET_STOCK:
      return {
        ...state,
        stock: [
          { label: "Stock In", value: action.payload.stockIn },
          { label: "Stock Out", value: action.payload.stockOut }
        ]
      };
    case FETCH_ADMIN_PENDING_ORDERS:
      return { ...state, adminPendingOrders: action.payload };
    case COUNT_COMPLAINTS:
      return { ...state, complaintsCount: action.payload };
    case FETCH_LATEST_REJECTED_PRODUCTS:
      return { ...state, latestRejectedProducts: action.payload };
    case FETCH_UNDER_REVIEW:
      return { ...state, underReview: action.payload };
    case FETCH_WEEKLY_SALES:
      return { ...state, weeklySales: action.payload };
    case FETCH_NEW_SELLERS:
      return { ...state, newSellers: action.payload };
    case DELETE_HERO_IMAGE_START:
      return { ...state, deleteHeroImageLoading: true };
    case DELETE_HERO_IMAGE_STOP:
      return { ...state, deleteHeroImageLoading: false };
    case ADMIN_INBOX_COUNT:
      return { ...state, inboxCount: action.payload };
    case FETCH_ALL_DRIVERS:
      return { ...state, drivers: action.payload };
    case FETCH_DRIVER_DETAILS:
      return { ...state, driverDetails: action.payload };
    case EMPTY_DRIVER_DETAILS:
      return { ...state, driverDetails: null };
    default:
      return state;
  }
};
