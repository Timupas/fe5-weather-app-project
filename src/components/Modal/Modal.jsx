import styles from "./Modal.module.css";
import React, { useEffect, useRef, useState } from "react";

export const Modal = ({ handleModalToggle, createName }) => {
  const nameInput = useRef(null);
  const [nameError, setNameError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleModalToggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleModalToggle]);

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) {
      handleModalToggle();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = nameInput.current.value.trim();

    if (!username) {
      setNameError(true);
      return;
    }

    setNameError(false);
    createName(username);
    handleModalToggle();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdrop}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          type="button"
          aria-label="Close modal"
          onClick={handleModalToggle}
        >
          ×
        </button>

        <h2 className={styles.title}>Sign up</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Username
            <input
              className={styles.input}
              ref={nameInput}
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </label>

          {nameError && (
            <p className={styles.loginText}>Write your name correctly!</p>
          )}

          <label className={styles.label}>
            E-Mail
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="E-Mail"
              required
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              className={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </label>

          <button className={styles.button} type="submit">
            Sign up
          </button>
        </form>

        <p className={styles.loginText}>
          Already have an account?{" "}
          <a className={styles.loginLink} href="/">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};