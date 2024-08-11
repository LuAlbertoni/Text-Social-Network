"use client";

import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      setIsLoggedIn(!!token && !!userId);
      setIsLoading(false);
    };
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    window.location.reload();
  };

  return (
    <div className={styles.header}>
      <div className={styles["header-container"]}>
        <a href="/" className={styles["header-link"]}>
          <h1 className={styles["header-title"]}>Text Social Network</h1>
        </a>
        {isClient &&
          !isLoading &&
          (isLoggedIn ? (
            <button className={styles["logout-button"]} onClick={handleLogout}>
              Sair
            </button>
          ) : (
            <a href="/login" className={styles["login-button"]}>
              Login
            </a>
          ))}
      </div>
    </div>
  );
};

export default Header;
