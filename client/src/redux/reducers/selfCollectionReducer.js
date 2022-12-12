import {
  SELF_COLLECTION_ADDRESS,
  SELF_COLLECTION_START,
  SELF_COLLECTION_STOP,
  REMOVE_ADDRESS,
  COLLECTION_OPEN_ACTION,
  COLLECTION_CLOSE_ACTION
} from "../actions/types";

const INITIAL_STATE = {
  address: {},
  city: "Ngong Road Apartments, Ngong Road, Nairobi, Kenya",
  selfCollectionLoading: false,
  collection: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELF_COLLECTION_ADDRESS:
      return { ...state, address: action.payload };
    case SELF_COLLECTION_START:
      return { ...state, selfCollectionLoading: true };
    case SELF_COLLECTION_STOP:
      return { ...state, selfCollectionLoading: false };
    case REMOVE_ADDRESS:
      return { ...state, address: {} };
    case COLLECTION_OPEN_ACTION:
      return { ...state, collection: true };
    case COLLECTION_CLOSE_ACTION:
      return { ...state, collection: false };
    default:
      return state;
  }
};
