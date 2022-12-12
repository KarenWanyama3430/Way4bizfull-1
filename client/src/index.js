import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reducers from "./redux/reducers";
import thunk from "redux-thunk";
import ScrollToTop from "./ScrollToTop";
import ScreenLoader from "./components/Pages/ScreenLoader";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let arg;
if (process.env.NODE_ENV === "development") {
  arg = composeEnhancers(applyMiddleware(thunk));
} else {
  arg = applyMiddleware(thunk);
}

const store = createStore(reducers, arg);

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<ScreenLoader />}>
      <BrowserRouter>
        <ScrollToTop>
          <PersistGate persistor={persistStore(store)}>
            <App />
          </PersistGate>
        </ScrollToTop>
      </BrowserRouter>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
