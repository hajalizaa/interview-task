import { combineReducers, createReducer, AnyAction } from '@reduxjs/toolkit';

import ACTIONS from './actions';

// Reducers
import storageSlice from './slices/storage.slice';

const combinedReducers = combineReducers({
  [storageSlice.name]: storageSlice.reducer
});

const rootReducer = createReducer(
  combinedReducers(undefined, { type: '' }),
  (builder) => {
    builder
      .addCase('HYDRATE', (state, action: AnyAction) => {
        return { ...state, ...action.payload };
      })
      .addCase(ACTIONS.LOGOUT, () => combinedReducers(undefined, { type: '' }))
      .addDefaultCase(combinedReducers);
  }
);

export default rootReducer;
