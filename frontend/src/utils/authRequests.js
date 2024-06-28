import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${baseURL}/register`, userData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const loginUser = async (username, password) => {
  try {
    const res = await axios.post(`${baseURL}/login`, {
      username,
      password,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
