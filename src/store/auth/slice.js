import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  login() {},
  register() {},
  logout() {},
  getActiveUser() {},
};

const activeUserSlice = createSlice({
  name: "activeUser",
  initialState: {
    token: localStorage.getItem("token"),
    user: null,
  },
  reducers: {
    setActiveUser(state, { payload }) {
      state.user = payload;
    },
    setToken(state, { payload }) {
      state.token = payload;
    },
    ...middlewareActions,
  },
});

export default activeUserSlice.reducer;

export const {
  setActiveUser,
  getActiveUser,
  setToken,
  login,
  register,
  logout,
} = activeUserSlice.actions;
