import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import songReducer from "./songs";
import commentReducer from "./comments";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({
  session: sessionReducer,
  songs: songReducer,
  comments: commentReducer
})

const persistConfig = {
  key: "root",
  storage,
};
 
const persistedReducer = persistReducer(persistConfig, rootReducer);
let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  let store = createStore(persistedReducer, preloadedState, enhancer);
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;