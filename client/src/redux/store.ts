import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './features/user/user.slice';
import themeModeReducer from "./features/theme.mode.slice";
import authModalSlice from "./features/user/auth.modal.slice";
import globalLoadingSlice from "./features/appState/global.loading.slice";
import appStateSlice from "./features/appState/app.state.slice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    themeMode:themeModeReducer,
    authModal:authModalSlice,
    globalLoading:globalLoadingSlice,
    appState:appStateSlice
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
