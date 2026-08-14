import styles from "./Footer.module.css";
import headerLogo from "../Header/img/logo.svg";
import instagram from "./img/instagram.svg";
import facebook from "./img/facebook.svg";
import whatsapp from "./img/whatsapp.svg";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <a href="/" className={styles.logoLink}>
          <img className={styles.logo} src={headerLogo} alt="24/7 forecast" />
        </a>

        <address className={styles.address}>
          <h2 className={styles.addressTitle}>Address</h2>

          <p className={styles.addressText}>
            Svobody str. 35
            <br />
            Kyiv
            <br />
            Ukraine
          </p>
        </address>

        <div className={styles.contacts}>
          <h2 className={styles.contactsTitle}>Contact us</h2>
          <ul className={styles.socialList}>
            <li className={styles.socialItem}>
              <a
                className={styles.socialLink}
                href="https://www.instagram.com/"
                aria-label="Instagram"
              >
                <img
                  className={styles.socialIcon}
                  src={instagram}
                  alt="Instagram"
                />
              </a>
            </li>

            <li className={styles.socialItem}>
              <a
                className={styles.socialLink}
                href="https://www.facebook.com/login/?locale=en_GB"
                aria-label="Facebook"
              >
                <img
                  className={styles.socialIcon}
                  src={facebook}
                  alt="Facebook"
                />
              </a>
            </li>

            <li className={styles.socialItem}>
              <a
                className={styles.socialLink}
                href="https://www.whatsapp.com/?lang=en"
                aria-label="WhatsApp"
              >
                <img
                  className={styles.socialIcon}
                  src={whatsapp}
                  alt="WhatsApp"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
