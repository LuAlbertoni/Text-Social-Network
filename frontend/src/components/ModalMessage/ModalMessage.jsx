import React, { useEffect, useState } from "react";
import styles from "./ModalMessage.module.css";

const ModalMessage = ({ type, message }) => {
  const [visible, setVisible] = useState(false);

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

  const closeModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (message && type) {
      setVisible(true);
      const timer = setInterval(() => {
        setVisible(false);
        clearInterval(timer);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [message, type]);

  if (!visible) return null;

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
