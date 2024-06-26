import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getBasicUserInfo = async (userId, token) => {
  try {
    const response = await axios.get(`${baseURL}/getBasicUserInfo/${userId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};