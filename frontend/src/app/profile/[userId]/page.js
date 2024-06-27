"use client";

import React, { useState, useEffect } from "react";
import { getPostsByUser } from "@/utils/postRequests";
import { getBasicUserInfo } from "@/utils/userRequests";
import PostBox from "@/components/PostBox/PostBox";
import ModalMessage from "@/components/ModalMessage/ModalMessage";
import styles from "./profile.module.css";

function ProfilePage({ params }) {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.userId) {
      setUserId(parseInt(params.userId, 10));

      fetchPosts(parseInt(params.userId, 10));
      fetchUserInfo(parseInt(params.userId, 10));
    }
  }, [params.userId]);

  const fetchUserInfo = async (paramsUserId) => {
    try {
      const userData = await getBasicUserInfo(
        paramsUserId,
        localStorage.getItem("token")
      );

      setUserInfo(userData);
    } catch (error) {
      setError(error);
    }
  };

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
      <h1 className={styles.h1}>Posts de {userInfo?.user.username}</h1>
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
