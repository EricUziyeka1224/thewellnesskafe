import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../Reducer'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../Saga'
import { persistStore, persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage'

const logger = createLogger();
const saga = createSagaMiddleware();
// const persistConfig = {
//   key: 'root',
//   storage
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  rootReducer,
  applyMiddleware(saga, logger)
);

saga.run(rootSaga);

//export const persistor = persistStore(store)