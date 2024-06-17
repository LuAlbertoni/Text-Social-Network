import React, { useState } from "react";
import { deletePost } from "@/utils/postRequests";
import styles from "./PostBox.module.css";
import ModalMessage from "@/components/ModalMessage/ModalMessage";

const PostBox = ({ post, userId, fetchPosts }) => {
  const [modalInfo, setModalInfo] = useState(null);

  const closeModal = () => {
    setModalInfo(null);
  };

  const handleDelete = (postId) => {
    const token = localStorage.getItem("token");

    setModalInfo({ type: "info", message: "Deletando post..." });

    deletePost(postId, token)
      .then(() => {
        setModalInfo({
          type: "success",
          message: "Post deletado com sucesso!",
        });

        fetchPosts();
      })
      .catch((error) => {
        setModalInfo({
          type: "error",
          message:
            "Ocorreu um erro. Verifique o console para mais informações.",
        });
        console.error(error);
      });

    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  return (
    <li key={post.id}>
      <h2>{post.user.username}</h2>
      <p>{post.content}</p>
      {userId && post.userId === userId && (
        <button onClick={() => handleDelete(post.id)}>Deletar</button>
      )}
    </li>
  );
};

export default PostBox;
