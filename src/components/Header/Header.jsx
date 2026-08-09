import { useState } from "react";

import styles from "./Header.module.css";
import headerLogo from "./img/logo.svg";
import userLogo from "./img/userLogo.svg";

export const Header = ({ handleModalToggle, name }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <a href="./index.html">
          <img className={styles.logo} src={headerLogo} alt="Logo" />
        </a>

        <nav className={styles.nav}>
          <a className={styles.navLink} href="#hero">
            Who we are
          </a>
          <a className={styles.navLink} href="#contacts">
            Contacts
          </a>
          <a className={styles.navLink} href="#menu">
            Menu
          </a>
        </nav>

        <div className={styles.profile}>
          {name ? (
            <p className={styles.userNameRegister}>Hi, {name}!</p>
          ) : (
            <button
              className={styles.signUpButton}
              type="button"
              onClick={handleModalToggle}
            >
              Sign Up
            </button>
          )}

          <img className={styles.profileIcon} src={userLogo} alt="User" />
        </div>

        <button
          className={styles.mobileMenuButton}
          type="button"
          onClick={handleMenuToggle}
        >
          Menu
          <span
            className={`${styles.menuArrow} ${
              isMenuOpen ? styles.menuArrowOpen : ""
            }`}
          ></span>
        </button>
      </div>

      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={`container ${styles.mobileMenuContainer}`}>
          <nav className={styles.mobileNav}>
            <a
              className={styles.mobileNavLink}
              href="#hero"
              onClick={handleMenuToggle}
            >
              Who we are
            </a>

            <a
              className={styles.mobileNavLink}
              href="#footer"
              onClick={handleMenuToggle}
            >
              Contacts
            </a>

            <a
              className={styles.mobileNavLink}
              href="#menu"
              onClick={handleMenuToggle}
            >
              Menu
            </a>
          </nav>

          <div className={styles.mobileProfile}>
            <img
              className={styles.mobileProfileIcon}
              src={userLogo}
              alt="User"
            />

            {name ? (
              <p className={styles.userNameRegister}>Hi, {name}!</p>
            ) : (
              <button
                className={styles.mobileSignUpButton}
                type="button"
                onClick={handleModalToggle}
              >
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
