import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: !!sessionStorage.getItem("token"),
  profile: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    profileLoaded: (state, action) => {
      state.profile = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("role");
    },
  },
});

export const { logout, profileLoaded, loginSuccess } = authSlice.actions;
export default authSlice.reducer;