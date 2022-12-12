import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import productReducer from "./productReducer";
import sellerReducer from "./sellerReducer";
import cartReducer from "./cartReducer";
import OrderDetailsPersist from "./OrderDetailsPersist";
import filterReducer from "./filterReducer";
import imageReducer from "./imageReducer";
import sellerDetailsReducer from "./sellerDetailsReducer";
import searchReducer from "./searchReducer";
import selfCollectionReducer from "./selfCollectionReducer";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";
import ridersReducer from "./ridersReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "cartReducer",
    "detailsPersist",
    "filter",
    "image",
    "sellerDetails",
  ],
};

const reducers = combineReducers({
  form: formReducer,
  auth: authReducer,
  product: productReducer,
  seller: sellerReducer,
  cartReducer: cartReducer,
  detailsPersist: OrderDetailsPersist,
  filter: filterReducer,
  image: imageReducer,
  sellerDetails: sellerDetailsReducer,
  search: searchReducer,
  selfCollection: selfCollectionReducer,
  admin: adminReducer,
  user: userReducer,
  riders: ridersReducer,
});
export default persistReducer(persistConfig, reducers);
