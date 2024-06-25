"use client";

import React, { useState, useEffect } from "react";
import { getPostsByUser } from "@/utils/postRequests";
import PostBox from "@/components/PostBox/PostBox";
import ModalMessage from "@/components/ModalMessage/ModalMessage";
import styles from "./profile.module.css";

function ProfilePage({ params }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPostsByUser(
          params.userId,
          localStorage.getItem("token")
        );
        setPosts(posts);
      } catch (error) {
        setError(error);
      }
    };

    fetchPosts();
  }, [params.userId]);

  return (
    <div className={styles.root}>
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
      {error && (
        <ModalMessage
          type="error"
          message="Ocorreu um erro ao carregar os posts."
        />
      )}
    </div>
  );
}

export default ProfilePage;
