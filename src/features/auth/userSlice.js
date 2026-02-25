import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.userProfile = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserProfile, logoutUser } = userSlice.actions;
export default userSlice.reducer;