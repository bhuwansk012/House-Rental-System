import api from "./api";

const property_add_url = "/owner/add";
const get_property_by_owner = "/owner/my-properties";

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