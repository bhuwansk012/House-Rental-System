import api from "./api";
const booking_endpoint = "/booking";

export const saveBookedDetails = async (details) => {
  try {
    const response = await api.post(booking_endpoint, details);
    return response;
  } catch (error) {
    console.error("Error saving booked details:", error);
    throw error;
  };
};

export const getBookedDetails = async () => {
  try {
    const response = await api.get(booking_endpoint);
    return response;
  } catch (error) {
    console.error("Error fetching booked details:", error);
    throw error;    
    }
};