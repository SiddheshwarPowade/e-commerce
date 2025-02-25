import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  name: null,
  email: null,
};

export const userSlice = createSlice({
  initialState: () => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : initialState;
  },
  name: "user",
  reducers: {
    setUser: (state, action) => {
      const { _id, name, email } = action.payload;
      state._id = _id;
      state.name = name;
      state.email = email;

      // Persist updated state to localStorage
      localStorage.setItem("user", JSON.stringify(state));
    },
    clearUser: (state, action) => {
      state._id = null;
      state.name = null;
      state.email = null;

      // Clear state from localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
