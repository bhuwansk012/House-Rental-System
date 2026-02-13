import axios from "axios";
import {USER_URL,REGISTER_URL} from "./url";

export const getAllUsers=async ()=>{
   try{
    const usersResponse=await axios.get(USER_URL);
    console.log("Users Response:", usersResponse);
    return usersResponse;
   }    
    catch(error){
        console.error("Error fetching users:", error);
        return error;
    }
}


export const registerUser=async (user)=>{
    try{
         const registerResponse=await axios.post(REGISTER_URL,user);
            console.log("Register Response:", registerResponse);
         return registerResponse;
    }
    catch(error){
        console.error("Error registering user:", error);
        return error;
    }
    
}


export const  loginUser=async (user)=>{
    try
    {
        const loginResponse= await axios.post(LOGIN_URL,user);
        console.log("Login Response:", loginResponse);
        return loginResponse;
    }
    catch(error){
        console.error("Error logging in user:", error);
        return error;
    }
}



