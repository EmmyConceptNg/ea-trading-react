import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Import storage from redux-persist
import userReducer from "../reducers/userReducer";


const rootReducer = combineReducers({
  user: userReducer,
});

export default (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return rootReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage, // Use localStorage or sessionStorage
  // Other configuration options...
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

// Create a persisted version of the store
const persistor = persistStore(store);

// Export an object with store and persistor properties
export { store, persistor };
