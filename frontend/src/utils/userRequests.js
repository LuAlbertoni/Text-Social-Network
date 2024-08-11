import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getBasicUserInfo = async (userId) => {
  try {
    const res = await axios.get(`${baseURL}/user/getBasicUserInfo/${userId}`);

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateUserInfo = async (userId, token, data) => {
  try {
    const res = await axios.put(
      `${baseURL}/user/updateUserInfo/${userId}`,
      data,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};
