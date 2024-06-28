import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const getPosts = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/posts`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getPostsByUser = async (userId, token) => {
  try {
    const res = await axios.get(`${baseURL}/posts/${userId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createPost = async (content, token) => {
  try {
    const res = await axios.post(
      `${baseURL}/post`,
      { content },
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

export const deletePost = async (postId, token) => {
  try {
    const res = await axios.delete(`${baseURL}/post/${postId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};
