import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import checksReducer from '../features/checks/checksSlice';

export const store = configureStore({
  reducer: {
    checks: checksReducer,
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
