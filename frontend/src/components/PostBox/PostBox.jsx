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

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    return date.toLocaleString("pt-BR", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    const dropdownMenu = e.currentTarget.nextSibling;
    dropdownMenu.classList.toggle(styles.show);
  };

  return (
    <div className={styles.postBox}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2>{post.user.username}</h2>
          <span className={styles.timestamp}>
            {formatDateTime(post.createdAt)}
          </span>
        </div>
        {userId && post.userId === userId && (
          <div className={styles.menu}>
            <button
              className={styles.menuButton}
              onClick={(e) => handleMenuToggle(e)}
            >
              &#8942;
            </button>
            <ul className={styles.dropdownMenu}>
              <li>
                <button onClick={() => handleDelete(post.id)}>Deletar</button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <p className={styles.content}>{post.content}</p>

      {modalInfo && (
        <ModalMessage
          type={modalInfo.type}
          message={modalInfo.message}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default PostBox;
