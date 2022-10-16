import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import analysisReducer from '../Stores/analysisSlice';


export const store = configureStore({
  reducer: {
    test  : analysisReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
