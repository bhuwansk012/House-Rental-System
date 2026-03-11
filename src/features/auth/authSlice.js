import { createSlice } from "@reduxjs/toolkit";


const initialState = {
user: null,
isAuthenticated: false,
};


const authSlice = createSlice({
name: "auth",
initialState,
reducers: {
    loginSuccess:(state,action)=>{
        state.user=action.payload;
        console.log(action.payload);
        state.isAuthenticated=true;
    },
    updateAuth:(state, action)=>{
        state.isAuthenticated=true;
        state.user=action.payload;
    },
    logout:(state)=>{
        state.user=null;
        state.isAuthenticated=false;
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }
},
});

export const {loginSuccess,logout,updateAuth} =authSlice.actions;
export default authSlice.reducer;