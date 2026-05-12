import api from "./api";

const create_url = "/rate/create";
const get_all_url = "/rate/get-all";
const check_url = "/rate/check";

export const createRating = async (data) => {
  try {
    const response = await api.post(create_url, data);
    return response.data;
  } catch (error) {
    console.error("Create Rating Error:", error);

    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Network Error");
    }
  }
};

export const getAllRate = async () => {
  try {
    const response = await api.get(get_all_url);
    return response.data;
  } catch (error) {
    console.error("Get All Rating Error:", error);

    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Network Error");
    }
  }
};

export const checkRateStatus = async () => {
  try {
    const response = await api.get(check_url);
    return response.data;
  } catch (error) {
    console.error("Check Rating Status Error:", error);

    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Network Error");
    }
  }
};