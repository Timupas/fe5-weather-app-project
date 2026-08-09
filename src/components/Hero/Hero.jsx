import React, { useRef, useState } from "react";
import styles from "./Hero.module.css";

export const Hero = ({ createLocation }) => {
  const [locationValue, setLocationValue] = useState("");
  const getOrdinalDay = (day) => {
    if (day > 3 && day < 21) {
      return `${day}th`;
    }

    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  const now = new Date();

  const monthYear = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weekday = now.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const day = getOrdinalDay(now.getDate());

  const handleSubmitLocation = (event) => {
    event.preventDefault();
    if (locationValue === "") {
      return;
    }
    setLocationValue("");
    createLocation(locationValue);
  };
  return (
    <section id="hero" className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <h1 className={styles.title}>Weather dashboard</h1>

        <div className={styles.infoWrapper}>
          <p className={styles.description}>
            Create your personal list of favorite cities and always be aware of
            the weather.
          </p>

          <div className={styles.dateBox}>
            <p className={styles.month}>{monthYear}</p>
            <p className={styles.day}>{weekday}, {day}</p>
          </div>
        </div>

        <form className={styles.searchForm} onSubmit={handleSubmitLocation}>
          <input
            className={styles.searchInput}
            type="text"
            name="search"
            placeholder="Search location..."
            value={locationValue}
            onChange={(evt) => setLocationValue(evt.target.value)}
          />
          <button className={styles.searchButton} type="submit">
            <span className={styles.searchIcon}></span>
          </button>
        </form>
      </div>
    </section>
  );
};
