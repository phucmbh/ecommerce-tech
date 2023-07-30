import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apis from '../apis';

// create slice

const name = 'app';
const initialState = createInitialState();
const extraActions = createExtraActions();
const reducers = createReducers();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const appActions = { ...slice.actions, ...extraActions };
export const appReducer = slice.reducer;

// implementation

function createInitialState() {
  return {};
}

function createReducers() {
  return {};
}

function createExtraActions() {
  return {
    getCurrentUser: createAsyncThunk(`${name}/getUserCurrent`, async () => {
      const response = await apis.apiGetUserCurrent();
      return response.user;
    }),
  };
}

function createExtraReducers() {
  return (builder) => {
    builder.addCase(extraActions.getCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  };
}
