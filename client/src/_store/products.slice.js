import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apis from '../apis';

// create slice

const name = 'products';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const productActions = { ...slice.actions, ...extraActions };
export const productsReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    products: null,
    isLoading: false,
  };
}

function createExtraActions() {
  return {
    getProducts: getProducts(),
  };

  function getProducts() {
    return createAsyncThunk(`${name}/getProducts`, async () => {
      return await apis.apiGetProducts();
    });
  }
}

function createExtraReducers() {
  return (builder) => {
    getproducts();
    function getproducts() {
      var { pending, fulfilled, rejected } = extraActions.getProducts;

      builder.addCase(pending, (state) => {
        state.isLoading = true;
      });

      builder.addCase(fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload?.products;
      });

      builder.addCase(rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      });
    }
  };
}
