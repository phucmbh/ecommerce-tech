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
    current: null,
    token: null,
  };
}

function createReducers() {
  return {
    login: (state, action) => {
      console.log(action);
      state.isLoggedIn = action.payload.isLoggedIn;
      state.current = action.payload.current;
      state.token = action.payload.token;
    },
  };
}

function createExtraActions() {
  return {
    getUsers: getUsers(),
  };

  function getUsers() {
    return createAsyncThunk(`${name}/getUsers`, async () => {
      return await apis.apiGetUsers();
    });
  }
}

function createExtraReducers() {
  return (builder) => {
    getUsers();
    function getUsers() {
      var { pending, fulfilled, rejected } = extraActions.getUsers;

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
