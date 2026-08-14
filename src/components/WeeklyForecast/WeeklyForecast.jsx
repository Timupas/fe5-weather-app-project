import styles from "./WeeklyForecast.module.css";

const getDateKey = (unixTime, timezone) => {
  const date = new Date((unixTime + timezone) * 1000);
  return date.toISOString().slice(0, 10);
};

const getDateLabel = (dateKey) => {
  const date = new Date(dateKey);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const prepareDailyForecast = (forecast) => {
  const timezone = forecast.city.timezone;
  const grouped = {};

  forecast.list.forEach((item) => {
    const key = getDateKey(item.dt, timezone);

    if (!grouped[key]) {
      grouped[key] = [];
    }

    grouped[key].push(item);
  });

  return Object.entries(grouped).map(([dateKey, items]) => {
    const temps = items.map((item) => item.main.temp);

    const minTemp = Math.round(Math.min(...temps));
    const maxTemp = Math.round(Math.max(...temps));

    const middleItem = items[Math.floor(items.length / 2)];
    const iconCode = middleItem.weather[0].icon;
    const description = middleItem.weather[0].description; 

    return {
      dateKey,
      date: getDateLabel(dateKey),
      minTemp,
      maxTemp,
      icon: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
      description,
    };
  });
};

export const WeeklyForecast = ({ forecast }) => {
  const dailyForecast = prepareDailyForecast(forecast);

  return (
    <div className={styles.weekly}>
      <h2 className={styles.title}>Weekly forecast</h2>

      <ul className={styles.list}>
        {dailyForecast.map((day) => (
          <li className={styles.item} key={day.dateKey}>
            <p className={styles.date}>{day.date}</p>

            <div className={styles.temperatureBox}>
              <img
                className={styles.icon}
                src={day.icon}
                alt={day.description}
              />

              <p className={styles.temperature}>
                {day.maxTemp}°/{day.minTemp}°C
              </p>
            </div>

            <p className={styles.description}>{day.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};