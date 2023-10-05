import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FavoriteId, FavoriteState } from './types/favorite';
import * as api from '../../App/api';

const initialState: FavoriteState = {
  favorites: [],
  error: undefined,
};

export const loadFavors = createAsyncThunk('favor/init', () =>
  api.favorFetch()
);
export const addFavorite = createAsyncThunk(
  'favorite/add',
  (favorite: string) => api.addFavoriteFetch(favorite)
);

export const deleteFavorite = createAsyncThunk(
  'favorite/dell',
  (value: FavoriteId) => api.deleteFavoriteFetch(value)
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFavors.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(loadFavors.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          (fav) => fav.id !== +action.payload
        );
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export default favoritesSlice.reducer;
