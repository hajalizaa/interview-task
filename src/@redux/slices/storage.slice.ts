import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitial {
  favoriteMovies: string[];
}

const initialState: IInitial = {
  favoriteMovies: []
};

const storageSlice = createSlice({
  initialState,
  name: 'storage',
  reducers: {
    addToFavorites: (state, { payload }: PayloadAction<string>) => {
      state.favoriteMovies.push(payload);
    },
    removeFromFavorites: (state, { payload }: PayloadAction<string>) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (el) => el !== payload
      );
    }
  }
});

export const { addToFavorites, removeFromFavorites } = storageSlice.actions;

export default storageSlice;
