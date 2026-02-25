import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ownerProfile: null,
  isAuthenticated: false,
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    setOwnerProfile: (state, action) => {
      state.ownerProfile = action.payload;
      state.isAuthenticated = true;
    },
    logoutOwner: (state) => {
      state.ownerProfile = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setOwnerProfile, logoutOwner } = ownerSlice.actions;
export default ownerSlice.reducer;