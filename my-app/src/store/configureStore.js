import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// import { Logged } from "../reducers/Logged";
import rootReducer from "../reducers/rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configure } from "@testing-library/react";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = applyMiddleware(thunk);

// export default { persistor, store };

export default () => {
  //   const store = createStore(rootReducer);
  // const store = createStore(rootReducer);
  // const store = configure(persistedReducer, middleware);
  const store = createStore(persistedReducer, middleware);

  return store;
};
