"use client";

import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("clientId");
    window.location.href = "/login";
  };

  return (
    <div className={styles.header}>
      <div className={styles["header-container"]}>
        <h1 className={styles["header-title"]}>Text Social Network</h1>

        {localStorage.getItem("token") && (
          <button className={styles["logout-button"]} onClick={handleLogout}>
            Sair
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
