import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, UserAuthLog, UserAuthReg } from '../users/types/User';
import { AuthState } from './types/AuthState';
import * as api from '../../App/api';

const initialState: AuthState = {
  user: undefined,
  error: undefined,
};

export const registration = createAsyncThunk(
  'auth/registration',
  (value: UserAuthReg) => api.registrationFetch(value)
);

export const authorization = createAsyncThunk(
  'auth/authorization',
  (value: UserAuthLog) => api.authorizationFetch(value)
);

export const authCheckUser = createAsyncThunk('auth/checkUser', () =>
  api.authCheckUserFetch()
);

export const logOut = createAsyncThunk('auth/logout', () => api.logOutFetch());

// export const forgotPassword = createAsyncThunk(
//   'forgot/password',
//   (value: string) => api.forgotFetch(value)
// );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => (state.error = undefined),
  },
  extraReducers(builder) {
    builder
      .addCase(registration.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(registration.rejected, (state, action) => {
        // console.log(action.error.message);
        state.error = action.error.message;
      })
      .addCase(authorization.fulfilled, (state, action) => {
        console.log(action.payload.user);
        state.user = action.payload.user;
      })
      .addCase(authorization.rejected, (state, action) => {
        //console.log(action.error.message);
        state.error = action.error.message;
      })
      .addCase(authCheckUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(authCheckUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = undefined;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;