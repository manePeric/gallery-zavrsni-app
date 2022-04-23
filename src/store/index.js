import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import activeUserReducer from "./auth/slice";
import galleriesReducer from "./galleries/slice";
import sagas from "./rootSaga";

const reducers = {
  activeUser: activeUserReducer,
  galleries: galleriesReducer,
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: combineReducers(reducers),
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
    }),
    sagaMiddleware,
  ],
});

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;
