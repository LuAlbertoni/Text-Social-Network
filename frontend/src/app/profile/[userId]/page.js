"use client";

import React, { useState, useEffect } from "react";
import { getPostsByUser } from "@/utils/postRequests";
import PostBox from "@/components/PostBox/PostBox";
import ModalMessage from "@/components/ModalMessage/ModalMessage";
import styles from "./profile.module.css";

function ProfilePage({ params }) {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId !== null) {
      setUserId(parseInt(storedUserId, 10));
      fetchPosts(parseInt(storedUserId, 10));
    }
  }, []);

  const fetchPosts = async (paramsUserId) => {
    try {
      const postsData = await getPostsByUser(
        paramsUserId,
        localStorage.getItem("token")
      );

      postsData.posts.reverse();
      setPosts(postsData.posts);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className={styles.root}>
      <ul className={styles.ul}>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <li className={styles.li} key={post.id}>
              <PostBox
                post={post}
                userId={userId}
                fetchPosts={() => fetchPosts(userId)}
              />
              {index % 2 === 0 && index !== posts.length - 1 && (
                <div className={styles.columnDivider}></div>
              )}
              {index !== posts.length - 1 && (
                <div className={styles.rowDivider}></div>
              )}
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
