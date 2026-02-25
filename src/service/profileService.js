import api from './api'
const PROFILE_URL="/profile"

export const updateProfile = async (formData) => {
  const response = await api.put(PROFILE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProfile=async ()=>{
    const response=await api.delete(PROFILE_URL);
    return response.data;
}


export const getProfile=async ()=>{
    const response=await api.get(PROFILE_URL)
    return response.data;
}