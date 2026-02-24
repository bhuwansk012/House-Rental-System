import api from "./api";
const ADMIN_URL = "/admin/dashboard";
const TENANT_URL = "/admin/tenants";
const OWNER_URL = "/admin/owners";
const GET_BOOKING_URL = "/admin/bookings";
const GET_PROPERTIES_URL = "/admin/properties";


export const getAdminData = async () => {
  try {
    const response = await api.get(ADMIN_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin dashboard:", error);
    throw error;
  }
};


export const getAdminTenants = async () => {
  try {
    const response = await api.get(TENANT_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching tenants:", error);
    throw error;
  }
};

export const deleteTenantByAdmin = async (id) => {
  try {
    const response = await api.delete(`/admin/tenant/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting tenant:", error);
    throw error;
  }
};


export const getAdminOwners = async () => {
  try {
    const response = await api.get(OWNER_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching owners:", error);
    throw error;
  }
};

export const deleteOwnerByAdmin = async (id) => {
  try {
    const response = await api.delete(`/admin/owner/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting owner:", error);
    throw error;
  }
};


export const getAdminBookings = async () => {
  try {
    const response = await api.get(GET_BOOKING_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};


export const getAdminProperties = async () => {
  try {
    const response = await api.get(GET_PROPERTIES_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};

export const deletePropertyByAdmin = async (id) => {
  try {
    const response = await api.delete(`/admin/property/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting property:", error);
    throw error;
  }
};

export const updatePropertyStatus = async (id, status) => {
  try {
    let response;
    if (status === "APPROVED") {
      response = await api.put(`/admin/property/approve/${id}`);
    } else {
      response = await api.put(`/admin/property/reject/${id}`);
    }
    return response; // return the full response
  } catch (error) {
    console.error("Error updating property:", error);
    throw error;
  }
};