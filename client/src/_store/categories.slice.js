import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apis from '../apis';

// create slice

const name = 'categories';
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const categoryActions = { ...slice.actions, ...extraActions };
export const categoriesReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    categories: null,
    isLoading: false,
  };
}

function createExtraActions() {
  return {
    getCategories: getCategories(),
  };

  function getCategories() {
    return createAsyncThunk(`${name}/getCategories`, async () => {
      return await apis.apiGetCategories();
    });
  }
}

function createExtraReducers() {
  return (builder) => {
    getCategories();
    function getCategories() {
      var { pending, fulfilled, rejected } = extraActions.getCategories;

      builder.addCase(pending, (state) => {
        state.isLoading = true;
      });

      builder.addCase(fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload?.allCategories;
      });

      builder.addCase(rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload?.message;
      });
    }
  };
}
