import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./base.api";
import authSlice from "@/modules/auth/api/auth.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      [authSlice.name]: authSlice.reducer,
      // Add your reducers here
      // tasks: taskReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
