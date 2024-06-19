import React from "react";
import styles from "./ModalMessage.module.css";

const ModalMessage = ({ type, message, closeModal }) => {
  let modalClass = styles.modal;
  let icon = null;

  switch (type) {
    case "success":
      modalClass += ` ${styles.success}`;
      icon = "✓";
      break;
    case "error":
      modalClass += ` ${styles.error}`;
      icon = "✕";
      break;
    default:
      modalClass += ` ${styles.info}`;
      icon = "i";
      break;
  }

  setTimeout(() => {
    closeModal();
  }, 7000);

  return (
    <div className={modalClass}>
      <div className={styles.content}>
        <span className={styles.close} onClick={closeModal}>
          &times;
        </span>
        <span className={styles.icon}>{icon}</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ModalMessage;
