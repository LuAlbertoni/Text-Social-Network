"use client";

import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsLoggedIn(
      localStorage.getItem("token") && localStorage.getItem("userId")
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("clientId");
    window.location.href = "/login";
  };

  return (
    <div className={styles.header}>
      <div className={styles["header-container"]}>
        <h1 className={styles["header-title"]}>Text Social Network</h1>
        {isClient && isLoggedIn && (
          <button className={styles["logout-button"]} onClick={handleLogout}>
            Sair
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
