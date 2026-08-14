import { WeatherDetails } from "../WeatherDetails/WeatherDetails";
import { HourlyForecast } from "../HourlyForecast/HourlyForecast";
import { WeeklyForecast } from "../WeeklyForecast/WeeklyForecast";

import styles from "./WeatherMoreSection.module.css";

export const WeatherMoreSection = ({ weather, forecast }) => {
  if (!weather || !forecast) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <WeatherDetails weather={weather} />
        <HourlyForecast forecast={forecast} />
        <WeeklyForecast forecast={forecast} />
      </div>
    </section>
  );
};
