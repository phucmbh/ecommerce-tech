import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as apis from '../apis';

// create slice

const name = 'users';
const initialState = createInitialState();
const extraActions = createExtraActions();
const reducers = createReducers();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, reducers, extraReducers });

// exports

export const userActions = { ...slice.actions, ...extraActions };
export const usersReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    isLoggedIn: false,
    token: null,
    user: null,
    isLoading: false,
  };
}

function createReducers() {
  return {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  };
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
      console.log(action);
      state.user = action.payload;
    });
  };
}
