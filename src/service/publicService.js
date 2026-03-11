import axios from 'axios';
import {PUBLIC_PROPERTY_URL} from '../service/url';
import {SINGLE_PROPERTY_URL} from '../service/url'

export const getProperty =async()=>{
    const response=await axios.get(PUBLIC_PROPERTY_URL);
    return response;
};

export  const  getPropertyById=async(id)=>{
    const response =await axios.get(SINGLE_PROPERTY_URL+`${id}`);
    return response;
}

