import axios from "axios";
import { PROFILE_URL,GET_PROFILE_URL } from "../service/url";

export const updateProfile = async (profileData) => {
  try {
    const updateResponse = await axios.put(PROFILE_URL, profileData);
    console.log(updateResponse.data);
    return updateResponse.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const getProfile=async()=>{
    try{
        const profileResponse=await axios.get(GET_PROFILE_URL);
        return profileResponse;
    }
    catch(error){
        return error;
    }
}
