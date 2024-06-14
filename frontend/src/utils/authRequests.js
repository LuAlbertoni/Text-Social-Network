import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${baseURL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
