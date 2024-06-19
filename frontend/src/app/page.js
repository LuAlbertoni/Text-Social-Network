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
  const [showPostForm, setShowPostForm] = useState(false);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token não encontrado");
      }
      const data = await getPosts(token);

      if (data && Array.isArray(data.posts)) {
        setPosts(data.posts);
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

  useEffect(() => {
    const storedUserId = parseInt(localStorage.getItem("userId"), 10);
    setUserId(storedUserId);
    fetchPosts();
  }, []);

  const closeModal = () => {
    setModalInfo(null);
  };

  const openPostForm = () => {
    setShowPostForm(true);
  };

  const closePostForm = () => {
    setShowPostForm(false);
  };

  return (
    <div className={styles.root}>
      <h1>Posts</h1>
      <button onClick={openPostForm}>Criar Novo Post</button>
      {showPostForm && (
        <PostForm
          fetchPosts={fetchPosts}
          closePostForm={closePostForm}
        />
      )}
      <ul>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostBox
              key={post.id}
              post={post}
              userId={userId}
              fetchPosts={fetchPosts}
            />
          ))
        ) : (
          <p>Não há posts para exibir</p>
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
