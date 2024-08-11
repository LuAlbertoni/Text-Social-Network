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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = parseInt(localStorage.getItem("userId"), 10) || null;
    setUserId(storedUserId);
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();

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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <div className={styles.root}>
      {userId && <PostForm fetchPosts={fetchPosts} />}{" "}
      <h1 className={styles.h1}>Posts</h1>
      <p className={styles.p}>Veja os posts de outros usuários</p>
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
        <ModalMessage type={modalInfo.type} message={modalInfo.message} />
      )}
    </div>
  );
};

export default PostsPage;
