import api from "./api";
const booking_endpoint = "/createBook";
const getallBooking="/getAllBooking";
const getOwnerBooking="/owner-booking";
const bookedReject="/updateBookReject";
const bookedAccept="/updateBookAccept";


export const createBooking = async (id,data) => {
  try {
    const response = await api.post(booking_endpoint+`/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const getAllBookings = async () => {
  try {
    const response = await api.get(getallBooking);
    return response;
  } catch (error) {
    console.error("Error fetching tenant bookings:", error);
    throw error;
  }
};

export const getAllOwnerBookings = async () => {
  try {
    const response = await api.get(getOwnerBooking);
    return response;
  } catch (error) {
    console.error("Error fetching owner bookings:", error);
    throw error;
  }
};

export const updateBookingAccept = async (id) => {
  try {
    const response = await api.put(`${bookedAccept}/${id}`);
    return response;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

export const updateBookingReject = async (id) => {
  try {
    const response = await api.put(`${bookedReject}/${id}`);
    return response;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

export const getBookingById = async (id) => {
  try {
    const response = await api.get(`/getBooking/${id}`);  
    return response;
  }
  catch (error) {
    console.error("Error fetching booking details:", error);
    throw error;
  } 
};
 export const bookingFree = async (id) => {
  try {
    const response = await api.get(`/bookingFree/${id}`);
    return response;
  }
  catch (error) {
    console.error("Error checking booking availability:", error);
    throw error;
  } 
};

export const bookingReleased=async(id)=>{
  try{
    const response= await api.delete(`booking-released/${id}`)
    return response;
  }
  catch (error)
  {
    throw error;
  }
}