import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer, productsReducer, usersReducer } from './';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { appReducer } from './app.slice';

const userConfig = {
  key: 'user',
  storage,
  whitelist: ['isLoggedIn', 'token', 'user'],
};

export const store = configureStore({
  reducer: {
    users: persistReducer(userConfig, usersReducer),
    categories: categoriesReducer,
    products: productsReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
