import axios from 'axios';
import {PUBLIC_PROPERTY_URL} from '../service/url';
import {SINGLE_PROPERTY_URL} from '../service/url'

export const getAllProperties =async()=>{
    const response=await axios.get(PUBLIC_PROPERTY_URL);
    return response;
};

export  const  getPropertyById=async(id)=>{
    const response =await axios.get(SINGLE_PROPERTY_URL+`/${id}`);
    return response;
}



export const searchProperties = (params) => {
  return axios.get("http://localhost:8080/api/public/search", {
    params: params,
  });
};



