import { useState } from "react";
import styles from "./WeatherItem.module.css";
import { FiHeart, FiRefreshCw } from "react-icons/fi";
import { TfiTrash } from "react-icons/tfi";

export const WeatherItem = ({
  weather,
  name,
  handleDeleteLocation,
  handleShowMore,
  handleRefreshLocation,
  currentTime,
  dayMonthYear,
  weekday,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <li className={styles.card}>
      <div className={styles.locationRow}>
        <p className={styles.city}>{weather.name}</p>
        <p className={styles.country}>{weather.sys.country}</p>
      </div>

      <p className={styles.time}>{currentTime}</p>

      <div className={styles.forecast}>
        <button type="button" className={styles.hourlyForecast}>
          Hourly forecast
        </button>

        {name && (
          <button type="button" className={styles.weeklyForecast}>
            Weekly forecast
          </button>
        )}
      </div>

      <div className={styles.exactlyTime}>
        <p className={styles.date}>{dayMonthYear}</p>
        <p className={styles.day}>{weekday}</p>
      </div>

      <img src={iconUrl} alt={weather.weather[0].description} />

      <p className={styles.temperature}>{Math.round(weather.main.temp)}°C</p>

      <div className={styles.actions}>
        <button className={styles.iconButton} type="button">
          <FiRefreshCw
            className={styles.iconRefresh}
            onClick={() => handleRefreshLocation(weather)}
          />
        </button>

        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ""}`}
          type="button"
          onClick={toggleFavorite}
        >
          <FiHeart
            className={styles.iconFavorite}
            fill={isFavorite ? "#ff4b55" : "none"}
          />
        </button>

        <button
          className={styles.moreButton}
          type="button"
          onClick={() => handleShowMore(weather)}
        >
          See more
        </button>

        <button
          className={styles.iconButton}
          type="button"
          onClick={() => handleDeleteLocation(weather.id)}
        >
          <TfiTrash className={styles.iconDelete} />
        </button>
      </div>
    </li>
  );
};