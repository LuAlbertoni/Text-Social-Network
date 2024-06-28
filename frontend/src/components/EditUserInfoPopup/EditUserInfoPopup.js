import React, { useState } from "react";
import { updateUserInfo } from "@/utils/userRequests";
import ModalMessage from "@/components/ModalMessage/ModalMessage";
import styles from "./editUserInfoPopup.module.css";

const EditUserInfoPopup = ({ userId, token, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await updateUserInfo(userId, token, formData);
      setSuccessMessage("Informações atualizadas com sucesso!");
      onClose();
    } catch (error) {
      setError("Erro ao atualizar informações. Por favor, tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupContent}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.popupTitle}>Editar Informações</h2>
        {error && <ModalMessage type="error" message={error} />}
        {successMessage && (
          <ModalMessage type="success" message={successMessage} />
        )}
        <form className={styles.popupForm} onSubmit={handleSubmit}>
          <label className={styles.popupLabel} htmlFor="username">
            Username:
          </label>
          <input
            className={styles.popupInput}
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label className={styles.popupLabel} htmlFor="password">
            Password:
          </label>
          <input
            className={styles.popupInput}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label className={styles.popupLabel} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.popupInput}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <button className={styles.popupButton} type="submit">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserInfoPopup;
