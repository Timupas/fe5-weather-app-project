import { WeatherItem } from "../WeatherItem/WeatherItem";
import styles from "./WeatherList.module.css";

export const WeatherList = ({
  locationsList,
  name,
  handleDeleteLocation,
  handleShowMore,
  handleRefreshLocation,
}) => {
  const now = new Date();

  const currentTime = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dayMonthYear = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const weekday = now.toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <section className={styles.weatherSection}>
      <div className="container">
        <ul className={styles.list}>
          {locationsList.map((item) => (
            <WeatherItem
              key={item.id}
              weather={item}
              name={name}
              handleDeleteLocation={handleDeleteLocation}
              handleShowMore={handleShowMore}
              handleRefreshLocation={handleRefreshLocation}
              currentTime={currentTime}
              dayMonthYear={dayMonthYear}
              weekday={weekday}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
