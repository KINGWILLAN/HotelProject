import { createSlice } from "@reduxjs/toolkit";

const userInitialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const tokenInitialState = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

const initialState = {
  user: userInitialState,
  token: tokenInitialState,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAndToken: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    deleteUserAndToken: (state) => {
      state.user = null;
      state.token = null;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { setUserAndToken, deleteUserAndToken, setUser } =
  userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;

const userReducer = userSlice.reducer;

export default userReducer;
