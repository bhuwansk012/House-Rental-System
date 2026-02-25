import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminProfile: null,
  isAuthenticated: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminProfile: (state, action) => {
      state.adminProfile = action.payload;
      state.isAuthenticated = true;
    },
    logoutAdmin: (state) => {
      state.adminProfile = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAdminProfile, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;