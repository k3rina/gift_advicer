import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import selectSlice from '../Features/stepper/selectSlice';
import usersSlice from '../Features/users/userSlice';
import authSlice from '../Features/auth/authSlice';
import favoriteSlice from '../Features/favorite/favoriteSlice';

const store = configureStore({
  reducer: {
    steps: selectSlice,
    users: usersSlice,
    auth: authSlice,
    favorite: favoriteSlice
  },
});

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: <T>(fn: (state: RootState) => T) => T =
  useSelector;

export type RootState = ReturnType<typeof store.getState>;
export default store;
