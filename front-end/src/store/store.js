import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import tokenReducer from "../features/tokenSlice";

export const store = configureStore({
  reducer: {
    loginUser: userReducer,
    token: tokenReducer,
  },
});
