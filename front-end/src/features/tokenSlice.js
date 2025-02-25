import { createSlice } from "@reduxjs/toolkit";

const initialState = { token: null };
export const tokenSlice = createSlice({
  initialState: () => {
    // Check if there is a persisted state in localStorage
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : initialState;
  },
  name: "token",
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;

      localStorage.setItem("token", JSON.stringify(state));
    },
    clearToken: (state, action) => {
      state.token = null;

      // Clear state from localStorage
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
