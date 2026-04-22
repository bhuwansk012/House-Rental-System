import api from "./api";
const PAYMENT_URL = "/payment/initiate-v2";
const get_owner_payment='/payment/get-by-owner';
const get_payment_by_id='/payment'
const get_all_payment="/payment/all"


// initiate payment request
export const initiatePayment = async (id) => {
  try {
    const response = await api.post(`${PAYMENT_URL}/${id}`);
    return response;
  } catch (error) {
    console.error("Payment initiation failed:", error);
    throw error;
  }
};

export const getAllPaymentByOwner=async()=>{
    try{
      const response=await api.get(get_owner_payment);
      return response;
    }
    catch(error){
      console.log("Somthing wend wrong");
      throw error;
    }
}



export const getPaymentById=async(id)=>{
  try{
    const response=await api.get(`${get_payment_by_id}/${id}`);
    return response;
  }
catch(error){
  console.log("Sothing went to wrong");
  throw error;
}
}


export const getAllPayment=async()=>{
  try{
    const response=await api.get(get_all_payment);
    return response;
  }
  catch(error){
    console.log("Something went wrong!");
    throw error;
  }

}
