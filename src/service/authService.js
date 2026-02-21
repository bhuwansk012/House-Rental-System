import {REGISTER_END_POINT,LOGIN_END} from './url'
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

