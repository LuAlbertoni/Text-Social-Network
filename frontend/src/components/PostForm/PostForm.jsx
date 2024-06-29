import React, { useState, useEffect } from "react";
import { createPost } from "@/utils/postRequests";
import styles from "./PostForm.module.css";
import ModalMessage from "@/components/ModalMessage/ModalMessage";

const PostForm = ({ fetchPosts }) => {
  const [post, setPost] = useState("");
  const [modalInfo, setModalInfo] = useState(null);

  const handleCreate = () => {
    const token = localStorage.getItem("token");

    setModalInfo({ type: "info", message: "Enviando post..." });

    createPost(post, token)
      .then(() => {
        fetchPosts();
        setModalInfo({ type: "success", message: "Post criado com sucesso!" });
        setPost("");
      })
      .catch((error) => {
        setModalInfo({
          type: "error",
          message:
            "Ocorreu um erro. Verifique o console para mais informações.",
        });
        console.error(error);
      });
  };

  const handleChangePost = (event) => {
    setPost(event.target.value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2>Criar Post</h2>

        {post.length === 0 ? (
          <button className={styles.button} disabled>
            Enviar
          </button>
        ) : (
          <button className={styles.button} onClick={handleCreate}>
            Enviar
          </button>
        )}
      </div>
      <textarea
        className={styles.textarea}
        placeholder="Escreva seu post..."
        value={post}
        onChange={handleChangePost}
      />
      {modalInfo && (
        <ModalMessage type={modalInfo.type} message={modalInfo.message} />
      )}
    </div>
  );
};

export default PostForm;
