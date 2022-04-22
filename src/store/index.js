import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import activeUserReducer from "./Auth/slice";
import sagas from "./rootSaga";

const reducers = {
  activeUser: activeUserReducer,
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
