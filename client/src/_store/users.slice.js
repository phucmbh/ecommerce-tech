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
    message: '',
  };
}

function createReducers() {
  return {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
    clearMessage: (state) => {
      state.message = '';
    },
  };
}

function createExtraActions() {
  return {
    getCurrentUser: createAsyncThunk(
      `${name}/getUserCurrent`,
      async (data, { rejectWithValue }) => {
        const response = await apis.apiGetUserCurrent(data);
        if (response.status < 200 || response.status >= 300) {
          return rejectWithValue(response);
        }
        return response.user;
      }
    ),
  };
}

function createExtraReducers() {
  return (builder) => {
    builder.addCase(extraActions.getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });

    builder.addCase(extraActions.getCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      state.message = 'Login session has expired';
    });
  };
}
