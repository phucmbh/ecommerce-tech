import { configureStore } from '@reduxjs/toolkit';

import { categoriesReducer } from './categories.slice';

export * from './categories.slice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});
