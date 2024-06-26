"use client";

import React, { useEffect, useState } from "react";
import { getPosts } from "@/utils/postRequests";
import ModalMessage from "@/components/ModalMessage/ModalMessage";
import PostBox from "@/components/PostBox/PostBox";
import PostForm from "@/components/PostForm/PostForm";
import styles from "./page.module.css";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [modalInfo, setModalInfo] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = parseInt(localStorage.getItem("userId"), 10);
    setUserId(storedUserId);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado");
      }
      const data = await getPosts(token);

      if (data && Array.isArray(data.posts)) {
        setPosts(data.posts.reverse());
      } else {
        throw new Error("Os dados recebidos não são válidos");
      }
    } catch (error) {
      setModalInfo({
        type: "error",
        message: "Ocorreu um erro ao carregar os posts.",
      });
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalInfo(null);
  };

  return (
    <div className={styles.root}>
      <PostForm fetchPosts={fetchPosts} />
      <ul className={styles.ul}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li className={styles.li} key={post.id}>
              <PostBox post={post} userId={userId} fetchPosts={fetchPosts} />
            </li>
          ))
        ) : (
          <li className={styles.li}>
            <p className={styles.p}>Não há posts para exibir</p>
          </li>
        )}
      </ul>
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

export default PostsPage;
