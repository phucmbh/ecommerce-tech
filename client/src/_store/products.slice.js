import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apis from '../apis';

// create slice

const name = 'products';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const productActions = { ...slice.actions, ...extraActions };
export const productsReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    products: null,
    isLoading: false,
    modalRating: false,
    showFilter: null,
    currentPage: 1,
  };
}

function createReducers() {
  return {
    showModalRating: (state, action) => {
      state.modalRating = action.payload.modalRating;
    },
    setShowFilter: (state, action) => {
      state.showFilter = action.payload.showFilter;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage;
    },
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
