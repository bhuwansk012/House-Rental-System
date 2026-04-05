import {REGISTER_END_POINT,LOGIN_END} from './url'
import {forget_password,reset_password,verify_email_url} from './url'
import axios from 'axios';

//Register Service
export const registerService = async (regData) => {
  console.log(regData);
  const response = await axios.post(REGISTER_END_POINT, regData);
  return response;
};


//Login Service
export const loginService = async (loginData) => {
  const response = await axios.post(LOGIN_END, loginData);
  return response;
};

export const logout=()=>{
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    sessionStorage.clear();

}
export const forget = async (email) => {
  const response = await axios.post(forget_password, { email });
  return response;
};
export const reset=async(token, password)=>{
  const response=await axios.put(reset_password,{token,password});
  return response;
}
export const verifyEmail=async(token)=>{
  const response=await axios.put(`${verify_email_url}/${token}`);
  return response;
}