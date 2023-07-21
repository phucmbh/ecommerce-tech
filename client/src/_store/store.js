import { configureStore } from '@reduxjs/toolkit';

import { categoriesReducer } from './categories.slice';
import { productsReducer } from './products.slice';

export * from './categories.slice';
export * from './products.slice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
  },
});


