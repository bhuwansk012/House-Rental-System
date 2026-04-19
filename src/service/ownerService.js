import api from "./api";

const property_add_url = "/owner/add";
const get_property_by_owner = "/owner/my-properties";
const get_owner_document="/owner/document";

//aading propety
export const addProperty = async (formData) => {
  const response = await api.post(property_add_url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// UPDATE PROPERTY
export const updateProperty = async (id, formData) => {
  const response = await api.put(`/owner/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// GET OWNER PROPERTIES
export const getOwnerProperty = async () => {
  const response = await api.get(get_property_by_owner);
  return response.data;
};

// DELETE PROPERTY
export const deleteOwnerProperty = async (id) => {
  const response = await api.delete(`/owner/delete/${id}`);
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get("/owner/dashboard");
  return response.data;
}
export const getPropertyById = async (id) => {
  const response = await api.get(`/owner/property/${id}`);
  return response.data;
};

export const getOwnerDocument=async()=>{
  const response=await api.get(get_owner_document);
  return response;
}