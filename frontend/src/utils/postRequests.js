import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getPosts = async (token) => {
  try {
    const response = await axios.get(`${baseURL}/posts`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (content, token) => {
  try {
    const response = await axios.post(
      `${baseURL}/post`,
      { content },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId, token) => {
  try {
    const response = await axios.delete(`${baseURL}/post/${postId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
