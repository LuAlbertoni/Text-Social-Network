"use client";

import React, { useState, useEffect } from "react";
import { getPostsByUser } from "@/utils/postRequests";
import { getBasicUserInfo } from "@/utils/userRequests";
import PostBox from "@/components/PostBox/PostBox";
import ModalMessage from "@/components/ModalMessage/ModalMessage";
import EditUserInfoPopup from "@/components/EditUserInfoPopup/EditUserInfoPopup";
import styles from "./profile.module.css";

function ProfilePage({ params }) {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userProfileId, setUserProfileId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPopupVisible, setEditPopupVisible] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }

    if (params.userId) {
      setUserProfileId(parseInt(params.userId, 10));
    }
  }, [params.userId]);

  useEffect(() => {
    if (userId !== null && userProfileId !== null) {
      setLoading(false);
      fetchUserInfo(userProfileId);
      fetchPosts(userProfileId);
    }
  }, [userId, userProfileId]);

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

  const handleEditClick = () => {
    setEditPopupVisible(true);
  };

  const handleCloseEditPopup = () => {
    setEditPopupVisible(false);
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.profileInfo}>
        <h1 className={styles.h1}>Perfil de {userInfo?.user.username}</h1>
        <p className={styles.p}>
          Entrou em {new Date(userInfo?.user.createdAt).toLocaleDateString()}
        </p>
        {userId === userProfileId && (
          <button className={styles.button} onClick={handleEditClick}>
            Editar
          </button>
        )}
      </div>
      <ul className={styles.ul}>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <li className={styles.li} key={post.id}>
              <PostBox
                post={post}
                userId={userId}
                fetchPosts={() => fetchPosts(userProfileId)}
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
      {editPopupVisible && (
        <EditUserInfoPopup
          userId={userId}
          token={localStorage.getItem("token")}
          onClose={handleCloseEditPopup}
        />
      )}
    </div>
  );
}

export default ProfilePage;
