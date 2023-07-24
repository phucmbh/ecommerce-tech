import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer, productsReducer, usersReducer } from './';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const commonConfig = {
  key: 'shop/user',
  storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ['isLoggedIn', 'token'],
};

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    users: persistReducer(userConfig, usersReducer),
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
