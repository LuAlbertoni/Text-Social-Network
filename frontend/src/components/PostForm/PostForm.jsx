import React, { useState } from "react";
import { createPost } from "@/utils/postRequests";
import styles from "./PostForm.module.css";
import ModalMessage from "@/components/ModalMessage/ModalMessage";

const PostForm = ({ fetchPosts }) => {
  const [post, setPost] = useState("");
  const [modalInfo, setModalInfo] = useState(null);

  const closeModal = () => {
    setModalInfo(null);
  };

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
      <ModalMessage modalInfo={modalInfo} closeModal={closeModal} />
      <textarea
        className={styles.textarea}
        placeholder="Escreva seu post aqui..."
        value={post}
        onChange={handleChangePost}
      />
      <button className={styles.button} onClick={handleCreate}>
        Enviar
      </button>
    </div>
  );
};

export default PostForm;
