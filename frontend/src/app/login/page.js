"use client";

import React, { useState } from "react";
import { registerUser, loginUser } from "@/utils/authRequests";
import ModalMessage from "@/components/ModalMessage/ModalMessage";
import styles from "./login.module.css";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setModalInfo({ type: "info", message: "Carregando..." });

    try {
      if (isRegister) {
        const data = await registerUser({ username, password, email });

        if (data.error) {
          setModalInfo({
            type: "error",
            message: data.error,
          });
        } else {
          setModalInfo({
            type: "success",
            message: "Usuário cadastrado com sucesso.",
          });

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } else {
        const data = await loginUser(username, password);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);

        setModalInfo({
          type: "success",
          message: "Usuário logado com sucesso. Redirecionando...",
        });

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      setModalInfo({
        type: "error",
        message: "Ocorreu um erro. Verifique o console para mais informações.",
      });

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalInfo(null);
  };

  return (
    <div className={styles.root}>
      <h1>{isRegister ? "Cadastro" : "Login"}</h1>
      <form onSubmit={handleSubmit}>
        <label>Usuário:</label>
        <input
          type="text"
          name="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        {isRegister && (
          <>
            <label>E-mail:</label>
            <input
              type="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        )}
        <label>Senha:</label>
        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Enviar"}
        </button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister
          ? "Já tem uma conta? Faça login"
          : "Não tem uma conta? Cadastre-se"}
      </button>

      {}
      {modalInfo && (
        <ModalMessage
          type={modalInfo.type}
          message={modalInfo.message}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default AuthPage;
